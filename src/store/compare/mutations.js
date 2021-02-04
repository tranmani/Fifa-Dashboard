import { LocalStorage } from "quasar";

export function updateCompareOne(state, payload) {
  LocalStorage.set("compareOne", payload);
  state.compareOne = payload;
}
export function updateCompareTwo(state, payload) {
  LocalStorage.set("compareTwo", payload);
  state.compareTwo = payload;
}
export function updateCompareThree(state, payload) {
  LocalStorage.set("compareThree", payload);
  state.compareThree = payload;
}
export function updateCompareFour(state, payload) {
  LocalStorage.set("compareFour", payload);
  state.compareFour = payload;
}
export function resetCompare(state, payload) {
  if (payload == 1) {
    LocalStorage.remove("compareOne");
    state.compareOne = {
      picture: "https://img.icons8.com/windows/344/1.png",
      name: "",
      inactive: false
    };
  } else if (payload == 2) {
    LocalStorage.remove("compareTwo");
    state.compareTwo = {
      picture: "https://img.icons8.com/windows/344/2.png",
      name: "",
      inactive: false
    };
  } else if (payload == 3) {
    LocalStorage.remove("compareThree");
    state.compareThree = {
      picture: "https://img.icons8.com/windows/344/3.png",
      name: "",
      inactive: false
    };
  } else if (payload == 4) {
    LocalStorage.remove("compareFour");
    state.compareFour = {
      picture: "https://img.icons8.com/windows/344/4.png",
      name: "",
      inactive: false
    };
  } else if (!payload) {
    LocalStorage.remove("compareOne");
    state.compareOne = {
      picture: "https://img.icons8.com/windows/344/1.png",
      name: "",
      inactive: false
    };
    LocalStorage.remove("compareTwo");
    state.compareTwo = {
      picture: "https://img.icons8.com/windows/344/2.png",
      name: "",
      inactive: false
    };
    LocalStorage.remove("compareThree");
    state.compareThree = {
      picture: "https://img.icons8.com/windows/344/3.png",
      name: "",
      inactive: false
    };
    LocalStorage.remove("compareFour");
    state.compareFour = {
      picture: "https://img.icons8.com/windows/344/4.png",
      name: "",
      inactive: false
    };
  }
}
export function updateFilterOptionModel(state, payload) {
  LocalStorage.set("filterOptionModel", payload);
  state.filterOptionModel = payload;
}
export function updateFilterOptions(state, payload) {
  state.filterOptions = payload;
}
export function updateSearchModeCompare(state, payload) {
  LocalStorage.set("searchModeCompare", payload);
  if (payload == "team") state.searchModeCompare = "team";
  else if (payload == "player") state.searchModeCompare = "player";
  else state.searchModeCompare = "team";
}
