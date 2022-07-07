import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `A food blog`,
    name: `Food Blog`,
    description: `This is a blog about food`,
    siteUrl: `https://myfoodblog.com`,
    siteSlogan: `Welcome to the food blog, I know you are already hungry`,
    siteLinks: [
      {
        name: "privacy",
        url: "/privacy-policy",
        group: "site",
        internal: true,
      },
      {
        name: "about",
        url: "/about",
        group: "site,home",
        internal: true,
      },
    ],
    // "siteCookieConsent" and "siteSubscription"'s properties have default values, leave them as empty strings to allow using the defaults
    // Override the defaults by adding your own inputs
    siteCookieConsent: {
      title: '',
      description: '',
      // For siteCookieConsent, the theme will automatically add "privacy" and "terms" like to cookie prompt if the `siteLinks` contains any matched items
      readMore: '',
    },
    siteSubscription: {
      title: '',
      description: '',
    },
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `@pitayan/gatsby-theme-pitayan`,
      options: {
        siteAssets: "src/assets",
        postsPerPage: 10
      }
    }
  ],
}

export default config
