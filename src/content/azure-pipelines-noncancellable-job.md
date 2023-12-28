---
layout: post
title: Making an Azure Pipeline Stage Non-Cancellable
image: img/azure-pipelines-noncancellable-job/banner.jpeg
author: Dushyant
date: 2023-12-28T10:30:00.000Z
tags: ["DevOps", "All"]
draft: false
---
## Introduction

In a recent [StackOverflow post](https://stackoverflow.com/questions/77659044/make-azure-pipeline-stage-noncancellable/77659133), I sought advice on making a specific stage in an Azure Pipeline non-cancellable. This blog explores the question and summarizes the solutions proposed on the post as well as my co-worker [Dan](https://www.linkedin.com/in/daniel-ponting).

### The Challenge

Developers often face the challenge of ensuring the reliability of each stage in an Azure Pipeline. My specific concern was making a stage non-cancellable, meaning it should not be interrupted once started.

## Understanding Azure Pipelines

Azure Pipelines involve stages, each comprising one or more jobs. Jobs represent phases with multiple tasks. My focus was on enforcing a non-cancellable behavior for a particular stage.

## Proposed Solution

### **Custom Conditions and PowerShell Scripts**

Use [always()](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/expressions?view=azure-devops#job-status-functions) to control stage behavior. A condition that always evaluates to true ensures a stage runs, making it non-cancellable.

```yaml
stages:
- stage: CustomConditionStage
  jobs:
  - job: CustomConditionJob
    condition: always()
    steps:
    - powershell: |
        Write-Host "Running CustomConditionStage"
```

## Conclusion

Making an Azure Pipeline stage non-cancellable is important in cases where we share use shared resources. Using Pulumi or Terraform state file backend storage for example or running tests on real cloud resources. In such cases we need to ensure such stages complete successfully and finish their cleanup before next one starts. In such cases the `always()` function and [exclusive locks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&preserve-view=true&tabs=check-pass#exclusive-lock) are really handy.