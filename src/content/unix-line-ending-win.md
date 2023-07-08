---
layout: post
title: Unix line endings on Windows
image: img/unix-line-ending-win/banner.jpg
author: Dushyant
date: 2023-07-08T23:30:00.000Z
tags: ["Unix", "All"]
draft: false
---
# Introduction
Many of us are likely running Linux-based container images on the Windows operating system. This is where writing scripts in a Windows IDE such as VSCode and then running them in a container image such as Alpine or Debian becomes troublesome due to encoding and line endings. I recently hit this line-ending issue and took a while to understand the following. There are two types of line endings based on the two main operating systems. Linux and Mac OS X systems use the Unix line ending, which is LF. Windows systems use the DOS line ending, which is CR+LF. When we have the Windows-style line ending and try to run the script in a Linux-based docker container, it ends up throwing errors.

# Workaround/Solution
The workaround I used was to install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) Ubuntu. This is so that I can test run any shell scripts I write before running them in a docker container.
```
wsl --install Ubuntu-22.04
```

Install a tool called [dos2unix](https://dos2unix.sourceforge.io/), and it has a detailed [man page](https://manpages.org/dos2unix) as well.

```
rubberduck@MYUNIXMACHINE:/mnt/c$sudo apt-get update
rubberduck@MYUNIXMACHINE:/mnt/c$sudo apt-get install dos2unix
```

Finally, use the dos2unix tool to change the encodings of the script (say script.sh as an example) so it can run on Linux.
```
rubberduck@MYUNIXMACHINE:/mnt/c$ cd source
rubberduck@MYUNIXMACHINE:/mnt/c$ dos2unix script.sh
```

# Conclusion
There might be other better ways of achieving this, and I am still learning the Unix ways of life. If you are aware of an easier technique, please share.
Hope this was useful and saves you some time. Please do share your learnings. If you have any thoughts or comments, please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.