<template>
  <div class="q-pa-md" id="compare-chart-container">
    <div class="filter-model">{{ filterOptionModel }}</div>
    <div class="spinner" v-if="!loaded">
      <q-spinner-puff color="primary" size="4em" />
    </div>
    <div class="spinner" v-if="!chartLoaded.one && !chartLoaded.two">
      <q-spinner-puff color="primary" size="4em" />
    </div>
    <div class="bar-chart-container" v-if="loaded">
      <BarChart
        v-if="filterOptionModel == 'Win - Lose'"
        style="height: 100%"
        :labels="labelsWL"
        :dataset1="dataset1WL"
        :dataset2="dataset2WL"
        :showLable="true"
        :showLegend="true"
      />
      <PieChart
        v-if="
          filterOptionModel == 'Goal Shot Ratio' &&
            chartLoaded.one &&
            chartLoaded.two
        "
        style="height: 100%"
        :label1="compareOne.name ? compareOne.name : compareOne.firstname"
        :label2="compareTwo.name ? compareTwo.name : compareTwo.firstname"
        :data1="datasetGoalShotRatio[0]"
        :data2="datasetGoalShotRatio[1]"
        :dataSuffix="'%'"
      />
      <RadarChart
        v-if="
          filterOptionModel == 'Match Average' &&
            chartLoaded.one &&
            chartLoaded.two
        "
        style="height: 100%"
        :label1="compareOne.name ? compareOne.name : compareOne.firstname"
        :label2="compareTwo.name ? compareTwo.name : compareTwo.firstname"
        :dataset1="matchAverage[0]"
        :dataset2="matchAverage[1]"
        :labels="['Shot', 'Target Shot', 'Tackle', 'Foul', 'Corner']"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AreaChart from "../Charts/AreaChart";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import RadarChart from "../Charts/RadarChart";

import Utils from "../../boot/utils";

