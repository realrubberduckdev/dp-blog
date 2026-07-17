---
layout: post
title: DORA Metrics in Practice - Giving Leadership Real Visibility Into Delivery Performance
image: img/dora-in-practice/banner.png
author: Dushyant
date: 2026-07-17T14:00:00.000Z
tags: ["Platform", "All"]
draft: false
---

For a long time, conversations about delivery performance in the teams I worked with were mostly anecdotal. Someone would say releases felt slower this quarter, or that a particular product had a rough month, and everyone would nod along without much to point to. It was not that the feeling was wrong. It was that we had no shared, objective way to check it.

We changed that by building DORA metrics dashboards in DataDog for two products inside a regulated insurance environment. The goal was simple. Give leadership real visibility into delivery performance, not a summary written after the fact, but a live picture anyone could look at.

## The four numbers that mattered

DORA research settles on four metrics that correlate strongly with high performing engineering organisations: deployment frequency, lead time for changes, change failure rate, and time to restore service. We built our dashboards around these because they are hard to argue with. They describe outcomes, not activity. A team can look busy without shipping value, and these numbers cut through that.

Deployment frequency told us how often we were actually getting change into production, which mattered a great deal in a regulated setting where every release goes through careful governance. Lead time showed how long an idea sat before it reached users. Change failure rate and recovery time together told a quieter but more important story about how safely we were moving, not just how fast.

## What changed once the data existed

Once the dashboards were live, the conversations with leadership shifted. Instead of debating whether delivery felt slower, we could look at the trend line together and ask why, with actual data in front of us. That is a much more productive starting point. It moved us from opinion to shared understanding, and from there to decisions we could all stand behind.

It also changed how we talked about improvement work. Investment in tooling or process changes stopped being a leap of faith. We could show, with the same four numbers, whether an investment had actually paid off. That made it easier to justify the time spent on platform work that does not always show up in a product roadmap but quietly makes everything else faster and safer.

## A number is a starting point, not the whole answer

None of this means the metrics tell the full story on their own. A dashboard cannot explain context, and we were careful not to treat a single number as a verdict on any one team or person. What the dashboards gave us was a shared reference point, something everyone in the room could look at together instead of relying on separate impressions of the same quarter.

That, in the end, is what I think good platform observability is for. Not to score people, but to give the whole organisation, from engineers to leadership, the same honest view of how we are actually doing, so we can make better decisions together.
