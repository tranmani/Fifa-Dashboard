import { LocalStorage } from "quasar";

let compareOne = {
  picture: "https://fifa-dashboard.s3.amazonaws.com/profile/1.png"
};
let compareTwo = {
  picture: "https://fifa-dashboard.s3.amazonaws.com/profile/2.png"
};
let compareThree = {
  picture: "https://fifa-dashboard.s3.amazonaws.com/profile/3.png"
};
let compareFour = {
  picture: "https://fifa-dashboard.s3.amazonaws.com/profile/4.png"
};
let searchModeCompare = "team";
let filterOptionModel = "Win - Lose";

if (LocalStorage.has("searchModeCompare")) {
  searchModeCompare = LocalStorage.getItem("searchModeCompare");
}
if (LocalStorage.has("filterOptionModel")) {
  filterOptionModel = LocalStorage.getItem("filterOptionModel");
}
if (LocalStorage.has("compareOne")) {
  compareOne = LocalStorage.getItem("compareOne");
}
if (LocalStorage.has("compareTwo")) {
  compareTwo = LocalStorage.getItem("compareTwo");
}
if (LocalStorage.has("compareThree")) {
  compareThree = LocalStorage.getItem("compareThree");
}
if (LocalStorage.has("compareFour")) {
  compareFour = LocalStorage.getItem("compareFour");
}

export default function() {
  return {
    searchModeCompare: searchModeCompare,
    compareOne: compareOne,
    compareTwo: compareTwo,
    compareThree: compareThree,
    compareFour: compareFour,
    filterOptionModel: filterOptionModel,
    filterOptions: ["Win - Lose", "Goal Shot Ratio", "Match Average"]
  };
}
