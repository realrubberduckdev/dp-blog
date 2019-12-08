---
layout: post
title: Azure DevOps flaky test identification & reporting
image: img/flaky-test-splash.png
author: Dushyant
date: 2019-12-08T11:00:00.000Z
tags: ["Azure", "All"]
draft: false
---
# Introduction
We will agree that flaky tests make software development a challenging affair. Such tests add non-determinism and uncertainty to our test suite.

"Non-deterministic tests have two problems, firstly they are useless, secondly they are a virulent infection that can completely ruin your entire test suite."
-- Martin Fowler [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html)

Although we find it frustrating, it is inevitable that as a codebase grows and becomes more complicated, we get some flaky tests. Be it because of simple reasons as bad setup/teardown or dependency on third party components to difficult to avoid situations such as infrastructure or concurrency.

## Shoutout to Azure advent calendar
This blog post is published as part of [Azure advent calendar](https://azureadventcalendar.com/). I would highly recommend a visit to the advent calendar and check out the other amazing topics published there. All videos on the calendar are at [Azure Advent Calendar Youtube channel](https://www.youtube.com/channel/UCJL9wCcmeMBbah4J0uOWIPg)

# Flaky test detection on Azure DevOps

![Flaky test - Fry](./img/flaky-test.jpg)

If you have got the same issue as [Fry](https://en.wikipedia.org/wiki/Philip_J._Fry) then here's a video explanation on how to use Azure DevOps to assist in identifying and reporting flaky tests.

`video: https://youtu.be/m2KSh0JrM-Q`

# Conclusion
If you have any thoughts or comments please do get in touch with me on twitter [@rubberduckdev](https://twitter.com/rubberduckdev).

### Credits
Flaky test banner by [Bailey McGinn](https://baileymcginn.com/about)