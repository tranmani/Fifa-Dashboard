import { LocalStorage } from "quasar";

export function updateSearchModeFilter(state, payload) {
  LocalStorage.set("searchModeFilter", payload);
  if (payload == "team") state.searchModeFilter = "team";
  else if (payload == "player") state.searchModeFilter = "player";
  else state.searchModeFilter = "team";
}
export function updateSearchQuery(state, payload) {
  if (!payload) state.searchQuery = "";
  else state.searchQuery = payload;
}
export function emptySearchQuery(state) {
  state.searchQuery = "";
}
export function updateSortOption(state, payload) {
  state.sortOption = payload;
}
export function updateGridView(state, payload) {
  if (payload == "list") state.gridView = "list";
  else if (payload == "grid") state.gridView = "grid";
  else state.gridView = "list";
}
export function updateCurrentTeam(state, payload) {
  state.currentTeam = payload;
}
export function updateCurrentPlayer(state, payload) {
  state.currentPlayer = payload;
}
export function updateFilterNumberModel(state, payload) {
  if (!payload) state.filterNumberModel = 0;
  else state.filterNumberModel = payload;
}
export function updateFilterOption(state, payload) {
  state.filterOption = payload;
}
export function updateSearchResults(state, payload) {
  if (payload.some(e => e.firstname)) {
    state.searchResults = payload.map(e => ({
      ...e,
      name: e.firstname + " " + e.lastname,
      inactive: false
    }));
  } else state.searchResults = payload;
}
export function addInactiveToSearchResults(state, payload) {
  const index = state.searchResults.findIndex(e => e.name == payload);
  state.searchResults[index].inactive = true;
}
export function removeInactiveFromSearchResults(state, payload) {
  const index = state.searchResults.findIndex(e => e.name == payload);
  state.searchResults[index].inactive = false;
}
export function updateScrollPosition(state, payload) {
  const scrollPosition = state.scrollPosition;
  if (payload.team)
    LocalStorage.set("scrollPosition", {
      player: scrollPosition.player,
      team: payload.team
    });
  else if (payload.player)
    LocalStorage.set("scrollPosition", {
      player: payload.player,
      team: scrollPosition.team
    });
  Object.assign(state.scrollPosition, payload);
}
export function emptyCurrentPlayer(state) {
  state.currentPlayer = {
    email: "",
    role: "",
    firstname: "",
    lastname: "",
    bio: "",
    note: "",
    coach: "",
    club: "",
    verified: "",
    matchWins: 0,
    matchLoses: 0,
    picture: ""
  };
}
