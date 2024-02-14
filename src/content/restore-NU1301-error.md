---
layout: post
title: Resolving NU1301 when using Azure Artifacts
image: img/restore-NU1301-error/banner.png
author: Dushyant
date: 2024-02-14T14:30:00.000Z
tags: ["DevOps", "All"]
draft: false
---

### Understanding the NU1301 Error

Before we delve into the solution, let's briefly understand what the NU1301 error signifies. This error message typically occurs when the NuGet package manager is unable to load the service index for a particular package source. It can happen due to various reasons, such as network connectivity issues, misconfigured package sources, or authentication problems. In this post we will look to solve the authentication problem.

### Step 1: Install the Azure Artifacts Credential Provider

The Azure Artifacts Credential Provider is a tool that helps manage credentials for Azure Artifact based NuGet package sources. To install this provider, follow [docs](https://github.com/microsoft/artifacts-credprovider?tab=readme-ov-file#setup).

### Step 2: Run `dotnet restore --interactive`

Once installed, run the `dotnet restore --interactive` command to resolve the NU1301 error. This command initiates an interactive authentication process, allowing us to provide credentials for the NuGet package sources that require authentication. Follow these steps:

1. Navigate to your .NET project directory using the command prompt or terminal.

2. Run the following command:
   ```
   dotnet restore --interactive
   ```

3. When prompted, enter the required credentials for the NuGet package sources. Make sure to provide accurate credentials to authenticate successfully.

4. Once the authentication process is complete, the `dotnet restore` command will proceed to restore the NuGet packages for your project without encountering the NU1301 error.

### Conclusion

This post is more like a note to self and I hope it helps out if others get this error. Feel free to reach out if you have any questions or encounter any issues along the way. Happy coding.