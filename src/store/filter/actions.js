import { apolloProvider } from "../../boot/apollo";
import gql from "graphql-tag";
import Utils from "../../boot/utils";

const gqlClient = apolloProvider.defaultClient;

export function updateSearchModeFilter({ commit }, payload) {
  commit("updateSearchModeFilter", payload);
}
export function updateSearchQuery({ commit }, payload) {
  commit("updateSearchQuery", payload);
}
export function emptySearchQuery({ commit }) {
  commit("emptySearchQuery");
}
export function updateSortOption({ commit }, payload) {
  commit("updateSortOption", payload);
}
export function updateGridView({ commit }, payload) {
  commit("updateGridView", payload);
}
export function updateCurrentTeam({ commit }, payload) {
  commit("updateCurrentTeam", payload);
}
export function updateCurrentPlayer({ commit }, payload) {
  commit("updateCurrentPlayer", payload);
}
export function emptyCurrentPlayer({ commit }) {
  commit("emptyCurrentPlayer");
}
export function updateFilterNumberModel({ commit }, payload) {
  commit("updateFilterNumberModel", payload);
}
export function updateFilterOption({ commit }, payload) {
  commit("updateFilterOption", payload);
}
export function updateSearchResults({ commit }, payload) {
  commit("updateSearchResults", payload);
}
export function addInactiveToSearchResults({ commit }, payload) {
  commit("addInactiveToSearchResults", payload);
}
export function removeInactiveFromSearchResults({ commit }, payload) {
  commit("removeInactiveFromSearchResults", payload);
}
export function updateScrollPosition({ commit }, payload) {
  commit("updateScrollPosition", payload);
}
export function getClubs({ commit, state }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getClubsList($query: String!) {
          getClubs(query: $query) {
            id
            name
            coachEmail
            coachFirstname
            coachLastname
            picture
            players {
              firstname
              lastname
              winlose {
                wins
                loses
                date
              }
              email
              picture
            }
          }
        }
      `,
      variables: {
        query: payload
      }
    })
    .then(data => {
      commit("updateSearchResults", data.data.getClubs);
      commit("updateSearchResults", Utils.totalWinLose(state.searchResults));
      commit("community/updatePageLoaded", { clubs: true }, { root: true });
    });
}
export function getPlayers({ commit }, payload) {
  commit("community/updatePageLoaded", { players: false }, { root: true });
  return gqlClient
    .query({
      query: gql`
        query getPlayersList($query: String!, $club: String!) {
          getPlayers(query: $query, club: $club) {
            id
            email
            firstname
            lastname
            winlose {
              wins
              loses
              date
            }
            role
            coach
            club
            picture
          }
        }
      `,
      variables: payload
    })
    .then(data => {
      commit("updateSearchResults", data.data.getPlayers);
      commit("community/updatePageLoaded", { players: true }, { root: true });
    });
}
export function getPlayerByEmail({ commit }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getPlayerByEmailList($email: String!) {
          getPlayerByEmail(email: $email) {
            id
            email
            firstname
            lastname
            winlose {
              wins
              loses
              date
            }
            verified
            role
            coach
            club
            picture
          }
        }
      `,
      variables: {
        email: payload
      }
    })
    .then(data => {
      commit("updateCurrentPlayer", data.data.getPlayerByEmail);
    });
}
