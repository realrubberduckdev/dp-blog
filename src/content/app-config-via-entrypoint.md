---
layout: post
title: Pass app configuration via docker entrypoint
image: img/app-config-via-entrypoint/banner.jpg
author: Dushyant
date: 2023-07-09T00:00:00.000Z
tags: ["Docker", "All"]
draft: false
---
# Introduction
There a [nice post](https://dantehranian.wordpress.com/2015/03/25/how-should-i-get-application-configuration-into-my-docker-containers/) on the many available ways of passing in application configuration into a docker container. Here is another one, which is similar to the ones listed in the post but still possibly stands out as a different technique. 

# App config via entrypoint
The idea is that we pass in environment variables to a script that runs as the container [entrypoint](https://docs.docker.com/engine/reference/builder/#entrypoint). This `entrypoint` script generates a settings json file for the application to use as its configuration.

Docker file with nginx base (can be any other base, but this example is nginx specific)
```
FROM nginx:1.23.4-alpine-slim
COPY ./ /src/app/
WORKDIR /src/app
RUN chmod +x settings.sh
ENTRYPOINT ["sh","/src/app/settings.sh"]
```

The `settings.sh`
```
#!/bin/sh
# expecting these variables are set via envronment
echo "{ \"SETTING1\": \"$SETTING1\", \"SETTING2\": \"$SETTING2\" }" > settings.json

# display file to screen for verification
cat settings.json

echo "running nginx command"
set -e
exec nginx -g "daemon off;"
echo "finished running nginx command"
```

The `exec nginx -g "daemon off;"` is the crucial bit. As we are providing an entrypoint, the entrypoint of base image won't run. So we need to do what we expect out of the base.

Docker build, say we call this image `dockerpoc`
```
docker build -t dockerpoc:1.0 --no-cache .
```

Finally we pass in the required values via environment variables during docker run
```
docker run -e SETTING1='setting1-value' -e SETTING2='setting2-value' -it dockerpoc:1.0 
```

This creates the configuration for the application in a json format at docker container runtime.

# Conclusion
Hope this was useful and saves you some time. Please do share your learnings. If you have any thoughts or comments, please do get in touch with me on Twitter [@rubberduckdev](https://twitter.com/rubberduckdev). Or use the Disqus plugin below.

### Credits
Banner by [Rubaitul Azad](https://unsplash.com/@rubaitulazad)