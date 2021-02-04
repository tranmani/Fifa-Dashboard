export function tabModel(state) {
  return state.tabModel;
}
export function dashboardExpand(state) {
  return state.dashboardExpand;
}
export function allDates(state) {
  return state.winLoseHistory.map(x => x.date);
}
export function allWins(state) {
  return state.winLoseHistory.map(x => x.wins);
}
export function allLoses(state) {
  return state.winLoseHistory.map(x => x.loses);
}
export function winLoseHistory(state) {
  return state.winLoseHistory;
}
export function matchWinNeedMoreData(state) {
  return state.matchWinNeedMoreData;
}
export function personalMatches(state) {
  return state.personalMatches;
}
export function dashboardLoaded(state) {
  return state.dashboardLoaded;
}
export function matches(state) {
  return state.matches;
}
export function currentMatchDetail(state) {
  return state.currentMatchDetail;
}
export function sortMatchDetail(state) {
  return state.sortMatchDetail;
}
export function personalMatchesDetail(state) {
  return state.personalMatchesDetail;
}
