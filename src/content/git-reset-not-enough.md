---
layout: post
title: When git reset --hard Isn’t Enough
image: img/git-reset-not-enough/git_banner.png
author: Dushyant
date: 2026-06-05T00:00:00.000Z
tags: ["Git", "All"]
draft: false
---

## Introduction

I ran into a small but frustrating issue recently. Git was telling me my branch was ahead of origin by a couple of commits, even though I just wanted to throw everything away and go back to the remote version.

My first instinct was the usual:

```bash
git reset --hard
```

But nothing changed. The "2 unpushed commits" were still there.

### What’s actually happening

`git reset --hard` on its own only resets your working directory to your current `HEAD`. If your local branch already includes those extra commits, Git considers that the correct state. So it doesn’t remove anything.

In other words, you’re resetting to the wrong place.

### The fix

What worked straight away was resetting to the remote branch instead:

```bash
git fetch origin
git reset --hard origin/branch-name
```

### Why this works

* `git fetch origin` updates your view of the remote
* `git reset --hard origin/branch-name` moves your local branch pointer back to exactly where the remote branch is

This effectively discards any local commits that haven’t been pushed.

### A quick note

This is a destructive operation. Any unpushed commits will be lost, so it’s worth double-checking that you really don’t need them.

### Takeaway

If you’re trying to get your branch back in sync with the remote and `git reset --hard` doesn’t help, it’s probably because you’re resetting to your own `HEAD`. Point it at `origin/branch-name` instead, and the issue goes away.
