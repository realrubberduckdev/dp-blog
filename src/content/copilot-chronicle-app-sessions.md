---
layout: post
title: Using /chronicle with GitHub Copilot App Sessions
image: img/copilot-chronicle-app-sessions/banner.png
author: Dushyant
date: 2026-06-22T22:00:00.000Z
tags: ["Copilot", "All"]
draft: false
---

<div className="seo-hidden">
Learn how to use the /chronicle command with GitHub Copilot app sessions to get insights and summaries from your recent coding work across Copilot CLI sessions.
</div>

# Introduction

I recently discovered that the GitHub Copilot app is built on top of GitHub Copilot CLI. This means we get access to powerful session history features, most notably `/chronicle`, which lets us pull insights from recent coding work across Copilot CLI sessions.

---

## What is /chronicle?

The `/chronicle` command taps into the session data that GitHub Copilot CLI accumulates as you work. Every interaction, code generation, and terminal command is tracked locally in a session store. `/chronicle` gives you a way to query and summarise that history.

This is particularly useful for:

- Recalling what was worked on recently
- Generating standup summaries
- Reviewing decisions made during a coding session
- Tracing back through multi-step problem solving

---

## Using /chronicle standup

The most common use case is generating a quick standup summary. Simply run:

```plaintext
/chronicle standup
```

This queries the last 24 hours of session data and produces a concise summary, what files were touched, what problems were solved, and what tools or commands were used.

The output is ideal for daily standups or async updates to the team.

---

## How It Works Under the Hood

Because the GitHub Copilot app shares the same CLI foundation, session history is unified. Whether I was:

1. Using the Copilot app to scaffold a project
2. Running Copilot CLI in a terminal to debug an issue
3. Asking Copilot to explain code in the editor

All of these interactions feed into the same session store. `/chronicle` reads from this store, so it's fast and entirely local.

---

## Querying Specific Sessions

Beyond standup summaries, `/chronicle` can query specific timeframes or topics:

e.g.

```plaintext
/chronicle search authentication
```

[Refer documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle#using-the-chronicle-slash-command)

This performs a direct content search instead of a semantic one.

---

## Why This Matters

For developers juggling multiple projects or context-switching frequently, `/chronicle` acts as a persistent memory layer. Instead of manually keeping notes about what was done and why, the session history captures it automatically.

It's especially powerful for:

- **End-of-week summaries**: Rolling up a week's worth of work without checking git logs manually
- **Onboarding context**: Reviewing how a project was set up days or weeks ago
- **Debugging trails**: Retracing steps when revisiting a tricky issue

---

## Getting Started

With the GitHub Copilot app installed, `/chronicle` is available out of the box. No additional setup required, just type `/chronicle` followed by a query or use the `standup` subcommand.

For more details, see [Using GitHub Copilot CLI session data](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions#using-chronicle-with-app-sessions) in the official documentation.

---

## Conclusion

The `/chronicle` command bridges the gap between working in the moment and reflecting on past work. By leveraging the shared session history between the GitHub Copilot app and CLI, we get a unified view of development activity, no extra tooling required.
