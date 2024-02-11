---
layout: post
title: Unity Android - Resolve APK Failed to Install
image: img/unity-android-no-matching-abis/banner.jpg
author: Dushyant
date: 2024-02-11T22:30:00.000Z
tags: ["Android", "All"]
draft: false
---

As a newcomer to the world of Android development and Unity, encountering errors can be a daunting experience. One common stumbling block that many beginners face is the dreaded "APK failed to install" error, accompanied by the message: "INSTALL\_FAILED\_NO\_MATCHING\_ABIS: Failed to extract native libraries, res=-113." If you've encountered this error, fear not! In this guide, we'll walk through a simple solution that involves adjusting some settings in Unity to resolve the issue.

Before we dive into the solution, let's first understand what this error means. When we build our Unity project for Android, it includes native libraries specific to the CPU architecture of the target device. These native libraries are compiled into our APK and are essential for our app to run correctly on different devices. The error message "INSTALL\_FAILED\_NO\_MATCHING\_ABIS" indicates that the Android Package (APK) does not contain native libraries compatible with the CPU architecture of the device on which we are trying to install the app.

To fix this error, follow these steps:

1. **Open our Unity Project:**
   Launch Unity and open the project in which we are encountering the "APK failed to install" error.

2. **Navigate to Player Settings:**
   In the Unity Editor, go to `Edit > Project Settings > Player` to access the Player Settings for our project.

3. **Set Scripting Backend to IL2CPP:**
   In the Player Settings window, locate the "Other Settings" section. Under this section, find the "Scripting Backend" dropdown menu and select "IL2CPP." IL2CPP is a Unity technology that translates our C# scripts into C++ code, which can then be compiled natively for the target platform, including Android.

4. **Select ARMv7 and ARM64 Architectures:**
   Still in the Player Settings window, scroll down to the "Target Architectures" section. Check the boxes next to "ARMv7" and "ARM64" architectures. These options ensure that our APK includes native libraries compatible with both ARMv7 and ARM64 CPU architectures, covering a wide range of Android devices.

5. **Rebuild our Project:**
   After making these changes, rebuild our Unity project for Android by going to `File > Build Settings > Build`. Ensure that we select the appropriate platform (Android) and click on "Build." This process will generate a new APK with the updated settings.

6. **Test our App:**
   Once the build process is complete, install the newly generated APK on our device and verify that the "APK failed to install" error no longer occurs. our app should now install and run successfully on a variety of Android devices.

By setting the scripting backend to IL2CPP and selecting ARMv7 and ARM64 architectures in the Unity Player Settings, we've ensured that our APK includes the necessary native libraries to support a wide range of Android devices. This simple adjustment resolves the "INSTALL\_FAILED\_NO\_MATCHING\_ABIS" error and paves the way for a smoother development experience.

Remember, as a newcomer to Android and Unity development, I am learning this solution among few others. This post is mainly for me not to forget this lesson and hopefully it helps ou out other newbies as well. Happy coding!