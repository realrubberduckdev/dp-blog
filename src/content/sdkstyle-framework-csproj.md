---
layout: post
title: SDK style csproj & .Net framework
image: img/microsoft-dotnet-cover.jpg
author: Dushyant
date: 2020-02-22T19:00:00.000Z
tags: ["MSBuild", "All"]
draft: false
---
# Introduction
The [sdk style csproj (csharp project style)](https://docs.microsoft.com/en-us/nuget/resources/check-project-format) are becoming the new standard for csproj files. All dotnet core and .netstandard project files are currently using these project styles. Microsoft is also constantly bringing in new improvements for sdk style projects, refer [Additions to the csproj format for .NET Core](https://docs.microsoft.com/en-us/dotnet/core/tools/csproj).

# SDK style csproj advantages
The sdk style csproj files come with many advantages. The main one being they are being constantly supported and improved by Microsoft. The other technical advantages are as follows.
 - **Less clutter**: The csproj no more has to keep a list of files to include, rather can keep a list to exclude. This makes it cleaner and developers do not need to remember to add new files to the csproj. Just placing in the folder of csproj adds it. Thereby less clutter in the csproj file and this reduces noise in git commits too. In addition to this, we do not need any reference to System etc too. Only the project references and package references.
- **MSBuild /t:restore**: With sdk style csproj, we can perform a nuget restore using msbuild target 'restore'. This is great because we will be dependent on one less tool in our build process.
- **Generate package on build**: We can almost eliminate the need for nuspec files to generate nupkg. I say 'almost' because there can be a case when we will still need it, described in [Generate nupkg using msbuild](https://www.rubberduckdev.com/msbuild-nuget/). In most cases we can just set `<GeneratePackageOnBuild>true</GeneratePackageOnBuild>` and generate nupkg from csproj.
- **Auto reload**: We can edit the csproj directly in visual studio without having to unload and reload the csproj and then it can auto-reload as well.

# Not for .Net Framework csproj!
Although we have established that sdk style csproj is here for the good, it is not the default project template setting on visual studio. Or to be honest, Microsoft does not ship sdk style csproj for .net framework projects.

There have been many requests in this regard:
- [Visual Studio 2017, use new style csproj by default when creating new projects](https://stackoverflow.com/questions/50933230/visual-studio-2017-use-new-style-csproj-by-default-when-creating-new-projects)
- [How do you create a .NET program using the new CSPROJ format in VS2017 (Or VS2019)](https://stackoverflow.com/questions/58547618/how-do-you-create-a-net-program-using-the-new-csproj-format-in-vs2017-or-vs201)

And two from me too:
- [Tweet](https://twitter.com/rubberduckdev/status/1130786137142964224) triggering a discussion on the topic of default project templates.
- [Visual studio developer community ticket](https://developercommunity.visualstudio.com/idea/576677/new-style-csproj-as-default-net-framework-project.html) to get an answer from Microsoft.

Unfortunately, as it seems, there is no current plan to implement or ship sdk style projects for the .net framework. The possible explanation can be that, the upcoming [.NET 5](https://devblogs.microsoft.com/dotnet/introducing-net-5/) is likely to be made a better place to migrate to. Until then we all have a large amount of .net framework code in our repositories.

# SDK style .net framework project template
As a simple solution, we now have sdk style project templates visual studio extension [SDKStyle.Templates.Net](https://marketplace.visualstudio.com/items?itemName=rubberduckdev.SDKStyleTemplatesNet) in the market place. Hosted on [github](https://github.com/realrubberduckdev/SDKStyle.Templates.Net).

# Conclusion
The SDKStyle.Templates.Net hopefully will be helpful until we get official templates. Until then do help with issue reporting or creating pull requests with any project templates missed there or feedback in general.