---
layout: post
title: Simplifying Resource Management With Parent Option in Pulumi
image: img/pulumi-banner.png
author: Dushyant
date: 2024-03-28T23:30:00.000Z
tags: ["Pulumi", "All"]
draft: false
---
# Introduction

In the world of infrastructure as code (IaC), managing dependencies and relationships between resources is crucial for maintaining an efficient and organized infrastructure. Pulumi, a powerful IaC tool, offers a feature called the "Parent Option" to streamline resource management within its ecosystem. In this post, we'll explore the Parent Option in Pulumi and understand how it simplifies resource orchestration through a practical example.

### What is the Parent Option?

The Parent Option in Pulumi allows developers to specify the parent-child relationship between resources. When creating resources within Pulumi, specifying a parent resource helps in organizing and managing dependencies effectively. By defining parent-child relationships, Pulumi can automate resource lifecycle management, ensuring proper ordering of resource creation, updates, and deletion.

### Practical Example: Custom Storage Account

Let's consider a scenario where we need to create a custom storage account in Azure using Pulumi. We'll create a custom component resource called `CustomStorageAccount` that encapsulates the creation of a storage account. Initially, we'll create the resource without specifying a parent, and then we'll refactor the code to utilize the Parent Option.

```csharp
public class CustomStorageAccount : ComponentResource
{
    public CustomStorageAccount(string name,
        CustomStorageAccountArgs args,
        ComponentResourceOptions? options = null)
        : base("CommonComponent:CustomStorageAccount", name, options)
    {
        // Creating storage account without specifying a parent
        var storageAccount = new StorageAccount("sa", new StorageAccountArgs
        {
            ResourceGroupName = args.ResourceGroupName,
            Sku = new SkuArgs
            {
                Name = SkuName.Standard_LRS
            },
            Kind = Kind.StorageV2,
            Tags = new InputMap<string> {
                { "Purpose", args.Purpose },
                { "Owner", args.Owner }
            }
        });
    }
}
```

When previewing this configuration, resources will be created independently, without any parent-child relationship:

```
pulumi preview --stack stacknamedev01
Previewing update (stacknamedev01):
     Type                                     Name                            Plan
 +   pulumi:pulumi:Stack                      stackname-stacknamedev01  create
 +   ├─ CommonComponent:CustomStorageAccount  sa                              create
 +   ├─ azure-native:resources:ResourceGroup  resourceGroup                   create
 +   └─ azure-native:storage:StorageAccount   sa                              create
Resources:
    + 4 to create
```

### Utilizing the Parent Option

Now, let's refactor the code to utilize the Parent Option by specifying the component resource (`CustomStorageAccount`) as the parent for the storage account resource. Note the `new CustomResourceOptions { Parent = this }`.

```csharp
public class CustomStorageAccount : ComponentResource
{
    public CustomStorageAccount(string name,
        CustomStorageAccountArgs args,
        ComponentResourceOptions? options = null)
        : base("CommonComponent:CustomStorageAccount", name, options)
    {
        // Creating storage account with parent specified
        var storageAccount = new StorageAccount("sa", new StorageAccountArgs
        {
            ResourceGroupName = args.ResourceGroupName,
            Sku = new SkuArgs
            {
                Name = SkuName.Standard_LRS
            },
            Kind = Kind.StorageV2,
            Tags = new InputMap<string> {
                { "Purpose", args.Purpose },
                { "Owner", args.Owner }
            }
        }, new CustomResourceOptions { Parent = this });
    }
}
```

When previewing this configuration, the parent-child relationship is correctly inferred, and resources will be organized accordingly:

```
pulumi preview --stack stacknamedev01
Previewing update (stacknamedev01):
     Type                                       Name                            Plan
 +   pulumi:pulumi:Stack                        stackname-stacknamedev01  create
 +   ├─ CommonComponent:CustomStorageAccount    sa                              create
 +   │  └─ azure-native:storage:StorageAccount  sa                              create
 +   └─ azure-native:resources:ResourceGroup    resourceGroup                   create
Resources:
    + 4 to create
```

### Conclusion

The Parent Option in Pulumi simplifies resource management by allowing developers to define parent-child relationships between resources. This feature enhances the organization and maintainability of infrastructure code, leading to more robust and scalable infrastructure deployments.