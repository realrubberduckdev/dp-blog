---
layout: post
title: Avoid Storing Secrets in PowerShell's Command History
image: img/ps-secret-in-history/ps-splash.png
author: Dushyant
date: 2025-03-17T17:30:00.000Z
tags: ["PowerShell", "All"]
draft: false
---

## Introduction

If you're using PowerShell scripts to manage secrets like API tokens, passwords, or other sensitive data, you may think you're safe by using environment variables or script parameters like `$PAT` or `$SomePassword` to avoid hardcoding secrets in your scripts. However, there's a common pitfall that many PowerShell users overlook: the PowerShell command history.

PowerShell saves every command you execute in a file located at:

```cmd
%userprofile%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
```

This file stores all your PowerShell commands, including those that might contain sensitive information, like manually setting a parameter for a script:

```powershell
$PAT = 'mySuperSecretToken'
```

Even though you’re not committing this secret to Git, it's still saved in plain text in your command history, which means it’s just as vulnerable if someone accesses your machine. In this blog post, we'll look at how to prevent this from happening.

## Why is this a Security Concern?

If anyone gains access to your machine and navigates to the `ConsoleHost_history.txt` file, they can see all the commands you've executed, including any credentials or secrets you've input manually.

Here’s an example of what could happen:

```plaintext
cd C:\Projects\MyProject
$SomePassword = 'superSecurePassword123!'
git push origin main
```

A simple look at your PowerShell history could reveal sensitive data like passwords, API tokens, or private keys.

---

## How to Prevent Secrets from Appearing in PowerShell History

### 1. Clear History After Entering Sensitive Information

One simple way to prevent secrets from being stored is to clear the PowerShell history immediately after running a sensitive command:

```powershell
Clear-History
```

This will remove all commands from the current session’s memory. However, it doesn't retroactively remove sensitive commands already written to `ConsoleHost_history.txt`. You should also regularly clear the file manually:

```powershell
Remove-Item "$env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"
```

### 2. Use Secure String for Secrets

Rather than passing secrets as plain text, you can use PowerShell's `SecureString` to store sensitive data. While this won’t stop it from being written to the history, it helps protect it when stored or transmitted:

```powershell
$SecurePassword = Read-Host "Enter Password" -AsSecureString
```

This method prompts the user to enter the secret interactively, and the input won't be logged in the command history.

### 3. Disable Command History

If you often deal with sensitive information in your PowerShell sessions, it might be best to disable the history feature entirely. You can do this by editing the PowerShell profile file:

1. Open the PowerShell profile for editing:

   ```powershell
   notepad $PROFILE
   ```

2. Add the following line to disable PSReadLine's history recording:

   ```powershell
   Set-PSReadlineOption -HistorySaveStyle SaveNothing
   ```

3. Save the file and restart PowerShell. Now, PowerShell won’t save any commands to history.

### 4. Use Environment Variables for Sensitive Data

To further reduce risk, you can store sensitive information in environment variables. These won't be saved to history, as they are set outside the scope of PowerShell:

```powershell
$PAT = $env:MY_PERSONAL_ACCESS_TOKEN
```

Just make sure that environment variables containing secrets are not stored in plaintext in scripts or configuration files.

## Best Practices for Handling Secrets

1. **Avoid typing secrets directly into the PowerShell prompt**. Always use `Read-Host` with the `-AsSecureString` flag to securely capture input.

2. **Clear the command history** if you've entered sensitive information manually during a session.

3. **Store secrets in a dedicated secret management system** (like Azure Key Vault, HashiCorp Vault, or AWS Secrets Manager), and retrieve them programmatically instead of hardcoding or passing them manually.

4. **Disable history recording** when working in environments where sensitive data will be routinely entered.

5. **Regularly audit your command history** to ensure no sensitive data is accidentally exposed.

## Conclusion

The PowerShell command history can be a double-edged sword: it's helpful for recalling past commands, but it can expose sensitive information if not managed carefully. If you're working with secrets in PowerShell, take steps to prevent them from ending up in the command history file by using secure input methods, clearing history, or disabling it altogether. By following the best practices outlined above, you can better safeguard sensitive data in your PowerShell environment.

Stay safe and keep your secrets secure!
