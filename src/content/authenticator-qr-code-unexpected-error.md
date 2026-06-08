---
layout: post
title: Microsoft Authenticator - "Unexpected error" when scanning QR code
image: img/authenticator-qr-code-unexpected-error/banner.png
author: Dushyant
date: 2026-06-08T10:00:00.000Z
tags: ["Azure", "All"]
draft: false
---

## Introduction

While onboarding a brand new user to a tenant, the Microsoft Authenticator app refused to register the account, even though other users on the same tenant were registering without any issue. This post captures the symptoms and the fix so future-me (and you) don't have to spend a week on a support ticket to find it.

## The setup and issue

The flow that failed was a textbook first-time MFA setup:

1. New user is created in Microsoft Entra ID.
2. User signs in to `https://login.microsoftonline.com` with the temporary password.
3. User sets a new password.
4. User is prompted to set up MFA and chooses **Work or school account** in Microsoft Authenticator.
5. User scans the QR code.

At step 5, the Authenticator app fails with:

```plaintext
Unable to add account.
Unexpected error. Please contact your local IT administrator to resolve the problem.
```

Things worth noting:

- Other (existing and newly created) users could add their accounts to Authenticator on different devices without any problem.
- The same Authenticator app on the affected device already had other work accounts registered and was working fine.
- The tenant configuration, Conditional Access, and user state all looked healthy.

So the failure was clearly local to the **Authenticator app's state on that one device**, not a tenant or account issue.

## The solution

The fix turned out to be a single, low-key option inside the Authenticator app:

**Authenticator app → Settings → Device Registration → Reset Device Notifications.**

After triggering **Reset Device Notifications**, the QR code scan completed and the account was added on the first try.

## Why it works

When you add a work or school account, the Authenticator app must complete two things behind the scenes:

1. Register the app/device with Microsoft Entra ID.
2. Establish a push notification channel (via FCM on Android / APNs on iOS) so MFA prompts can be delivered.

If the local notification registration state is stale or inconsistent - for example after OS updates, app updates, restoring from backup, or partially failed previous registrations - the registration handshake can fail and surface as the generic "Unexpected error".

**Reset Device Notifications** clears that local state and forces the app to re-establish a fresh notification registration, which unblocks the new account add.

## Conclusion

If you ever hit "Unable to add account. Unexpected error." in Microsoft Authenticator and the tenant side looks healthy, try **Reset Device Notifications** before going down the rabbit hole of factory resets or new devices. Hope this saves you some time.
