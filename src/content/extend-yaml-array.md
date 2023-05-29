---
layout: post
title: Azure pipelines - extending yaml array
image: img/extend-yaml-array/banner.png
author: Dushyant
date: 2023-05-29T15:30:00.000Z
tags: ["Azure DevOps", "All"]
draft: false
---
# Introduction
[Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops) is a continuous integration and continuous delivery (CI/CD) service that helps you automate the building, testing, and deploying of your code to any target environment. I like using the yaml pipelines so that we are practicing true [GitOps](https://about.gitlab.com/topics/gitops/).

# Overall scenario

In a bid to reduce repetition, it is a good idea to create and share [Azure pipeline yaml templates](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops). Let's say we have a template as follows:

```
parameters:
    - name: dockerPushDependency
      type: object
      default: []  
  stages:
    - stage: DockerBuild
      pool: AgentPoolWithDockerInstance
      jobs:
        - job: DockerBuild
          steps:
          - task: Docker@2
            name: DockerBuild
            displayName: Build image to container registry
            inputs:
              repository: MyRepository
              command: Build
              containerRegistry: MyContainerRegistry
              tags: tag1

    - stage: DockerImageScan
      # ignore details, the built image gets scanned here for known vulnerabilities

    - stage: DockerPush
      dependsOn:
      # needs to depend on parameters and the image scan stage

      pool: AgentPoolWithDockerInstance
      jobs:
        - job: DockerPush
          steps:
          - task: Docker@2
            name: DockerPush
            displayName: Push image to container registry
            inputs:
              repository: MyRepository
              command: Push
              containerRegistry: MyContainerRegistry
              tags: tag1
```

In our template, we have 3 stages. We pass in dependencies into the template so that the docker push can check a previous step, say a test stage, has completed before it can trigger.
Complexity arises regarding dependency of DockerPush as it needs to depend on an array of stages that has been passed in as well as a known DockerImageScan stage which is within the template. How do we merge or add this value into the provided array in azure pipelines yaml!

# The solution or maybe the workaround
The solution that worked is based on a [great idea provided on stackoverflow](https://stackoverflow.com/a/66894872/1228479).

```
- stage: DockerPush
      dependsOn:
      - ${{ each dependencyItem in parameters.dockerPushDependency }}:
        - ${{ dependencyItem }}
        - DockerImageScan
```

Instead of performing any array manipulation, we just loop through it and present the values to the `DockerPush` `dependsOn` parameter. This the stage can now depend on whatever the consumer has provided as well as the known stage within the pipeline template.

# Conclusion
Although the trick is quite simple, took hours to get to. Mainly the feedback cycle is slow with azure pipelines. There is hope though, given such a feature is in [preview now](https://developercommunity.visualstudio.com/t/ability-to-test-yaml-builds-locally/366517).
Overall, hope this post helps you out with azure pipelines and happy CI CD to you. Please do share your learnings. If you have any thoughts or comments please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.