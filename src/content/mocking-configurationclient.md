---
layout: post
title: Mocking Azure.Data.AppConfiguration.ConfigurationClient using Moq
image: img/mocking-configurationclient/banner.jpeg
author: Dushyant
date: 2024-09-02T23:30:00.000Z
tags: ["Moq", "All"]
draft: false
---
### Introduction

When working with Azure's App Configuration service in .NET, it's common to use the `Azure.Data.AppConfiguration.ConfigurationClient` class to interact with our configuration settings. In a unit test scenario, however, interacting directly with the Azure service is not ideal. Instead, we can mock the `ConfigurationClient` using a library like Moq to simulate its behaviour, allowing us to test our code in isolation.

In this blog post, we'll explore how to mock the `ConfigurationClient` and simulate the paging behaviour of its `GetConfigurationSettings` method using Moq. This allows us to unit test our code effectively without making actual calls to Azure.

#### Setup

Before diving into the code, ensure we have the following packages installed in our project:

- `Azure.Data.AppConfiguration`
- `Moq`
- `Azure.Core`

we can install them via NuGet:

```bash
dotnet add package Azure.Data.AppConfiguration
dotnet add package Moq
dotnet add package Azure.Core
```

#### Example Code

Let's look at an example where we mock the `GetConfigurationSettings` method of `ConfigurationClient`. We'll create a mock response that returns a list of `ConfigurationSetting` objects and simulate the paging behaviour.

```csharp
// Arrange
var endpoint = "https://example.azure-appconfig.net";
var filter = "KeyFilter";
var label = string.Empty;
var expectedValues = new List<string> { "Value1", "Value2", "Value3" };

// Create a mock of the ConfigurationClient
var configurationClient = new Mock<ConfigurationClient>();

// Simulate a page of ConfigurationSetting objects
var configurationSettingPage = Page<ConfigurationSetting>.FromValues(
    new List<ConfigurationSetting>
 {
        new ConfigurationSetting("Key1", "Value1", label),
        new ConfigurationSetting("Key2", "Value2", label),
        new ConfigurationSetting("Key3", "Value3", label)
 },
    continuationToken: null,
    response: Mock.Of<Response>()
);

// Create a Pageable response that contains the page
var response = Pageable<ConfigurationSetting>.FromPages(
    new List<Page<ConfigurationSetting>> { configurationSettingPage }
);

// Set up the mock to return the simulated pageable response when GetConfigurationSettings is called
configurationClient
 .Setup(x => x.GetConfigurationSettings(It.IsAny<SettingSelector>(), It.IsAny<CancellationToken>()))
 .Returns(response);
```

#### Explanation

Let's break down the code step by step:

1. **Arrange the Test Setup**: We start by defining the endpoint, filter, and label typically used in the `GetConfigurationSettings` method call. We also define the expected values we want our mock to return.

2. **Create a Mock ConfigurationClient**: We use Moq to create a mock instance of the `ConfigurationClient`.

3. **Simulate a Page of Configuration Settings**: The `Page<ConfigurationSetting>` class represents a single page of results. We use the `FromValues` method to create a page containing three `ConfigurationSetting` objects. Each setting has a key and value pair.

4. **Create a Pageable Response**: The `Pageable<T>` class represents a sequence of pages. We use `FromPages` to create a pageable response containing the page we just created. This simulates the response we'd get from the real `ConfigurationClient`.

5. **Set up the Mock Behavior**: Finally, we set up the mock `ConfigurationClient` to return our pageable response when the `GetConfigurationSettings` method is called with any `SettingSelector` and `CancellationToken`.

#### Conclusion

Mocking Azure services like `ConfigurationClient` allows us to isolate our unit tests from external dependencies, ensuring that our tests are fast, reliable, and repeatable. By using Moq and Azure SDK's built-in paging support, we can simulate complex behaviours like pagination and ensure our code handles these scenarios correctly.

For more detailed information on mocking with the Azure SDK and Moq, refer to the official [Microsoft documentation](https://learn.microsoft.com/en-gb/dotnet/azure/sdk/unit-testing-mocking?tabs=moq#explore-paging).