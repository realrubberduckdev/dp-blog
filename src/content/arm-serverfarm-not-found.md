---
layout: post
title: ARM deployment - Cannot find ServerFarm
image: img/arm-serverfarm-not-found/arm-banner.jpg
author: Dushyant
date: 2021-06-18T12:00:00.000Z
tags: ['Azure', 'All']
draft: false
---

# ARM Template

Deploying resources to Azure using [ARM templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) is generally quite easy given Azure's native support in the generation of the template and availability of documentation. Although recently I got the following error and I spent more time than I thought I would, hence this post as a reference to myself and hopefully help others too.

# The deployment error

The error I found while deploying was

```
{
    "Code": "NotFound",
    "Message": "Cannot find ServerFarm with name azure-functions-test-service-plan.",
    "Target": null,
    "Details": [
        {
            "Message": "Cannot find ServerFarm with name azure-functions-test-service-plan."
        },
        {
            "Code": "NotFound"
        },
        {
            "ErrorEntity": {
                "ExtendedCode": "51004",
                "MessageTemplate": "Cannot find {0} with name {1}.",
                "Parameters": [
                    "ServerFarm",
                    "azure-functions-test-service-plan"
                ],
                "Code": "NotFound",
                "Message": "Cannot find ServerFarm with name azure-functions-test-service-plan."
            }
        }
    ],
    "Innererror": null
}
```

The error says `Cannot find ServerFarm with name azure-functions-test-service-plan.` when I had the resource, also in the same resource group. Quite perplexing! After multiple attempts and then searching I found this [Azure - can't find serverfarm](https://stackoverflow.com/questions/45630953/azure-cant-find-serverfarm/66554513#66554513)

## Solution

The app service or function app being deployed has to be in the same region as the app service plan. And the error means it cannot locate the `ServerFarm` in the region of the app being deployed. So the solution is to ensure we are deploying the app to the same region as the app service plan.

I realized this after coming across this comment in the StackOverflow post linked above.
```
Issue was that I accidentally had the Function App in a different Azure Region than the App Service Plan it was referencing. Worth noting that this error can be caused by that.
```

# Conclusion

This was a simple solution or possibly a user error, thanks for me not knowing that the region matters. Hope it is useful for your deployment. Thoughts and comments welcome.
