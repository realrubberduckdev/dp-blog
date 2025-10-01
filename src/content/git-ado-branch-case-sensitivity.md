---
layout: post
title: Git Branch Naming Conflicts in Azure DevOps
image: img/ados-splash.png
author: Dushyant
date: 2025-10-01T17:30:00.000Z
tags: ["Git", "AzureDevOps", "All"]
draft: false
---

## 🧩 What They Are and How to Fix Them

If you've ever pushed a branch to Azure DevOps and been greeted with a cryptic error like this:

```pwsh
[remote rejected] bug/456789-fix-something -> bug/456789-fix-something (Name conflicts with refs/heads/Bug/987654-fix-another-thing)
```

You're not alone. This error can be frustrating, especially when everything looks fine locally. Let's break down what’s happening and how to resolve it.

---

## 🔍 Understanding the Error

This error means that **Azure DevOps is rejecting your push because the branch name you're trying to use conflicts with an existing branch name**—but not in the way you might expect.

### The culprit? **Case sensitivity.**

While Git is case-sensitive on most systems, **Azure DevOps treats branch names as case-insensitive**. So if you have:

- `bug/456789-fix-something`
- `Bug/987654-fix-another-thing`

Azure DevOps sees these as potentially conflicting because it doesn’t distinguish between `bug/` and `Bug/`.

---

## 🛠️ How to Fix It

Here are a few ways to resolve this issue:

### ✅ 1. Rename Your Branch Locally

Avoid the conflict by renaming your branch to something unique:

```pwsh
git branch -m bug/456789-fix-something bugfix/456789-fix-something
git push origin bugfix/456789-fix-something
```

This sidesteps the naming conflict entirely.

---

### ✅ 2. Delete the Conflicting Remote Branch (If Safe)

If the conflicting branch is no longer needed and you're sure it's safe to remove:

```pwsh
git push origin --delete Bug/987654-fix-another-thing
```

Then retry your push.

---

### ✅ 3. Adopt a Clear Naming Convention

To prevent future conflicts, consider using a consistent and distinct naming convention for branches—such as `feature/`, `bugfix/`, `hotfix/`, etc.—and avoid mixing cases.

---

## 🧠 Final Thoughts

This issue is a great reminder that **case sensitivity can behave differently across systems**, and that naming conventions matter—especially in collaborative environments like Azure DevOps.
