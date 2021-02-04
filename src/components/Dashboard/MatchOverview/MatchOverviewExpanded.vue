<template>
  <div class="row q-pt-md">
    <div class="expanded-container blur-bg">
      <div class="row justify-between">
        <!-- First Column -->
        <div class="col-5 q-pa-md">
          <GraphTitle
            :name="'Cumulative Match Win and Lose'"
            :lastUpdate="allDates[allDates.length - 1]"
          />
          <div class="big-chart-container">
            <AreaChart
              v-if="!matchWinNeedMoreData"
              style="height: 100%"
              :labels="allDates"
              :dataset1="allWins"
              :dataset2="allLoses"
              :showLable="true"
              :showLegend="false"
            />
            <div v-if="matchWinNeedMoreData" class="no-match-data">
              <h6>Match history need more data to display</h6>
            </div>
          </div>
        </div>

        <!-- Second Column -->
        <div class="col-3 q-pa-md">
          <div class="column">
            <div class="col-auto">
              <div class="row items-center q-pb-md">
                <!-- Title and dropdown options -->
                <h6 class="text-center">
                  Detailed Information
                </h6>
                <q-space />
                <span>
                  <q-select
                    hide-bottom-space
                    hide-dropdown-icon
                    dense
                    options-dense
                    square
                    outlined
                    bg-color="white"
                    v-model="winLoseModelSelect"
                    :options="allDates"
                /></span>
              </div>

              <!-- Win Lose number -->
              <WinLoseExpanded
                :currentWin="latestWinLose.wins"
                :currentLose="latestWinLose.loses"
                :oldWin="oldWin || latestWinLose.wins"
                :oldLose="oldLose || latestWinLose.loses"
              />
              <p class="q-py-md">
                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. -->
              </p>

              <!-- Chart -->
              <div class="winlose-chart-container">
                <BarChart
                  style="height: 200px"
                  :labels="compareDate"
                  :dataset1="currentAndOldWin"
                  :dataset2="currentAndOldLose"
                  :showLable="false"
                  :showLegend="false"
                />
              </div>
            </div>
            <div class="col-auto"></div>
            <div class="col-auto"></div>
          </div>
        </div>

        <!-- Third Column -->
        <div class="col-3 q-pa-md">
          <GraphTitle :name="'Mockup Chart'" :lastUpdate="today" />
        </div>
      </div>
    </div>
    <div class="go-back-container-lg">
      <q-btn
        dense
        size="xs"
        class="go-back-btn no-border-radius"
        @click="updateDashboardExpand('')"
      >
        <i class="row go-back-text">▼ Go back</i>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GraphTitle from "./GraphTitle";
import AreaChart from "../../Charts/AreaChart";
import RadarChart from "../../Charts/RadarChart";
import PieChart from "../../Charts/PieChart";
import BarChart from "../../Charts/BarChart";
import WinLoseExpanded from "./WinLoseExpanded";

export default {
  name: "MatchOverviewExpanded",
  components: {
    AreaChart,
    BarChart,
    RadarChart,
    PieChart,
    GraphTitle,
    WinLoseExpanded
  },
  props: {
    name: String
  },
  data() {
    return {
      oldWin: 0,
      oldLose: 0,
      currentAndOldWin: [],
      currentAndOldLose: [],
      compareDate: [],
      winLoseModel: ""
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("filter", ["currentTeam", "currentPlayer"]),
    ...mapGetters("dashboard", [
      "tabModel",
      "allDates",
      "allWins",
      "allLoses",
      "winLoseHistory",
      "matchWinNeedMoreData"
    ]),
    today() {
      const today = new Date();
      return (
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear()
      );
    },
    latestWinLose() {
      return this.isPlayer().winlose[this.isPlayer().winlose.length - 1];
    },
    winLoseModelSelect: {
      get() {
        return this.winLoseModel || this.allDates[this.allDates.length - 1];
      },
      set(val) {
        this.winLoseModel = val;
      }
    }
  },
  watch: {
    winLoseModel(val) {
      // Delete old data before add new data in
      if (this.compareDate.length != 1) {
        this.currentAndOldWin.pop();
        this.currentAndOldLose.pop();
        this.compareDate.pop();
      }
      // If compare data from the same day then skip
      if (this.compareDate[0] !== val) {
        // add new data to compare
        const index = this.winLoseHistory.findIndex(e => e.date == val);
        this.oldWin = this.winLoseHistory[index].wins;
        this.oldLose = this.winLoseHistory[index].loses;
        this.currentAndOldWin.push(this.oldWin);
        this.currentAndOldLose.push(this.oldLose);
        this.compareDate.push(this.winLoseHistory[index].date);
      } else {
        const index = this.winLoseHistory.findIndex(e => e.date == val);
        this.oldWin = this.winLoseHistory[index].wins;
        this.oldLose = this.winLoseHistory[index].loses;
      }
    }
  },
  mounted() {
    this.currentAndOldWin.push(this.latestWinLose.wins);
    this.currentAndOldLose.push(this.latestWinLose.loses);
    this.compareDate.push(this.epochToDate(this.latestWinLose.date));
  },
  methods: {
    ...mapActions("dashboard", ["updateDashboardExpand"]),
    epochToDate(epoch) {
      const date = new Date(epoch);
      return (
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      );
    },
    isPlayer() {
      if (this.currentPlayer.email) return this.currentPlayer;
      else if (this.user.role == "eSporter") return this.user;
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="scss">
.expanded-container {
  width: calc(100% - 35px);
}

.winlose-chart-container {
  height: 200px;
  width: 99%;
  position: relative;
}

.big-chart-container {
  height: 67vh !important;
  position: relative;
}

h6 {
  margin: 0;
}

.q-field--auto-height.q-field--dense .q-field__control,
.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 20px;
}

.q-field--outlined .q-field__control {
  padding: 0 6px;
}

.q-list--dense > .q-item,
.q-item--dense {
  padding: 0 6px;
}

@media only screen and (max-height: 900px) {
  .big-chart-container {
    height: 95% !important;
  }
}
@media only screen and (max-height: 800px) {
  .winlose-chart-container {
    height: 180px;
  }

  .big-chart-container {
    height: 94% !important;
  }
}
@media only screen and (max-height: 700px) {
  .winlose-chart-container {
    height: 170px;
  }

  .big-chart-container {
    height: 88% !important;
  }
}
</style>
