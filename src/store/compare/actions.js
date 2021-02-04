import { apolloProvider } from "../../boot/apollo";
import gql from "graphql-tag";

const gqlClient = apolloProvider.defaultClient;

export function updateCompareOne({ commit }, payload) {
  commit("updateCompareOne", payload);
}
export function updateCompareTwo({ commit }, payload) {
  commit("updateCompareTwo", payload);
}
export function updateCompareThree({ commit }, payload) {
  commit("updateCompareThree", payload);
}
export function updateCompareFour({ commit }, payload) {
  commit("updateCompareFour", payload);
}
export function resetCompare({ commit }, payload) {
  commit("resetCompare", payload);
}
export function updateFilterOptionModel({ commit }, payload) {
  commit("updateFilterOptionModel", payload);
}
export function updateFilterOptions({ commit }, payload) {
  commit("updateFilterOptions", payload);
}
export function updateSearchModeCompare({ commit }, payload) {
  commit("updateSearchModeCompare", payload);
}
export function getMatchesByTeam({ commit }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getMatchesByClubList($team: String) {
          getMatchesByClub(team: $team) {
            _id
            player
            teamName
            teamNameOpp
            gameDate
            isWin
            goals
            goalsOpp
            pens
            pensOpp
            shots
            shotsOpp
            targetShots
            targetShotsOpp
            possession
            possessionOpp
            tackles
            tacklesOpp
            fouls
            foulsOpp
            corners
            cornersOpp
            shotAcc
            shotAccOpp
            passAcc
            passAccOpp
            goalShotRatio
            goalShotRatioOpp
            WLNumber
            startTime
            endTime
            dayPart
            restPeriod
            gameNumberWL
            gameNumberTotal
            gameSeq
            loseStreak
            winStreak
            maxRest
            restSeq
            winCounterWL
            WLWins
            WLScore
          }
        }
      `,
      variables: {
        team: payload
      },
      fetchPolicy: "network-only"
    })
    .then(data => {
      return data.data.getMatchesByClub;
    });
}
