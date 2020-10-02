module.exports = {
  client: {
    service: {
      name: 'fifa-dashboard',
      // URL to the GraphQL API
      url: 'https://fifa-dashboard-api.herokuapp.com/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}