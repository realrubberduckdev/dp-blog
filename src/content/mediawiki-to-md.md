---
layout: post
title: Convert MediaWiki to Markdown wiki
image: img/mediawiki-to-md/mediawiki-to-md-splash.png
author: Dushyant
date: 2020-04-18T19:00:00.000Z
tags: ["Wiki", "All"]
draft: false
---
# Introduction
## MediaWiki and MD based Wikis
[MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) is a popular wiki. It powers Wikipedia as well as used by thousands of other companies and organizations. Although it is quite powerful, extensible, customizable and reliable, the markdown based wikis are equally useful, if not more. The frequent updates and [improvements of Azure DevOps wiki](https://devblogs.microsoft.com/devops/category/wiki/) is making it a strong contender. The major difference between them will be that ADOS wiki is MD based and MediaWiki is not. This is when we will need to convert MediaWiki articles to MD files.

# Converting MediaWiki to Markdown
## Export MediaWiki Files to XML
As the first step, we will need to export MediaWiki content to a single XML file. There are multiple ways of doing this.

### Option 1: Export content
The simplest one is described at [Wikipedia Help:Export](https://en.wikipedia.org/wiki/Help:Export).
1. MediaWiki -> Special Pages -> 'All Pages'
1. With help from the filter tool at the top of 'All Pages', copy the page names to convert into a text file (one filename per line).
1. MediaWiki -> Special Pages -> 'Export'
1. Paste the list of pages into the Export field. 
1. Check: 'Include only the current revision, not the full history'  
   Note: This convert script will only do the latest version, not revisions. 
1. Uncheck: Include Templates
1. Check: Save as file
1. Click on the 'Export' button.
1. An XML file will be saved locally.

Let's call this exported file `mediawiki_dump.xml`.

### Option 2: Dump backup
[MediaWiki manual](https://www.mediawiki.org/wiki/Manual:dumpBackup.php) shows how to use the `dumpBackup.php` script.

Steps:
1. Log into your mediawiki instance
1. Find the PHP file .../maintenance/dumpBackup.php and your ../LocalSettings.php file. Then try:

```php .../maintenance/dumpBackup.php --conf .../LocalSettings.php --full > mediawiki_dump.xml```

Note we can use parameters --include-files --uploads to ensure the exported XML includes all the images and other files. But in our example, this currently doesn't work.

## Convert exported XML to MD
For conversion, we will need to use a PHP script, use [Pandoc](https://pandoc.org/index.html) and we also need [Composer](https://getcomposer.org/) for the script environment setup. That is quite a lot of dependencies for us to install and this will be operating system specific, so that adds even more variables to the mix. So what do we do?

You guessed it right, and sure enough, we use docker. The docker file below is from [mediawiki-to-markdown/Dockerfile](https://github.com/realrubberduckdev/mediawiki-to-markdown/blob/42e4b1f6c8b32ddbb45b5ddcd088ad9912b20004/Dockerfile)

```
FROM pandoc/latex
WORKDIR /src
COPY composer.* ./

# Install composer, refer: https://github.com/geshan/docker-php-composer-alpine/blob/master/Dockerfile
RUN apk --update add wget \ 
             curl \
             git \
             php7 \
             php7-curl \
             php7-openssl \
             php7-iconv \
             php7-json \
             php7-mbstring \
             php7-phar \
             php7-xml \
             php7-simplexml \
             php7-dom --repository http://nl.alpinelinux.org/alpine/edge/testing/ && rm /var/cache/apk/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer 
# end of install composer

RUN composer install
COPY . .
CMD ["sh"]

```

As you can see, this docker files gets [Pandoc docker image](https://hub.docker.com/r/pandoc/latex), which already has got PHP from dockerhub. So two of our major dependencies are resolved immediately. Followed by composer, which we install using [apk Alpine Linux package management](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management). Finally, after the `RUN composer install` step, the container will be ready for processing XML files.

The steps to do the conversion now are:

1. Copy the `mediawiki_dump.xml` to the same folder as the docker file.
1. Build the image using the following command: `docker build -t MediaWiki2MD .`
1. After building the docker image, we run it with a volume mapped for accessing the output files.
`docker run -v ./output/:/src/output MediaWiki2MD sh -c "php convert.php --filename=mediawiki_dump.xml --output=./output"`
Note: The convert.php file is at [mediawiki-to-markdown/convert.php](https://github.com/realrubberduckdev/mediawiki-to-markdown/blob/4ebf945e68984270c820e8fe6a892e0acfc6875d/convert.php)

This should generate the MD files in the output folder.

## Limitations
As discussed earlier, this process still fails to gather images, pdfs or other uploaded documents. That is something I plan to [SCP](https://en.wikipedia.org/wiki/Secure_copy) directly from MediaWiki server to the MD files location and write a script to edit the MD files references to the files.

# Conclusion
Using docker, we have managed to make the conversion process much easier to manage and reproducible. That takes a big chunk of work out of the process. Although it still needs manual intervention in generating the exported XML and also the final bit of sorting out images and uploaded document links in MD files. If you know of an easier or better way, please do share.

## Github
For full code visit [realrubberduckdev/mediawiki-to-markdown](https://github.com/realrubberduckdev/mediawiki-to-markdown).