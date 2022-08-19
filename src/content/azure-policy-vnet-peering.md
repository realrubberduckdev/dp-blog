---
layout: post
title: VNet peering using Azure Policy
image: img/azure-policy-vnet-peering/banner.png
author: Dushyant
date: 2022-08-19T10:30:00.000Z
tags: ["Azure", "All"]
draft: false
---
# Introduction
Azure policy is a service on Azure which helps us achieve organisation-wide resource governance by creating policies in Azure to govern every existing or future resource deployed. I was investigating if we can use this to reduce workload on our infrastructure deployment and automate connectivity.

The overall idea is that use a policy definition to create virtual networkg peering between hub and spokes.


# Hub-spoke network topology

The [hub-spoke model](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke?tabs=cli) is a general network topology used, mainly if we want a hybrid setup. There will be a hub virtual network acting as the central point of connectivity to on-premises network. Spoke virtual networks are used to isolate workloads in their own virtual networks. Two virtual networks can be connected using something called virtual network peering.

So in this post, we can assume that the hub virtual network already exists. And we have multiple development environment virtual networks being deployed on demand. The hub can be RBAC restrictions regarding if those deployment users and processes have access. This is where azure policy steps in.

# Azure policy

I had to refresh my azure policy memory and the following video helped a lot.

`video: https://youtu.be/eLYfeKLcwec`

# Policy definition

After a few trial and error this is the policy definition that finally worked

```
{
    "mode": "Indexed",
    "policyRule": {
        "if": {
            "field": "type",
            "equals": "Microsoft.Network/virtualNetworks"
        },
        "then": {
            "effect": "deployIfNotExists",
            "details": {
                "type": "Microsoft.Network/virtualNetworks/virtualNetworkPeerings",
                "resourceGroupName": "testrg",
                "roleDefinitionIds": [
                    "/providers/Microsoft.Authorization/roleDefinitions/4d97b98b-1d4f-4787-a291-c67834d212e7"
                ],
                "deployment": {
                    "properties": {
                        "mode": "incremental",
                        "template": {
                            "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json",
                            "contentVersion": "1.0.0.0",
                            "parameters": {
                                "newvnetId": {
                                    "type": "string"
                                },
                                "newvnetName": {
                                    "type": "string"
                                },
                                "hubvnetId": {
                                    "type": "string"
                                },
                                "hubvnetName": {
                                    "type": "string"
                                }
                            },
                            "resources": [
                                {
                                    "type": "Microsoft.Network/virtualNetworks/virtualNetworkPeerings",
                                    "apiVersion": "2020-11-01",
                                    "name": "[concat(parameters('hubvnetName'),'/', concat(parameters('hubvnetName'),'-', parameters('newvnetName')))]",
                                    "properties": {
                                        "peeringState": "Connected",
                                        "remoteVirtualNetwork": {
                                            "id": "[parameters('newvnetId')]"
                                        },
                                        "allowVirtualNetworkAccess": true,
                                        "allowForwardedTraffic": true,
                                        "allowGatewayTransit": false,
                                        "useRemoteGateways": false
                                    }
                                },
                                {
                                    "type": "Microsoft.Network/virtualNetworks/virtualNetworkPeerings",
                                    "apiVersion": "2020-11-01",
                                    "name": "[concat(parameters('newvnetName'),'/', concat(parameters('newvnetName'),'-hub'))]",
                                    "properties": {
                                        "peeringState": "Connected",
                                        "remoteVirtualNetwork": {
                                            "id": "[parameters('hubvnetId')]"
                                        },
                                        "allowVirtualNetworkAccess": true,
                                        "allowForwardedTraffic": true,
                                        "allowGatewayTransit": false,
                                        "useRemoteGateways": false
                                    }
                                }
                            ]
                        },
                        "parameters": {
                            "newvnetId": {
                                "value": "[field('id')]"
                            },
                            "newvnetName": {
                                "value": "[field('name')]"
                            },
                            "hubvnetName": {
                                "value": "hub-vnet"
                            },
                            "hubvnetId": {
                                "value": "/subscriptions/bf97e223-050a-44b3-b142-c8f916b707f2/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/hub-vnet"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

The definition above creates virtual network peering with the hub virtual network for every new virtual network deployed.
The parameters section (I am sure can optimized) automatically gets the name and id of the new virtual network being deployed and the hub details are hardcoded.

## Testing tips
### Patience
Testing policy takes its time to get applied. It is difficult to predict when it has got applied, so I normally had to wait 10-15mins before checking if it has worked. Officially Azure portal will says it can take upto 30mins and yes it can.
### ARM
Test the `deployment` section by deploying outside of policy definition. Some of the errors during deployment can take long to show up.
### Activity log
Check activity log of resource group to spot `deployIfNotExists` and if it has succeeded. It normally should give a useful error message if failed.

# Conclusion
Hope this was useful and saved you some time. Please do share your learnings. If you have any thoughts or comments please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.