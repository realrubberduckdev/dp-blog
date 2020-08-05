---
layout: post
title: Why is my PowersShell function returning two values?
image: img/ps-func-returning-2-values/ps-splash.png
author: Dushyant
date: 2020-08-05T17:30:00.000Z
tags: ["PowerShell", "All"]
draft: false
---
# Introduction
This post is regarding a small [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7) function that I was writing. It started returning two values at the same time and it took me a while to figure out what was happening. Hence this post and hope it saves someone else some time.

# The function

The objective of the function we are writing is to check if an item is present in a json array.
```
{
    [
        {
            "displayName": "Apple",
            "description": "Fruit"
        },
        {
            "displayName": "Potato",
            "description": "Vegetable"
        }
    ]
}
```

Our json array is a simple `displayName` & `description` pair elements. And we need an `ItemExists` function in powershell returning boolean value, `true` if the item exists and `false` if it doesn't.

Here is a script with the function:
```
function ItemExists {
    param (
        [PSCustomObject]$jsonData,
        [string]$itemToLookFor
    )
    $jsonData | Select-Object -Property displayName | ForEach-Object {
        if ($itemToLookFor -eq $_.displayName) {
            return $true
        }
    }
    return $false
}

$json = @"
    [
    {
        "displayName": "Apple",
        "description": "Fruit"
    },
    {
        "displayName": "Potato",
        "description": "Vegetable"
    }
    ]
"@ | ConvertFrom-Json

$exists = ItemExists -jsonData $json -itemToLookFor "Apple"
Write-Host exists=$exists
```
As you can see, we are looking for string `Apple` and it exists, so it should return `true`. But the output is as follows:
```
exists=True False
```
Is the function returning two values? And if yes how and if no then why is this happening!

# Explanation

The point of interest here is [`ForEach-Object`](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/foreach-object?view=powershell-7#description).  Beginning with PowerShell 7.0, it runs each script block in parallel. The first `return` statement is within the scope of the `ForEach-Object` and the second one is outside of the scope. Meaning the first `return` is actually returning from `ForEach-Object` which is in a separate runspace. This then leads to the next `return` statement. So the function is actually returning two values, due to the loop running in separate [runspaces](https://devblogs.microsoft.com/scripting/beginning-use-of-powershell-runspaces-part-1/).

# Rewriting the function

How do we get the function to work then?
Let's rewrite the function without `ForEach-Object`, rather we can use `foreach` loop, as follows.

```
function ItemExists {
    param (
        [PSCustomObject]$jsonData,
        [string]$itemToLookFor
    )
    $items = $jsonData | Select-Object -Property displayName
    foreach ($item in $items) {
        if ($itemToLookFor -eq $item.displayName) {
            return $true
        }
    }
    return $false
}

$json = @"
    [
    {
        "displayName": "Apple",
        "description": "Fruit"
    },
    {
        "displayName": "Potato",
        "description": "Vegetable"
    }
    ]
"@ | ConvertFrom-Json

$exists = ItemExists -jsonData $json -itemToLookFor "Apple"
Write-Host exists=$exists
```
This time the loop doesn't run in separate runspaces and hence the output is:
```
exists=True
```
This is exactly the value we wanted.

# Conclusion
Hope this was useful and saves you some time. Please do share your learnings. If you have any thoughts or comments please do get in touch with me on twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.
