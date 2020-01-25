---
layout: post
title: Generate nupkg using msbuild
image: img/msbuild-nuget.png
author: Dushyant
date: 2020-01-25T11:00:00.000Z
tags: ["MSBuild", "All"]
draft: false
---
# Introduction
Among many other advantages of using sdk style csproj in our solutions, to be able to generate nupkg without a nuspec file is a major one. This is described in [Microsoft documentation - Create a NuGet package using MSBuild](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package-msbuild)

I agree that it is a big step towards being able to use msbuild to generate artifacts such as exe, dll and now nupkg. But the issues lies with the fact that the msbuild/csproj always assumes that it is a class library, thereby always adding a dll file to the nupkg.

# Issue in detail

So the case we have is, we can generate a specific folder structure in a nupkg using nuspec file. And we hit issues when we try the same using a csproj file, in a bid to remove nuspec file usage.

## The case - RubberDuckDev.AfterBuild.nupkg
The overall plan of this nupkg is to just keep a targets file in build folder.
So the folder structure is as follows:
```
RubberDuckDev.AfterBuild.nupkg
|____build
         |____
              RubberDuckDev.AfterBuild.targets
```

So let us assume that we have nuspec file and we do not use msbuild. In such a case we will follow [Run nuget pack to generate the .nupkg file](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package#run-nuget-pack-to-generate-the-nupkg-file) and use a nuspec file RubberDuckDev.AfterBuild.nuspec with the following contents.

```
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>RubberDuckDev.AfterBuild</id>
    <version>1.0.0</version>
    <title>RubberDuckDev targets file</title>
    <authors>RubberDuckDev</authors>
    <owners>RubberDuckDev</owners>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>Targets file from RubberDuckDev.</description>
    <summary>Runs custom targets designed by RubberDuckDev.</summary>
  </metadata>
  <files>
    <file src="build\**\*.*" target="build" />
  </files>
</package>
```
To generate the nupkg, we just run:
```
nuget pack RubberDuckDev.AfterBuild.nuspec
```

Now if we are to do this using a sdk style csproj is we create a csproj file RubberDuckDev.AfterBuild.csproj with nupkg related properties. Which is as follows:
```
<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <PackageId>RubberDuckDev.AfterBuild</PackageId>
    <Title>RubberDuckDev targets file</Title>
    <Authors>RubberDuckDev</Authors>
    <Owners>RubberDuckDev</Owners>
    <Description>Targets file from RubberDuckDev.</Description>
    <Summary>Runs custom targets designed by RubberDuckDev.</Summary>
  </PropertyGroup>
  <ItemGroup>
    <None Include="build\**\*.*" Pack="True" PackagePath="build\" />
  </ItemGroup>
</Project>
```

To generate the nupkg, we just run msbuild:
```
msbuild RubberDuckDev.AfterBuild.csproj
```

The problem is the nupkg generated will have an empty dll preset as csproj is assumed to be a class library by default. So the folder structure is now as follow, which what we did not want.

```
RubberDuckDev.AfterBuild.nupkg
|____build
         |____
              RubberDuckDev.AfterBuild.targets
|____lib
         |____
              net46
                   |____
                        RubberDuckDev.AfterBuild.dll
```

This create an unnecessary addition to our nupkg the RubberDuckDev.AfterBuild.dll file.

# The solution - nuspec
The only way I could get it to work is by using a nuspec and csproj together. That is to use msbuild to generate the required folder structure in the nupkg.

So the csproj finally looks like:
```
<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <NuspecFile>RubberDuckDev.AfterBuild.nuspec</NuspecFile>
  </PropertyGroup>
</Project>
```
The RubberDuckDev.AfterBuild.nuspec file lives in the same folder as the csproj. Only msbuild-ing this csproj will give us the required nupkg with the correct folder structure and no empty dll file.

## Versioning technique
I dislike editing files and patching versions at build time and, in my opinion, we should rather be passing in a property/variable to build process for versioning. We can achieve this using the csproj way of building the nupkg.

For this, the csproj will look as follows.
```
<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <NuspecFile>RubberDuckDev.AfterBuild.nuspec</NuspecFile>
    <Version Condition="'$(Version)' == ''">1.0.0</Version>
    <NuspecProperties>version=$(Version)</NuspecProperties>
  </PropertyGroup>
</Project>
```
What it is saying is that, pass in a property into nuspec named as 'Version'. And the default value of 'Version' is 1.0.0, unless ofcourse set to some other value.

In order to accept and use the property, the nuspec has to change slightly.
```
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>RubberDuckDev.AfterBuild</id>
    <version>$version$</version>
    <title>RubberDuckDev targets file</title>
    <authors>RubberDuckDev</authors>
    <owners>RubberDuckDev</owners>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>Targets file from RubberDuckDev.</description>
    <summary>Runs custom targets designed by RubberDuckDev.</summary>
  </metadata>
  <files>
    <file src="build\**\*.*" target="build" />
  </files>
</package>
```
Notice how the version element now uses a property $version$.

With this we can generate RubberDuckDev.AfterBuild.2.0.0.nupkg using the command:
```
msbuild RubberDuckDev.AfterBuild.csproj /P:Version=2.0.0
```
And this will also give us the expected folder structure. And no empty dll file.

# Advantages of using msbuild
We could achieve the folder structure in the nupkg using the nuget pack technique we discussed earlier. But there are more advantages to using msbuild in my opinion.

- One tool to build and generate artifacts. No need to use msbuild for building and nuget for generating nupkg. We can also do a nuget restore using msbuild using command `msbuild RubberDuckDev.AfterBuild.csproj /t:Restore`. So msbuild can serve multiple purposes.
- Easier versioning technique. No need to edit nuspec file during build to generate new versions.
- More aligned development, build & test technique using only one tool.

# Conclusion
It makes development, build, & test easier if we can have multiple csproj in one visual studio solution and not have to add special cases for nuget pack in our scripts. Although sdk style csproj helps us generate nupkg, it is yet to replace nuspec files. I hope it does.

Is there a better technique to build nupkgs? Do let me know.
If you agree/disagree with this post, please comment or tweet about it.