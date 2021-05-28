---
layout: post
title: Create Front Door with Rules Engine
image: img/azure-frontdoor-simple-active-active/banner.jpg
author: Dushyant
date: 2021-05-28T12:00:00.000Z
tags: ['Azure', 'All']
draft: false
---

# Azure Front Door Rules Engine

[Rules engine](https://docs.microsoft.com/en-us/azure/frontdoor/front-door-rules-engine) in an Azure front door allows us to customize how HTTP requests get handled. It is the go-to place to add CORS rules or modify caching configuration based on incoming requests and so on.

# Issue with deploying Azure front door with rules engine

This is where it gets tricky. For now, I use [ARM templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) to deploy the front door (yet to look into Terraform/Pulumi/Bicep if they are any better at it). But this poses few issues

On the very first deployment, I found

```
Status: BadRequest 
Provisioning State: Failed 
Status Message: {"status":"Failed","error":{"code":"BadRequest","message":"A resource reference was invalid: \"Routing rule RoutingRule1 contains an invalid reference to RulesEngine: \"/subscriptions/abcde-ghi-479e-959c-sdhfllk/resourceGroups/rg1/providers/Microsoft.Network/frontdoors/frontdoor1/rulesengines/RulesEngine1\"\"","target":null,"details":null,"additionalInfo":null}} 
```

Then assuming, the rules engine need to be created first, I tried adding `dependson` only to get:

```
Status: BadRequest
Provisioning State: Failed
Status Message: {"status":"Failed","error":{"code":"InvalidResource","message":"The property 'dependsOn' does not exist on type 'Microsoft.Azure.FrontDoor.Models.DeepCreatedResource_1OfFrontdoorRoutingRuleEntityV2'. Make sure to only use property names that are defined by the type.","target":null,"details":null,"additionalInfo":null}}
```

This is because `dependson` is not valid in a routine rule. So now I am out ideas.

On further investigation, turns out, it is a known bug, refer to the two below.
* [Samples to Create Front Door with Rules Engine](https://github.com/MicrosoftDocs/azure-docs/issues/65782)
* [Document if/how a rules engine can be provisioned using an arm template](https://github.com/MicrosoftDocs/azure-docs/issues/61497)

## The suggested workaround

The [suggestion on the issue is](https://github.com/MicrosoftDocs/azure-docs/issues/65782#issuecomment-724416237):
```
Right now, the following workout may work (depending on your setup for automating):

* Create Frontdoor and Rules Engine Config FIRST, without having Front door reference the Rules Engine config
* THEN, make another ARM template call, on the same Frontdoor, but added with the reference to the rules engine.
```

## Same idea, but a different implementation of workaround

I didn't want to have two very similar ARM templates and also maintaining ARM templates can be a pain. So as a post-deployment step, I ran some `az cli`:
```
az network front-door routing-rule update --front-door-name "frontdoor1" `
    --name "RoutingRule1" `
    --resource-group "rg1" `
    --rules-engine "RulesEngine1"
```

So the original ARM template just deploys the rules engine but doesn't reference it from routing rules. The referencing happens in this post-deployment step.

# Conclusion

This was a simpler solution to the issue and worked better for me. Hope it is useful for your deployment. Thoughts and comments welcome.
