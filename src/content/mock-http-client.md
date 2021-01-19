---
layout: post
title: Mocking HttpClient for unit testing
image: img/mock-http-client/banner.png
author: Dushyant
date: 2021-01-19T18:30:00.000Z
tags: ["NUnit", "All"]
draft: false
---
# Introduction
[HttpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-5.0) is an easy way provided by dotnet to send http requests. But the problem is that it doesn't implement an interface we could mock for unit testing.

# How to mock HttpClient
Say we have a function `GetResponse` like below:

```
public async Task<string?> GetResponse(HttpClient httpClient, string requestUri)
{
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(requestUri)
        };

        using var response = await httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        string? responseBody = await response.Content.ReadAsStringAsync();
        return responseBody;
}
```

# Moq for mocking
Let's use [Moq](https://github.com/Moq/moq4/wiki/Quickstart) for mocking. If you notice the method we would like to stub is `SendAsync`, which is a protected method in `HttpClient` class. The way to mock that is:

```
public static HttpClient GetMockedHttpClient(string responseContent)
{
    var handlerMock = new Mock<HttpMessageHandler>();
    var response = new HttpResponseMessage
    {
        StatusCode = HttpStatusCode.OK,
        Content = new StringContent(responseContent),
    };

    handlerMock
        .Protected()
        .Setup<Task<HttpResponseMessage>>(
            "SendAsync",
            ItExpr.IsAny<HttpRequestMessage>(),
            ItExpr.IsAny<CancellationToken>())
        .ReturnsAsync(response);
    var httpClient = new HttpClient(handlerMock.Object);
    return httpClient;
}
```

Notice how the `SendAsync` method has now been stubbed and this can be used in unit tests.

So in a unit test we can call `GetResponse` as follows:
```
var mockedHttpClient = GetMockedHttpClient("{}");
var response = someObject.GetResponse(mockedHttpClient, "some-uri");
```

# Conclusion
Hope this was useful and saves you some time if you are trying this out. If you have any thoughts or comments please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.
