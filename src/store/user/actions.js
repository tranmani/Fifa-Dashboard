import { apolloProvider } from "../../boot/apollo";
import gql from "graphql-tag";

const gqlClient = apolloProvider.defaultClient;

export function getLoggedInUserInfo({ commit }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getUserByTokenList($token: String!) {
          getUserByToken(token: $token) {
            email
            firstname
            lastname
            role
            coach
            club
            code
            organization
            position
            players
            picture
            winlose {
              wins
              loses
              date
            }
            chats {
              id
              unread
            }
            channels {
              id
              unread
            }
          }
        }
      `,
      variables: {
        token: payload
      }
    })
    .then(data => {
      commit("updateUser", data.data.getUserByToken);
    });
}
export function updateUser({ commit }, payload) {
  commit("updateUser", payload);
}
export function updateTokenCookie({ commit }, payload) {
  commit("updateTokenCookie", payload);
}
export function updateTokenSession({ commit }, payload) {
  commit("updateTokenSession", payload);
}
export function logout({ commit }) {
  commit("logout");
}
