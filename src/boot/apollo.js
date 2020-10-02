import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch'
import { WebSocketLink } from 'apollo-link-ws';

const createApolloClient = function (isServerSide) {
  const link = new WebSocketLink({
    uri: 'ws://fifa-dashboard-api.herokuapp.com/graphql',
    options: {
      reconnect: true,
      timeout: 30000,
      connectionParams: () => {
        return { headers: getHeaders() };
      },
    }
  });
  const cache = new InMemoryCache()

  if (!isServerSide) {
    const state = window.__APOLLO_STATE__

    if (state) {
      cache.restore(state)
    }
  }

  const apolloClient = new ApolloClient({
    link: link,
    cache,
    connectToDevTools: true,
    ...(isServerSide ? { ssrMode: true } : { ssrForceFetchDelay: 100 })
  })

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    }
  })

  return apolloProvider
}

export default ({ app, Vue, ssrContext }) => {
  const apolloProvider = createApolloClient(!!ssrContext)

  Vue.use(VueApollo)
  app.provide = ({ $apolloProvider: apolloProvider })

  if (ssrContext) {
    ssrContext.rendered = () => {
      ssrContext.apolloState = JSON.stringify(apolloProvider.defaultClient.extract())
    }
  }
}