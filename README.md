# rubberduckdev-gatsby-casper

Blog site https://rubberduckdev.com/

This is a static blog generator and starter gatsby repo. A port of [Casper](https://github.com/TryGhost/Casper) v2 a theme from [Ghost](https://ghost.org/) for [GatsbyJS](https://www.gatsbyjs.org/) using [TypeScript](https://www.typescriptlang.org/).

## Local build

```
npm install
gatsby build
gatsby develop
```

## Docker build

```
docker build -t myproject/website .
docker run --rm -p 80:80 myproject/website
# Open your browser at http://localhost
```

## How to edit your site title and description
Edit `gatsby-config.js` section `siteMetadata`

```javascript
 siteMetadata: {
    title: 'My awesome site name',
    description: 'This is a description for my site',
    siteUrl: 'https://mysite.com', // full path to blog - no ending slash
  },
```

## How to adjust pagination
In `gatsby-node.js`, edit the `postsPerPage` constant. The default value is
six posts per page.
