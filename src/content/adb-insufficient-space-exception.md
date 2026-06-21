---
layout: post
title: "ADB0060: Fixing InsufficientSpaceException on Android Device"
image: img/adb-insufficient-space-exception/banner.png
author: Dushyant
date: 2026-06-21T23:00:00.000Z
tags: ["Android", "All"]
draft: false
---

<div className="seo-hidden">
Resolve ADB0060 Mono.AndroidTools.InsufficientSpaceException when deploying a .NET MAUI or Xamarin app to an Android device by clearing temporary files with adb.
</div>

# The Problem

When deploying a .NET MAUI (or Xamarin) Android application to a physical device or emulator, you may hit this error:

```plaintext
ADB0060: Mono.AndroidTools.InsufficientSpaceException: There is not enough storage space on the device to store package: /data/local/tmp/com.rubberduckdev.simpleinvoice-Signed.apk. Free up some space and try again.
```

Each time Visual Studio deploys your app it pushes the signed APK to `/data/local/tmp/` on the device. Over repeated debug sessions these files accumulate and eventually exhaust the available space in that partition.

---

## The Fix

The solution is straightforward — delete the stale temporary files from the device using `adb shell`.

### Attempt 1: adb in PATH

Your first instinct might be to run:

```powershell
adb shell rm -rf /data/local/tmp/*
```

But on many Windows development machines, `adb` is not on the system PATH, so you will see:

```
adb: The term 'adb' is not recognized as a name of a cmdlet, function, script file,
or executable program.
Check the spelling of the name, or if a path was included, verify that the path is
correct and try again.
```

### Attempt 2: Use the full SDK path

The Android SDK installed by Visual Studio or the .NET MAUI workload lives under your local AppData folder. You can invoke `adb.exe` directly:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" shell rm -rf /data/local/tmp/*
```

This clears out every temporary file that was pushed to the device. After running it, re-deploy your app and the `ADB0060` error should be gone.

---

## Adding adb to PATH permanently

If you find yourself running `adb` commands often, add the platform-tools directory to your user PATH so the short form works everywhere:

```powershell
$sdkTools = "$env:LOCALAPPDATA\Android\Sdk\platform-tools"
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "User") + ";$sdkTools",
    "User"
)
```

Restart your terminal after running the above, and `adb` will be recognised directly.

---

## Conclusion

This is a quick note-to-self post. The `ADB0060 InsufficientSpaceException` is caused by leftover APKs filling up `/data/local/tmp/` on the device. A single `adb shell rm` command clears the space and gets you back to deploying. If you hit this regularly, adding the platform-tools folder to your PATH saves a few keystrokes each time.
