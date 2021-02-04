export default function() {
  return {
    sortOptionDashboard: "Name Ascending",
    tabModel: "match",
    dashboardExpand: "",
    winLoseHistory: [],
    matchWinNeedMoreData: true,
    personalMatches: [],
    personalMatchesDetail: [],
    currentMatchDetail: { _id: "" },
    sortMatchDetail: "Default",
    dashboardLoaded: { matches: false, matchesDetail: false },
    matches: []
  };
}
