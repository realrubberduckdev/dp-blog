---
layout: post
title: Simple active-active configuration with Azure Front Door
image: img/azure-frontdoor-simple-active-active/banner.jpg
author: Dushyant
date: 2021-04-11T12:00:00.000Z
tags: ['Azure', 'All']
draft: false
---

# Azure Front Door

In this post, we will see a simple active-active configuration using Azure Front Door. As per [Microsoft documentation](https://docs.microsoft.com/en-us/azure/frontdoor/front-door-overview), Azure Front Door is a global, scalable entry-point that uses Microsoft global edge network to create fast, secure, and widely scalable web applications. So it does a lot more than what we are looking at in this post.

# Active active configuration

In the world disaster recovery, an active-active configuration is really useful as both (at least 2) services behind a load balancer are constantly in use. So if one goes down, the other one keeps serving requests.

## Architecture

In our architecture diagram below, we will use two azure functions to run in an active-active mode with an Azure Front Door acting as a load balancer.

![architecture](./img/azure-frontdoor-simple-active-active/architecture.png)

Note that both the function apps are in different regions, meaning in case of a disaster taking out one region, the other can keep working. We can span it to more regions depending on the requirements.

## Function app configuration

In our case, we are deploying an HTTP triggered with anonymous authorization (to keep the setup simple). In the response message, we just specify the region it is hosted in so we can see it in our logs when we test it.

![UKS funap 1](./img/azure-frontdoor-simple-active-active/uks-funap.png)
<br/>

The anonymous authorization is to keep the setup simple when we test it.

![UKS funap 2](./img/azure-frontdoor-simple-active-active/uks-funap2.png)
<br/>

## Azure front door and function app configuration

On the front door, we provide a hostname/domain name which is what the users will send requests to.

![fd 1](./img/azure-frontdoor-simple-active-active/fd1.png)
<br/>

In the backend pool, we add both the function apps, keeping both `priority 1` and `weight 50`. So they will both remain active and continue servicing requests.

![fd 2](./img/azure-frontdoor-simple-active-active/fd2.png)
<br/>

We do a simple pattern match `/*` so all requests are directed to the only backend pool we have.

![fd 3](./img/azure-frontdoor-simple-active-active/fd3.png)
<br/>

## Testing

We can use a small PowerShell script that keeps posting requests to our front door URL.

```
$requestBody = @'
{
    "name": "DP"
}
'@

do {
    $response = Invoke-WebRequest -Uri https://fdtst.azurefd.net/api/HttpTrigger1 -Method POST -Body $requestBody
    Write-Host $response.Content
} while ($true)

$response = Invoke-WebRequest -Uri https://fdtst.azurefd.net/api/HttpTrigger1 -Method POST -Body $requestBody
Write-Host $response.Content
```

When we first start running the script, we see it keeps getting a response from the UK south, mainly because I am closest to that data centre.
<br/>

![script-log1](./img/azure-frontdoor-simple-active-active/script-log1.png)
<br/>

Then we go ahead and stop the UK south function app to simulate an outage from the region.
![stop-uks](./img/azure-frontdoor-simple-active-active/stop-uks.png)
<br/>

That immediately results in failing requests and this happens until the front door realizes that the backend pool is no longer available.
<br/>

![script-log2](./img/azure-frontdoor-simple-active-active/script-log2.png)
<br/>

The azure front door keeps trying UK South, while now serving requests via UK West.
<br/>

![script-log3](./img/azure-frontdoor-simple-active-active/script-log3.png)
<br/>

And finally, once Azure front door establishes that UK South is unhealthy, it sticks to UK West.
<br/>

![script-log4](./img/azure-frontdoor-simple-active-active/script-log4.png)
<br/>

# Conclusion

This was a simple setup to test how to implement an active-active configuration. This can be done in a far better way with an understanding of Azure SLAs to ensure we get a high availability guarantee.
