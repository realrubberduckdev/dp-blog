---
layout: post
title: Azure Pipelines Artifact Download Issue - A Quick Fix
image: img/azure-pipelines-download-task-anomaly/banner.png
author: Dushyant
date: 2024-01-08T10:30:00.000Z
tags: ["DevOps", "All"]
draft: false
---
## The Problem:
There is a peculiar behavior when downloading artifacts using Azure Pipelines. The artifact, when viewed on the repository, displayed a seemingly correct structure. However, upon downloading, an unexpected string was prefixed to every element, causing a disruption in the intended folder structure and file names.

For a detailed look into the issue, check out the GitHub thread [here](https://github.com/microsoft/azure-pipelines-tasks/issues/16522).

## Understanding the Solution:
My co-worker [Dan Ponting](https://www.linkedin.com/in/daniel-ponting) found the issue as well as shared this solution with me, the details are below.

The standard way of calling the task, as shown below, led to the unwanted manipulation of folder structures and file names:

```yaml
- task: DownloadPipelineArtifact@2
  inputs:
    artifactName: 'MyFavouriteArtifact'
```

## The Solution:
The workaround involves using the shorthand version of the task, which remarkably eliminates the issue. Instead of the conventional method, the user suggests opting for the following configuration:

```yaml
- download: current
  artifact: MyFavouriteArtifact
```

This simple adjustment in the way the task is invoked resolves the problem, ensuring that the downloaded artifact retains the intended structure without any unexpected string prefixes.

## Conclusion:
The solution was easier to locate all thanks to GitHub and my coworker. The shared knowledge and experiences within the community contribute significantly to the overall improvement and efficiency of DevOps processes. Hopefully this post saves you some time as well.

For more information on the Azure Pipelines task and its configurations, refer to the official documentation [here](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/download-pipeline-artifact-v2?view=azure-pipelines).