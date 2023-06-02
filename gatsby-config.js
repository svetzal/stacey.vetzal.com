module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `Stacey on Software`,
    author: `Stacey Vetzal`,
    description: `Stacey Vetzal's aggregated writing blog`,
    siteUrl: `https://stacey.vetzal.com`,
    social: [
      {
        name: `mastodon`,
        url: `https://hachyderm.io/@svetzal`,
      },
      {
        name: `github`,
        url: `https://github.com/svetzal`,
      },
      {
        name: `linkedin`,
        url: `https://linkedin.com/in/svetzal`,
      },
    ],
  },
}
