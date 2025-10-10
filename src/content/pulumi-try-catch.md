---
layout: post
title: Why Try-Catch Doesn't Work with Pulumi
image: img/pulumi-banner.png
author: Dushyant
date: 2025-10-10T16:30:00.000Z
tags: ["Pulumi", "All"]
draft: false
---

When working with Pulumi, especially coming from traditional .NET development, you might expect that wrapping resource creation in a try-catch block would handle deployment errors gracefully. However, as many developers discover, this approach doesn't work as expected. In this post, we'll explore why this happens and how to properly handle errors in Pulumi applications.

## The Problem: When Try-Catch Fails

Consider this seemingly straightforward Pulumi C# program:

```csharp
using Pulumi.AzureNative.Storage;
using Pulumi.AzureNative.Storage.Inputs;
using System;

return await Pulumi.Deployment.RunAsync(() =>
{
    try
    {
        // Create an Azure resource (Storage Account)
        var storageAccount = new StorageAccount("sa", new StorageAccountArgs
        {
            ResourceGroupName = "non-existent-rg", // Intentionally incorrect
            Sku = new SkuArgs
            {
                Name = SkuName.Standard_LRS
            },
            Kind = Kind.StorageV2
        });
    } 
    catch (Exception ex)
    {
        // This should catch errors, right? Wrong!
        Console.WriteLine($"An error occurred: {ex.Message}");
    }
});
```

Running `pulumi preview` should work fine and it should report the expected values:

```pwsh
+ pulumi:pulumi:Stack: (create)
    [urn=urn:pulumi:testtrycatch::pulumi-try-catch-fail::pulumi:pulumi:Stack::pulumi-try-catch-fail-testtrycatch]
    + azure-native:storage:StorageAccount: (create)
        [urn=urn:pulumi:testtrycatch::pulumi-try-catch-fail::azure-native:storage:StorageAccount::sa]
        [provider=urn:pulumi:testtrycatch::pulumi-try-catch-fail::pulumi:providers:azure-native::default_3_8_0::04da6b54-80e4-46f7-96ec-b56ff0331ba9]
        accountName         : "sa9203a871"
        azureApiVersion     : "2024-01-01"
        kind                : "StorageV2"
        location            : "westeurope"
        resourceGroupName   : "non-existent-rg"
        sku                 : {
            name: "Standard_LRS"
        }
Resources:
    + 2 to create
```

When running `pulumi up` on this code, you might expect the try-catch to handle any deployment errors gracefully. Instead, you get an error like this:

```pwsh
error: cannot check existence of resource '/subscriptions/.../resourceGroups/non-existent-rg/providers/Microsoft.Storage/storageAccounts/sa79a4d803': status code 403, {"error":{"code":"AuthorizationFailed","message":"The client '...' does not have authorization to perform action 'Microsoft.Storage/storageAccounts/read' over scope '...' or the scope is invalid."}}
error: update failed
```

Three questions arise:

1. Why doesn't the try-catch hide the error?
2. Why doesn't the error mention that the resource group doesn't exist?
3. Why isn't the Console.WriteLine message displayed?

## Understanding Pulumi's Execution Model

### The Asynchronous, Declarative Nature

The fundamental issue lies in understanding **when** Pulumi actually creates resources. When you write:

```csharp
var storageAccount = new StorageAccount("sa", new StorageAccountArgs { ... });
```

This line does **not** immediately create the Azure resource. Instead, it:

1. **Creates a Pulumi resource object** in memory
2. **Registers it** with the Pulumi engine for later deployment
3. **Returns immediately** without making any Azure API calls

The actual Azure API calls happen later during the **deployment phase**, which occurs after your C# code has completely finished executing.

### Why Try-Catch Doesn't Work

The try-catch block in your code only catches exceptions that occur during the **registration phase** (steps 1-2 above), not during the **deployment phase** where the actual Azure API calls are made.

```csharp
try
{
    // This only registers the resource - no Azure API calls yet
    var storageAccount = new StorageAccount("sa", args);
    // Execution reaches here successfully
} 
catch (Exception ex)
{
    // This will never execute for deployment errors
    Console.WriteLine($"An error occurred: {ex.Message}");
}
// C# code completes here
// THEN Pulumi makes the actual Azure API calls
```

