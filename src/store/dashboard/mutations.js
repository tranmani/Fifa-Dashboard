export function updateTabModel(state, payload) {
  state.tabModel = payload;
}
export function updateDashboardExpand(state, payload) {
  if (payload == "match") state.dashboardExpand = "match";
  else if (payload == "personal") state.dashboardExpand = "personal";
  else state.dashboardExpand = "";
}
export function updateWinLoseHistory(state, payload) {
  state.winLoseHistory.push(payload);
}
export function emptyChart(state, payload) {
  state.allDates = [];
  state.allWins = [];
  state.allLoses = [];
  state.winLoseHistory = [];
}
export function updateMatchWinNeedMoreData(state, payload) {
  if (payload) state.matchWinNeedMoreData = true;
  else state.matchWinNeedMoreData = false;
}
export function updatePersonalMatches(state, payload) {
  state.personalMatches = payload;
}
export function updatePersonalMatchesDetail(state, payload) {
  state.personalMatchesDetail = payload;
}
export function updateCurrentMatchDetail(state, payload) {
  state.currentMatchDetail = state.personalMatchesDetail.filter(
    match => match._id == payload
  )[0];
  if (state.personalMatchesDetail.length == 0)
    state.currentMatchDetail = { _id: "" };
}
export function emptyPersonalMatchesDetail(state) {
  state.personalMatchesDetail = [];
}
export function updateFilterMatchDetail(state, payload) {
  if (payload == "Default") {
    return;
  } else if (payload == "Win") {
    state.personalMatchesDetail = state.personalMatchesDetail.filter(match => {
      return match.isWin == true;
    });
  } else if (payload == "Lose") {
    state.personalMatchesDetail = state.personalMatchesDetail.filter(match => {
      return match.isWin == false;
    });
  }
}
export function updateSortMatchDetail(state, payload) {
  if (payload == "Default") {
    return;
  } else if (payload == "Most Goals") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.goals - b.goals
    );
  } else if (payload == "Most Shots") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.shots - b.shots
    );
  } else if (payload == "Most Shots On Target") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.targetShots - b.targetShots
    );
  } else if (payload == "Most Possession %") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.possession - b.possession
    );
  } else if (payload == "Most Tackles") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.tackles - b.tackles
    );
  } else if (payload == "Most Fouls") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.fouls - b.fouls
    );
  } else if (payload == "Most Corners") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.corners - b.corners
    );
  } else if (payload == "Most Shot Accuracy %") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.shotAcc - b.shotAcc
    );
  } else if (payload == "Most Pass Accuracy %") {
    state.personalMatchesDetail = state.personalMatchesDetail.sort(
      (a, b) => a.passAcc - b.passAcc
    );
  }
}
export function emptyMatchWinNeedMoreData(state) {
  state.personalMatches = [];
}
export function updateDashboardLoaded(state, payload) {
  Object.assign(state.dashboardLoaded, payload);
}
export function updateMatches(state, payload) {
  state.matches = payload;
}
