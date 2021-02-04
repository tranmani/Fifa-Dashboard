import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { store } from "../store";

const local = "ws://localhost:5000/graphql";
const online = "wss://fifa-dashboard-api.herokuapp.com/graphql";

const createApolloClient = function(isServerSide) {
  const link = new WebSocketLink({
    uri: online,
    options: {
      reconnect: true,
      timeout: 40000,
      connectionParams: async () => {
        return {
          token: store.state.user.token
        };
      }
    }
  });

  const cache = new InMemoryCache();

  if (!isServerSide) {
    const state = window.__APOLLO_STATE__;

    if (state) {
      cache.restore(state);
    }
  }

  const apolloClient = new ApolloClient({
    link: link,
    cache,
    connectToDevTools: true,
    ...(isServerSide ? { ssrMode: true } : { ssrForceFetchDelay: 100 })
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  });

  return apolloProvider;
};

const apolloProvider = createApolloClient();
export default ({ app, Vue, store, ssrContext }) => {
  Vue.use(VueApollo);
  app.provide = { $apolloProvider: apolloProvider };

  if (ssrContext) {
    ssrContext.rendered = () => {
      ssrContext.apolloState = JSON.stringify(
        apolloProvider.defaultClient.extract()
      );
    };
  }
  return apolloProvider;
};

export { apolloProvider };