## Why the Error Message Doesn't Mention Resource Group

The error you're seeing is an **authorization error (HTTP 403)**, not a "resource not found" error (HTTP 404). Here's the sequence:

1. **Azure checks permissions first**: Before checking if resources exist, Azure validates whether you have the required permissions
2. **Permission denied**: Since the resource doesn't exist, it assumes user doesn't have `Microsoft.Storage/storageAccounts/read` permission on that scope, Azure returns a 403 error
3. **Early termination**: Azure's RBAC (Role-Based Access Control) evaluation happens before resource existence validation

So we get a 403 as permissions could not be validated.

## Proper Error Handling Strategies in Pulumi

### 1. Validate Dependencies First

The most straightforward approach is to ensure your dependencies exist:

```csharp
return await Pulumi.Deployment.RunAsync(() =>
{
    // Create the resource group first
    var resourceGroup = new ResourceGroup("rg", new ResourceGroupArgs
    {
        Location = "WestEurope"
    });

    // Use the created resource group
    var storageAccount = new StorageAccount("sa", new StorageAccountArgs
    {
        ResourceGroupName = resourceGroup.Name, // Reference the created RG
        Sku = new SkuArgs { Name = SkuName.Standard_LRS },
        Kind = Kind.StorageV2
    });
});
```

### 2. Use Pulumi's Apply Methods for Output Handling

You can handle errors in resource outputs using the `Apply` method:

```csharp
var storageAccount = new StorageAccount("sa", new StorageAccountArgs
{
    ResourceGroupName = "my-resource-group",
    Sku = new SkuArgs { Name = SkuName.Standard_LRS },
    Kind = Kind.StorageV2
});

// Handle the output with potential error scenarios
var storageAccountId = storageAccount.Id.Apply(id => 
{
    Console.WriteLine($"Storage account created with ID: {id}");
    return id;
});
```

### 3. Use Stack Transformations for Advanced Scenarios

For more complex error handling or resource modification scenarios:

```csharp
return await Pulumi.Deployment.RunAsync(() =>
{
    // Set up stack transformation for resource validation
    Pulumi.Deployment.Instance.RegisterStackTransformation(args =>
    {
        // You can validate or modify resources here before deployment
        if (args.Resource is StorageAccount sa)
        {
            // Add validation logic
            Console.WriteLine($"Validating storage account: {args.Name}");
        }
        return args;
    });

    var storageAccount = new StorageAccount("sa", new StorageAccountArgs
    {
        ResourceGroupName = "my-resource-group",
        Sku = new SkuArgs { Name = SkuName.Standard_LRS },
        Kind = Kind.StorageV2
    });
});
```

### 4. Use Pulumi's Built-in Resource Options

Pulumi provides several resource options for handling various scenarios:

```csharp
var storageAccount = new StorageAccount("sa", new StorageAccountArgs
{
    ResourceGroupName = "my-resource-group",
    Sku = new SkuArgs { Name = SkuName.Standard_LRS },
    Kind = Kind.StorageV2
}, new CustomResourceOptions
{
    // Ignore changes to specific properties
    IgnoreChanges = { "tags" },
    
    // Protect the resource from deletion
    Protect = true,
    
    // Set explicit dependencies
    DependsOn = { /* other resources */ }
});
```

## Best Practices for Error Prevention

### Use Resource References Instead of Hard-coded Names

```csharp
// Bad: Hard-coded resource group name
ResourceGroupName = "my-resource-group"

// Good: Reference to created resource
ResourceGroupName = resourceGroup.Name
```

## Conclusion

Understanding Pulumi's asynchronous, declarative execution model is crucial for effective error handling. Traditional try-catch blocks work for registration-time errors but not for deployment-time errors.

## Additional Resources

- [Pulumi Documentation on Error Handling](https://www.pulumi.com/docs/)
- [Azure RBAC Troubleshooting Guide](https://docs.microsoft.com/en-us/azure/role-based-access-control/troubleshooting)
- [Pulumi Best Practices](https://www.pulumi.com/docs/guides/best-practices/)

---

*For more insights on Infrastructure as Code and cloud development best practices, follow my blog or connect with me on LinkedIn.*