export default {
  name: "CompareChart",
  components: {
    AreaChart,
    BarChart,
    PieChart,
    RadarChart
  },
  props: {
    loaded: { type: Boolean, default: false }
  },
  data() {
    return {
      labelsWL: [],
      dataset1WL: [],
      dataset2WL: [],
      datasetGoalShotRatio: [],
      matchAverage: [],
      oldValCompareOne: "",
      oldValCompareTwo: "",
      chartLoaded: { one: false, two: false }
    };
  },
  mounted() {},
  computed: {
    ...mapGetters("filter", ["searchModeFilter"]),
    ...mapGetters("compare", [
      "filterOptionModel",
      "compareOne",
      "compareTwo",
      "compareThree",
      "compareFour",
      "searchModeCompare"
    ])
  },
  watch: {
    // Watch "loaded" prop from Compare page
    loaded(val) {
      if (val) {
        if (this.filterOptionModel == "Win - Lose") {
          this.compareOneWL(this.compareOne);
          this.compareTwoWL(this.compareTwo);
        } else if (this.filterOptionModel == "Goal Shot Ratio") {
          if (this.searchModeCompare == "team") {
            this.compareGoalShotRatio(this.compareOne.name, 0);
            this.compareGoalShotRatio(this.compareTwo.name, 1);
          } else if (this.searchModeCompare == "player") {
            this.compareGoalShotRatio(this.compareOne.email, 0);
            this.compareGoalShotRatio(this.compareTwo.email, 1);
          }
        } else if (this.filterOptionModel == "Match Average") {
          if (this.searchModeCompare == "team") {
            this.compareMatchAverage(this.compareOne.name, 0);
            this.compareMatchAverage(this.compareTwo.name, 1);
          } else if (this.searchModeCompare == "player") {
            this.compareMatchAverage(this.compareOne.email, 0);
            this.compareMatchAverage(this.compareTwo.email, 1);
          }
        }
      }
    },
    // Empty all dataset array if search mode is changed: "Team", "Player"
    searchModeCompare(val) {
      this.emptyEverything();
    },
    // Watch the filter options: "Win - Lose", "Goal Shot Ratio"....
    filterOptionModel(val) {
      this.chartLoaded.one = false;
      this.chartLoaded.two = false;
      this.emptyEverything();
      if (val == "Win - Lose") {
        if (this.compareOne.name) {
          this.compareOneWL(this.compareOne, this.oldValCompareOne);
        }
        if (this.compareTwo.name) {
          this.compareTwoWL(this.compareTwo, this.oldValCompareTwo);
        }
      } else if (val == "Goal Shot Ratio") {
        if (this.searchModeCompare == "team") {
          this.compareGoalShotRatio(this.compareOne.name, 0);
          this.compareGoalShotRatio(this.compareTwo.name, 1);
        } else if (this.searchModeCompare == "player") {
          this.compareGoalShotRatio(this.compareOne.email, 0);
          this.compareGoalShotRatio(this.compareTwo.email, 1);
        }
      } else if (val == "Match Average") {
        if (this.searchModeCompare == "team") {
          this.compareMatchAverage(this.compareOne.name, 0);
          this.compareMatchAverage(this.compareTwo.name, 1);
        } else if (this.searchModeCompare == "player") {
          this.compareMatchAverage(this.compareOne.email, 0);
          this.compareMatchAverage(this.compareTwo.email, 1);
        }
      }
    },
    // Watch the value from dropdown menu for team/player 1
    compareOne(newVal, oldVal) {
      this.chartLoaded.one = false;
      if (oldVal) this.oldValCompareOne = oldVal;
      if (this.filterOptionModel == "Win - Lose") {
        this.compareOneWL(newVal, oldVal);
      } else if (this.filterOptionModel == "Goal Shot Ratio") {
        if (this.searchModeCompare == "team")
          this.compareGoalShotRatio(this.compareOne.name, 0);
        else if (this.searchModeCompare == "player")
          this.compareGoalShotRatio(this.compareOne.email, 0);
      } else if (this.filterOptionModel == "Match Average") {
        if (this.searchModeCompare == "team")
          this.compareMatchAverage(this.compareOne.name, 0);
        else if (this.searchModeCompare == "player")
          this.compareMatchAverage(this.compareOne.email, 0);
      }
    },
    // Watch the value from dropdown menu for team/player 2
    compareTwo(newVal, oldVal) {
      this.chartLoaded.two = false;
      if (oldVal) this.oldValCompareTwo = oldVal;
      if (this.filterOptionModel == "Win - Lose") {
        this.compareTwoWL(newVal, oldVal);
      } else if (this.filterOptionModel == "Goal Shot Ratio") {
        if (this.searchModeCompare == "team")
          this.compareGoalShotRatio(this.compareTwo.name, 1);
        else if (this.searchModeCompare == "player")
          this.compareGoalShotRatio(this.compareTwo.email, 1);
      } else if (this.filterOptionModel == "Match Average") {
        if (this.searchModeCompare == "team")
          this.compareMatchAverage(this.compareTwo.name, 1);
        else if (this.searchModeCompare == "player")
          this.compareMatchAverage(this.compareTwo.email, 1);
      }
    }
  },
  methods: {
    ...mapActions("dashboard", ["updatePersonalMatches"]),
    ...mapActions("filter", ["updateSearchModeFilter"]),
    ...mapActions("compare", ["getMatchesByTeam"]),
    // Edit chart data for team/player 1
    compareOneWL(newVal, oldVal) {
      if (newVal.name) {
        if (!oldVal) {
          this.labelsWL.splice(0, 0, this.compareOne.name);
          this.dataset1WL.splice(0, 0, this.isTeam("win", 1));
          this.dataset2WL.splice(0, 0, this.isTeam("lose", 1));
        } else {
          this.labelsWL.splice(0, 1, this.compareOne.name);
          this.dataset1WL.splice(0, 1, this.isTeam("win", 1));
          this.dataset2WL.splice(0, 1, this.isTeam("lose", 1));
        }
      } else {
        this.labelsWL.splice(0, 1, this.compareOne.name);
        this.dataset1WL.splice(0, 1, 0);
        this.dataset2WL.splice(0, 1, 0);
      }
      this.chartLoaded.one = true;
    },
    // Edit chart data for team/player 2
    compareTwoWL(newVal, oldVal) {
      if (newVal.name) {
        if (!oldVal) {
          this.labelsWL.splice(1, 0, this.compareTwo.name);
          this.dataset1WL.splice(1, 0, this.isTeam("win", 2));
          this.dataset2WL.splice(1, 0, this.isTeam("lose", 2));
        } else {
          this.labelsWL.splice(1, 1, this.compareTwo.name);
          this.dataset1WL.splice(1, 1, this.isTeam("win", 2));
          this.dataset2WL.splice(1, 1, this.isTeam("lose", 2));
        }
      } else {
        this.labelsWL.splice(1, 1, this.compareTwo.name);
        this.dataset1WL.splice(1, 1, 0);
        this.dataset2WL.splice(1, 1, 0);
      }
      this.chartLoaded.two = true;
    },
    // Calculate goal shot ratio
    async compareGoalShotRatio(name, compareNr) {
      const match = await this.getMatches(name);

      this.datasetGoalShotRatio[compareNr] = Utils.countAverage(
        match,
        "goalShotRatio",
        5
      );

      this.setLoaded(compareNr);
    },
    // Calculate match average
    async compareMatchAverage(name, compareNr) {
      const match = await this.getMatches(name);

      const shots = Utils.countAverage(match, "shots", 2);
      const targetShots = Utils.countAverage(match, "targetShots", 2);
      const tackles = Utils.countAverage(match, "tackles", 2);
      const fouls = Utils.countAverage(match, "fouls", 2);
      const corners = Utils.countAverage(match, "corners", 2);

      // Convert all average number to a scale from 0 to 10
      this.matchAverage[compareNr] = [
        Utils.convertScale(shots, 10),
        Utils.convertScale(targetShots, 20),
        Utils.convertScale(tackles, 20),
        Utils.convertScale(fouls, 5),
        Utils.convertScale(corners, 5)
      ];

      this.setLoaded(compareNr);
    },
    async getMatches(name) {
      if (this.searchModeCompare == "team")
        return await this.getMatchesByTeam(name);
      else if (this.searchModeCompare == "player")
        return await this.updatePersonalMatches(name);
    },
    setLoaded(compareNr) {
      if (compareNr == 0) this.chartLoaded.one = true;
      else if (compareNr == 1) this.chartLoaded.two = true;
    },
    emptyEverything() {
      this.labelsWL = [];
      this.dataset1WL = [];
      this.dataset2WL = [];
      this.datasetGoalShotRatio = [];
      this.detailMatch = [];
    },
    isTeam(type, nr) {
      if (this.searchModeCompare == "team") {
        if (type == "win") return this.compareNr(nr).totalWins;
        else if (type == "lose") return this.compareNr(nr).totalLoses;
      } else if (this.searchModeCompare == "player") {
        const latestWL = this.compareNr(nr).winlose[
          this.compareNr(nr).winlose.length - 1
        ];
        if (type == "win") return latestWL.wins;
        else if (type == "lose") return latestWL.loses;
      }
    },
    compareNr(nr) {
      if (nr == 1) return this.compareOne;
      else if (nr == 2) return this.compareTwo;
      else if (nr == 3) return this.compareThree;
      else if (nr == 4) return this.compareFour;
    }
  }
};
</script>

<style lang="scss" scoped>
#compare-chart-container {
  background-color: $accent;
  width: 100%;
  height: 75vh;
}

.bar-chart-container {
  height: 95% !important;
  position: relative;
}

.filter-model {
  font-size: 1.6em;
  text-align: center;
}
</style>
