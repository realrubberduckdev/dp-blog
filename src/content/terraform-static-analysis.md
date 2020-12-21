---
layout: post
title: Static analysis of Azure resource configuration
image: img/terraform-static-analysis/hashicorp-terraform-banner.jpg
author: Dushyant
date: 2020-12-24T8:30:00.000Z
tags: ["Terraform", "All"]
draft: false
---
# Introduction
Static code analysis of code has been there for quite a while now and it is very useful now in case of configuration as code scenario as well. Often, we make mistakes in our configuration code (HCL or not), but if you are using [Terraform HCL](https://www.terraform.io/docs/configuration/index.html) then [TFSec](https://github.com/tfsec/tfsec) is a good choice. When I tried, I was up and running within 5 to 10 minutes, soon followed by CI with Github actions. I like docker in general, so took the docker approach, which hopefully makes it more usable across environments.

# Festive Tech Calendar 2020
This demo is designed as my contribution for [Festive Tech Calendar 2020](https://festivetechcalendar.com/), definitely check out the website for some many other great topics. Happy Christmas.

This video is part of the festive tech calendar 2020.

`video: https://t.co/K3KnFrItBz?amp=1`

# GitHub
All the code shown in the video is available at [https://github.com/realrubberduckdev/terraform-static-analysis](https://github.com/realrubberduckdev/terraform-static-analysis).

# Conclusion
Hope this was useful and saves you some time if you are trying this out. Please do share your learnings. If you have any thoughts or comments please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.