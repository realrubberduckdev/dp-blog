---
layout: post
title: Azure container app - Kestrel - Http 431
image: img/ca-431-cors/banner.jpg
author: Dushyant
date: 2023-05-27T23:30:00.000Z
tags: ["Kestrel", "All"]
draft: false
---
# Introduction
This post is about an error over which I spent hours trying to get anywhere until my colleague [Sebastian Wiejas](https://www.linkedin.com/in/sebastian-wiejas-35a4771b2/) spotted the issue and suggested the solution.

# Overall scenario

We have a dotnet api deployed as a docker image which is hosted on [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) instance. But whenever we would try to hit an endpoint, from the UI app (which is hosted as a separate) app, we will get the following error

```
Request URL: https://testapi.containerapp.io/api/v1/endpoint1
Request Method: OPTIONS
Status Code: 431 
Remote Address: 25.86.295.132:443
Referrer Policy: strict-origin-when-cross-origin
```

Further investigating into Http 431 status code, it says [431 Request Header Fields Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431), which implies we are sending too many headers or something is limiting our allowed header count.

# The solution or maybe the workaround
Given it is a dotnet app and we know from the deployment image that it is using [kestrel web server](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-7.0), so we investigated further into Kestrel settings.

One of the settings that stood out was [KestrelServerLimits.MaxRequestHeaderCount Property](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.server.kestrel.core.kestrelserverlimits.maxrequestheadercount?view=aspnetcore-7.0). Although it defaults to 100, in our case, as it turns out it was set to a low number (I think 10) in the app's `appsettings.json`. So the way we got the app to work is to allow more headers by setting the `MaxRequestHeaderCount` property in `appsettings.json`

```
{
  "Kestrel": {
    "Endpoints": {
      "Https": {
        "Url": "https://*:443",
        "Certificate": {
        }
      },
      "Http": {
        "Url": "http://*:80"
      }
    },
    "Limits": {
      "MaxRequestHeaderCount": 50 // Default is 100
    }
  }
}
```

# Conclusion
Hope this was useful and saved you some time. And again many thanks to Sebastian for sharing these details. Overall, the app being deployed as a container on Azure container app doesn't have anything to do with the issue. It was more the server settings which broke [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requirements.
Please do share your learnings. If you have any thoughts or comments please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.