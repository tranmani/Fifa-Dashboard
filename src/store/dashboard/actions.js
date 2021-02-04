import { apolloProvider } from "../../boot/apollo";
import gql from "graphql-tag";

const gqlClient = apolloProvider.defaultClient;

export function updateTabModel({ commit }, payload) {
  commit("updateTabModel", payload);
}
export function updateDashboardExpand({ commit }, payload) {
  commit("updateDashboardExpand", payload);
}
export function updateWinLoseHistory({ commit }, payload) {
  commit("updateWinLoseHistory", payload);
}
export function emptyChart({ commit }) {
  commit("emptyChart");
}
export function updateMatchWinNeedMoreData({ commit }, payload) {
  commit("updateMatchWinNeedMoreData", payload);
}
export function updateDashboardLoaded({ commit }, payload) {
  commit("updateDashboardLoaded", payload);
}
export function updatePersonalMatches({ commit }, payload) {
  commit("updateDashboardLoaded", { matches: false });
  return gqlClient
    .query({
      query: gql`
        query getMatchesByUserList($email: String) {
          getMatchesByUser(email: $email) {
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
        email: payload
      },
      fetchPolicy: "network-only"
    })
    .then(data => {
      commit("updatePersonalMatches", data.data.getMatchesByUser);
      commit("updateDashboardLoaded", { matches: true });
      return data.data.getMatchesByUser;
    });
}
export function updatePersonalMatchesDetail({ commit }, payload) {
  commit("updateDashboardLoaded", { matchesDetail: false });
  return gqlClient
    .query({
      query: gql`
        query getMatchesList($player: String!, $team: String!) {
          getMatches(player: $player, team: $team) {
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
            teamInfo {
              picture
            }
            teamInfoOpp {
              picture
            }
          }
        }
      `,
      variables: {
        player: payload.player,
        team: payload.team
      },
      fetchPolicy: "network-only"
    })
    .then(data => {
      commit("updatePersonalMatchesDetail", data.data.getMatches);
      commit("updateDashboardLoaded", { matchesDetail: true });
    });
}
export function updateMatches({ commit }) {
  return gqlClient
    .query({
      query: gql`
        query {
          getAllMatch {
            id
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
      fetchPolicy: "network-only"
    })
    .then(data => {
      commit("updateMatches", data.data.getAllMatch);
      return data.data.getAllMatch || null;
    });
}
export function emptyMatchWinNeedMoreData({ commit }) {
  commit("emptyMatchWinNeedMoreData");
}
export function emptyPersonalMatchesDetail({ commit }) {
  commit("emptyPersonalMatchesDetail");
}
export function updateCurrentMatchDetail({ commit }, payload) {
  commit("updateCurrentMatchDetail", payload);
}
export function updateFilterMatchDetail({ commit }, payload) {
  commit("updateFilterMatchDetail", payload);
}
export function updateSortMatchDetail({ commit }, payload) {
  commit("updateSortMatchDetail", payload);
}
