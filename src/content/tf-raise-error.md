---
layout: post
title: Terraform - Raise an error
image: img/tf-raise-error/hashicorp-terraform-banner.jpg
author: Dushyant
date: 2020-09-17T08:30:00.000Z
tags: ["Terraform", "All"]
draft: false
---
# Introduction
The ability to conditionally raise errors is very useful if we are introducing logic and rules in our deployment. Say for example we need to validate input then we can use the newly introduced [variable validation feature in Terraform 0.13](https://www.hashicorp.com/blog/custom-variable-validation-in-terraform-0-13). But there could be a specific case where you'd want to raise an error or you've used a workaround for this validation in 0.11 which no longer works after the upgrade. More on this in a bit, and that is the case I hit recently.

# Workaround
In Terraform 0.11, there was no ability to validate input variables. So we used a workaround with `null_resource`

```
resource "null_resource" "throw_error" {
      count = 1
      "An error has occured." = true
}
```

But unfortunately and possibly rightly so, HCL became stricter from 0.12 onwards and would not allow incorrect syntax such as `"string" = true` and fail. There is a [stackoverflow question](https://stackoverflow.com/questions/56042077/terraform-v0-11-xx-null-resource-not-always-works-as-assertion) regarding this. Along with the StackOverflow question, there are lots of requests and suggested workarounds on GitHub such as [Ability to raise an error](https://github.com/hashicorp/terraform/issues/15469) & [conditionally raise a configuration error](https://github.com/hashicorp/terraform/issues/17977).

So the workaround we went for in my my team, [suggested on github](https://github.com/hashicorp/terraform/issues/17977#issuecomment-693500261) is:

```
data "external" "throw_error" {
    count = 1 # 0 means no error is thrown, else throw error
    program = ["powershell.exe", "throw 'An error has ocurred.'"]
}
```

# Explanation
The workaround uses [external data source](https://registry.terraform.io/providers/hashicorp/external/latest/docs/data-sources/data_source) which allows an external program to act as a data source. So essentially it is a hack, saying `PowerShell` will be our data source but instead, it throws an error. This happens conditionally only if we set the count to greater than 0. If set to 0, this `data` block is not executed.

# Conclusion
Hope this was useful and saves you some time. Please do share your learnings. If you have any thoughts or comments please do get in touch with me on twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.