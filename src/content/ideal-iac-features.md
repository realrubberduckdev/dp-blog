---
layout: post
title: Features of an ideal IaC language
image: img/ideal-iac-features/banner-infra-as-code.jpg
author: Dushyant
date: 2021-12-20T8:30:00.000Z
tags: ["IaC", "All"]
draft: false
---
# Introduction
Infrastructure as Code (IaC) is the management of infrastructure (networks, virtual machines, load balancers, and connection topology) in a descriptive model, using source code. These could be cloud infrastructure of on-prem as well. Once codified we can use all the benefits of version control, testing etc.

# Festive Tech Calendar 2021
This demo is designed as my contribution for [Festive Tech Calendar 2021](https://festivetechcalendar.com), definitely check out the website for many other great topics. Happy Christmas.

This video is part of the festive tech calendar 2020.

`video: https://youtu.be/EqSNAFEUu-M`

# Features of an ideal IaC language - my thoughts
## Clarity, simplicity, unity
The language we use to deploy resources must be simple, easy to understand has a specific convention. So once written and shared, multiple users can comprehend it in the same way.
## Orthogonality
Orthogonality is the property that means "Changing A does not change B". This is nicely explained with examples [in this comment on stackoverflow](https://stackoverflow.com/a/1527430/1228479).
## Testability
Once code is written, infrastructure or otherwise, it will add a lot to our confidence if we can test it. This makes it easier to reuse code with minimal concerns. Along with unit tests, static analysis, security testing are important. Mainly if we use IaC at scale and to help deploy real-world secured and compliant resources.
## Modularity
Ideally, we won't need to rewrite the same thing again and again. So we should be able to write once and reuse it. Hence modules in IaC are quite important.
## Private registry
Registry as is, to share the modules we discuss in the previous point. A public registry is very nice to have, but a private one is a must-have in my opinion. This will help use IaC at scale, say if you have multiple teams developing and sharing modules in your organization.
## Custom functions
The ability to write custom functions such as string manipulation, date manipulation etc helps configure resources easily. An ideal IaC should have support for custom functions so we won't have to add scripts between resource deployments.
## Declarative
With an IaC we should be able to say what we want and not how. For example, on Azure, we should say deploy a function app, not call a specific azure management endpoint with a specific request body.
## IDE support
Good IDE experience is very important to be able to write IaC quickly and effectively.
## Documentation
Although IaC has to be clear, simple and straightforward, there will be some quirks, exceptions and sometimes bugs. These features, quirks and exceptions etc of an IaC need to be documented to aid the users.
## Technical support
Once an issue happens, users need to feel supported. If something with the IaC doesn't behave as expected or is difficult to comprehend, technical support becomes very important. Nothing worse than feeling lost and not being able to get help.
## Cost
The final point is cost. This is something teams will need to justify to business. If the IaC is going to hurt business, it will become difficult to adopt.


# Conclusion
If you have any thoughts or comments please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.
