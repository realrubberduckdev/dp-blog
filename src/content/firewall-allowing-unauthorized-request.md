---
layout: post
title: Why is Azure firewall allowing a request that should be denied?
image: img/firewall-allowing-unauthorized-request/banner.png
author: Dushyant
date: 2023-01-14T16:00:00.000Z
tags: ["Azure", "All"]
draft: false
---
# Introduction
[Azure Firewall](https://learn.microsoft.com/en-us/azure/firewall/overview) is an exciting cloud native network security service and provides a lot of features to make our life easier while thwarting security threats out there. While setting up the firewall policies, one thing we are fairly confident of is that Azure Firewall denies all traffic by default. And this has been documented under [Configure Azure Firewall rules](https://learn.microsoft.com/en-us/azure/firewall/rule-processing).

But things get a bit weird, let's see how.

# Anomaly?

With the assumption that Azure firewall is denying all requests by default, let's setup the following policy

```
{
    "name": "Allow my vm to another vm",
    "ipProtocols": [
        "TCP"
    ],
    "destinationPorts": [
        "6000"
    ],
    "sourceAddresses": [
        "10.250.26.36"
    ],
    "sourceIpGroups": [],
    "ruleType": "NetworkRule",
    "destinationIpGroups": [],
    "destinationAddresses": [
        "10.200.20.30"
    ],
    "destinationFqdns": []
}
```

So here we are saying a certain IP is allowed to connect to another certain IP over port 6000. Which is great.

Now if we run from the vm with IP `10.250.26.36`

```
Test-NetConnectivity -computer 10.200.20.30 -port 6000
```

we expect and get a success. Great!

But then if we run
```
Test-NetConnectivity -computer 10.200.20.30 -port 443
```

we should expect a failure. This is because port 443 is now specificly allowed. But! But! But! the command succeeds. Added to this astonishment is that no logs appear in the firewall logs which show the port 443 request was allowed.

What is going on! (◎_◎;)

- Did the firewall just allow an authorized request?
- What happened to the log?

# The explanation
TCP ping is a unique use case where if there is no allowed rule, the Firewall itself responds to the client's TCP ping request even though the TCP ping doesn't reach the target IP address/FQDN. `Test-NetConnection` does a TCP ping. This is [documented](https://learn.microsoft.com/en-us/azure/firewall/firewall-faq#why-can-a-tcp-ping-and-similar-tools-successfully-connect-to-a-target-fqdn-even-when-no-rule-on-azure-firewall-allows-that-traffic).

Regarding logging, records are logged only when a specific rule match occurs. That is, [Each new connection that matches one of your configured network rules results in a log for the accepted/denied connection.](https://learn.microsoft.com/en-us/azure/firewall/logs-and-metrics). I managed to get some clarifications from MS Support and was informed that this specific match is needed in case of TCP ports 80 and 443. For other ports, the denies will get logged even if there is no specific rule match.

So overall, the firewall is behaving as expected and denying traffic. But it is not logging it as there is no specific rule match.

# Conclusion
One way to get uniform results and gain more confidence will be to have a low priority blanket deny all firewall policy. So, if no allows are matched, a request gets denied and then logged in firewall logs. Although it took me a while to figure this out, was relieved that **no unauthorized requests were being allowed by the firewall**.

Hope this was useful and saved you some time. Please do share your learnings. If you have any thoughts or comments please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.