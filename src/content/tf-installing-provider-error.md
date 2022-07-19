---
layout: post
title: Terraform - working around 'error installing provider'
image: img/tf-installing-provider-error/hashicorp-terraform-banner.jpg
author: Dushyant
date: 2022-07-19T13:30:00.000Z
tags: ["Terraform", "All"]
draft: false
---
# Introduction
Recently many teams I have been working with have been hitting this `error installing provider` issue with Terraform. We have noticed that it is only happening with Terraform 0.11 (could be happening with other version, we just haven't noticed it yet).

The error message is in lines of

```
Error installing provider "null": openpgp: signature made by unknown entity. 
Terraform analyses the configuration and state and automatically downloads 
plugins for the providers used. However, when attempting to download this 
plugin an unexpected error occured. 
This may be caused if for some reason Terraform is unable to reach the 
plugin repository. The repository may be unreachable if access is blocked 
by a firewall. 
If automatic installation is not possible or desirable in your environment, 
you may alternatively manually install plugins by downloading a suitable 
distribution package and placing the plugin's executable file in the 
following directory: 
    terraform.d/plugins/windows_amd64 
```

# Workaround
**Warning**: This is not recommended for production use.

The only way it seems to work for us is to use unverified plugins.

```
terraform init -verify-plugins=false
```

# Explanation
The issue here is the `openpgp` plugin signature has changed and by default `Terraform` performs a verification for any plugins used. By skipping verification, we are at risk of getting security vulnerability into our deployment process. Hence **it is definitely not recommended to skip plugins verification in production systems**. This can be a quick workaround while you possibly upgrade your Terraform and provider versions to use the latest valid plugins.

Please note that I was unable to find any official documentation about this `terraform init` parameter. The only place it is described is at [lightnetics.com](https://www.lightnetics.com/topic/2956/terraform-init-help).

# Conclusion
Hope this was useful and saves you some time. Please do share your learnings. If you have any thoughts or comments please do get in touch with me on twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.