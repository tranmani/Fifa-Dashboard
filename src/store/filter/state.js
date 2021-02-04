import { LocalStorage } from "quasar";

let scrollPosition = { team: 0, player: 0 };
let searchModeFilter = "team";

if (LocalStorage.has("scrollPosition")) {
  scrollPosition = LocalStorage.getItem("scrollPosition");
}
if (LocalStorage.has("searchModeFilter")) {
  searchModeFilter = LocalStorage.getItem("searchModeFilter");
}

export default function() {
  return {
    searchModeFilter: searchModeFilter,
    searchQuery: "",
    sortOption: "Name Ascending",
    gridView: "grid",
    filterNumberModel: 0,
    filterOption: "Match Win Higher Than",
    currentTeam: {},
    scrollPosition: scrollPosition,
    searchResults: [
      {
        name: "",
        picture: "",
        inactive: false
      }
    ],
    currentPlayer: {
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
    }
  };
}
