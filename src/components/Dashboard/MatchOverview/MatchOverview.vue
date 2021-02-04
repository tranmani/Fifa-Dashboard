<template>
  <div class="row justify-between">
    <!-- Left panel -->
    <div class="col-5 q-pr-md q-pt-md">
      <q-tab-panels
        v-model="tabModel"
        animated
        vertical
        transition-prev="jump-up"
        transition-next="jump-down"
        class="full-height tab-container blur-bg"
        @click="$emit('expand-match', 'match')"
      >
        <q-tab-panel name="match">
          <GraphTitle
            :name="'Cumulative Match Win and Lose'"
            :lastUpdate="allDates[allDates.length - 1]"
          />
          <div v-if="!matchWinNeedMoreData" class="large-tile-chart">
            <AreaChart
              style="height: 100%"
              :labels="allDates"
              :dataset1="allWins"
              :dataset2="allLoses"
            />
          </div>
          <div v-else class="no-match-data">
            <h6>Match history need more data to display</h6>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Right panel -->
    <div class="col-7 q-pt-md">
      <div class="row full-height">
        <div class="column" style="height: 100%; width:100%">
          <div class="col-6 q-pb-md">
            <!-- Top right panel -->
            <q-tab-panels
              v-model="tabModel"
              animated
              vertical
              transition-prev="jump-up"
              transition-next="jump-down"
              class="full-height blur-bg"
            >
              <q-tab-panel name="match">
                <GraphTitle
                  :name="'Win - Lose By Day Part'"
                  :lastUpdate="latestMatchDetail"
                />
                <div v-if="personalMatches.length != 0">
                  <BarChart
                    class="small-tile-chart"
                    :labels="['Morning', 'Afternoon', 'Evening', 'Night']"
                    :dataset1="winLoseByDayPart[0]"
                    :dataset2="winLoseByDayPart[1]"
                    :showLable="true"
                    :showLegend="true"
                  />
                </div>
                <div v-else class="no-match-data">
                  <h6>Match history need more data to display</h6>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
          <div class="col-6">
            <div class="row full-height">
              <div class="col-6 q-pr-sm">
                <q-tab-panels
                  v-model="tabModel"
                  animated
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-down"
                  class="full-height blur-bg"
                >
                  <q-tab-panel name="match">
                    <GraphTitle
                      :name="'Goal Shot Ratio'"
                      :lastUpdate="latestMatchDetail"
                    />
                    <div v-if="personalMatches.length != 0">
                      <div v-if="currentPlayer.email">
                        <PieChart
                          :label1="'You'"
                          :label2="'Your opponents'"
                          :data1="goalShotRatio[0]"
                          :data2="goalShotRatio[1]"
                          :dataSuffix="'%'"
                          class="small-tile-chart"
                        />
                      </div>
                      <div v-if="!currentPlayer.email">
                        <PieChart
                          :wins="user.winlose[user.winlose.length - 1].wins"
                          :loses="user.winlose[user.winlose.length - 1].loses"
                          class="small-tile-chart"
                        />
                      </div>
                    </div>
                    <div v-else class="no-match-data">
                      <h6>Match history need more data to display</h6>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>

              <div class="col-6 q-pl-sm">
                <q-tab-panels
                  v-model="tabModel"
                  animated
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-down"
                  class="full-height blur-bg"
                >
                  <q-tab-panel name="match">
                    <GraphTitle
                      :name="'Match Average'"
                      :lastUpdate="latestMatchDetail"
                    />
                    <div v-if="personalMatches.length != 0">
                      <RadarChart
                        class="small-tile-chart"
                        :label1="'You'"
                        :label2="'Your opponents'"
                        :dataset1="matchAverage[0]"
                        :dataset2="matchAverage[1]"
                        :labels="[
                          'Shot',
                          'Target Shot',
                          'Tackle',
                          'Foul',
                          'Corner'
                        ]"
                      />
                    </div>

                    <div v-else class="no-match-data">
                      <h6>Match history need more data to display</h6>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </div>
        </div>
      </div>
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

import Utils from "../../../boot/utils";

export default {
  name: "MatchOverview",
  components: { AreaChart, RadarChart, PieChart, BarChart, GraphTitle },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("filter", ["currentTeam", "currentPlayer"]),
    ...mapGetters("dashboard", [
      "tabModel",
      "allDates",
      "allWins",
      "allLoses",
      "winLoseHistory",
      "matchWinNeedMoreData",
      "personalMatches",
      "dashboardLoaded"
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
    goalShotRatio() {
      return Utils.countAverageWithOpp(
        this.personalMatches,
        "goalShotRatio",
        "goalShotRatioOpp",
        5
      );
    },
    matchAverage() {
      if (this.dashboardLoaded.matches) {
        const shots = Utils.countAverageWithOpp(
          this.personalMatches,
          "shots",
          "shotsOpp",
          2
        );
        const targetShots = Utils.countAverageWithOpp(
          this.personalMatches,
          "targetShots",
          "targetShotsOpp",
          2
        );
        const tackles = Utils.countAverageWithOpp(
          this.personalMatches,
          "tackles",
          "tacklesOpp",
          2
        );
        const fouls = Utils.countAverageWithOpp(
          this.personalMatches,
          "fouls",
          "foulsOpp",
          2
        );
        const corners = Utils.countAverageWithOpp(
          this.personalMatches,
          "corners",
          "cornersOpp",
          2
        );

        // Convert all average number to a scale from 0 to 10
        return [
          [
            Utils.convertScale(shots[0], 10),
            Utils.convertScale(targetShots[0], 20),
            Utils.convertScale(tackles[0], 20),
            Utils.convertScale(fouls[0], 5),
            Utils.convertScale(corners[0], 5)
          ],
          [
            Utils.convertScale(shots[1], 10),
            Utils.convertScale(targetShots[1], 20),
            Utils.convertScale(tackles[1], 20),
            Utils.convertScale(fouls[1], 5),
            Utils.convertScale(corners[1], 5)
          ]
        ];
      }
    },
    // Count Win - lose by day part
    winLoseByDayPart() {
      if (this.dashboardLoaded.matches) {
        const morningMatches = this.getMatchByProperty("dayPart", "Morning");
        const afternoonMatches = this.getMatchByProperty(
          "dayPart",
          "Afternoon"
        );
        const eveningMatches = this.getMatchByProperty("dayPart", "Evening");
        const nightMatches = this.getMatchByProperty("dayPart", "Night");

        let wins = { morning: 0, afternoon: 0, evening: 0, night: 0 };
        let loses = { morning: 0, afternoon: 0, evening: 0, night: 0 };

        morningMatches.forEach(e => {
          if (e.isWin) wins.morning++;
          else loses.morning++;
        });
        afternoonMatches.forEach(e => {
          if (e.isWin) wins.afternoon++;
          else loses.afternoon++;
        });
        eveningMatches.forEach(e => {
          if (e.isWin) wins.evening++;
          else loses.evening++;
        });
        nightMatches.forEach(e => {
          if (e.isWin) wins.night++;
          else loses.night++;
        });

        return [
          [wins.morning, wins.afternoon, wins.evening, wins.night],
          [loses.morning, loses.afternoon, loses.evening, loses.night]
        ];
      }
    },
    // Last recorded match date
    latestMatchDetail() {
      if (this.dashboardLoaded.matches) {
        if (this.personalMatches.length != 0)
          return Utils.epochToDate(
            this.personalMatches[this.personalMatches.length - 1].gameDate
          );
        else return;
      }
    }
  },
  // watch: {
  //   "dashboardLoaded.matches"(val) {
  //     if (val) {
  //       this.detailMatch;
  //     }
  //   }
  // },
  created() {},
  methods: {
    ...mapActions("dashboard", ["updateDashboardLoaded"]),
    isPlayer() {
      if (this.currentPlayer.email) return this.currentPlayer;
      else if (this.user.role == "eSporter") return this.user;
    },
    latestWinLoseDate() {
      const date = new Date(
        this.isPlayer().winlose[this.isPlayer().winlose.length - 1].date
      );
      return (
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      );
    },
    getMatchByProperty(property, value) {
      return this.personalMatches.filter(match => match[property] == value);
    }
  },
  beforeDestroy() {
    // this.updateDashboardLoaded({ matches: false });
  }
};
</script>

<style lang="scss" scoped>
.tab-container {
  cursor: pointer;
}

.small-tile-chart {
  height: 280px;
  width: 99%;
}

.large-tile-chart {
  height: 95% !important;
  position: relative;
}

@media only screen and (max-height: 900px) {
  .small-tile-chart {
    height: 260px;
  }

  .large-tile-chart {
    height: 94% !important;
  }
}
@media only screen and (max-height: 800px) {
  .small-tile-chart {
    height: 220px;
  }

  .large-tile-chart {
    height: 93% !important;
  }
}
@media only screen and (max-height: 700px) {
  .small-tile-chart {
    height: 160px;
  }

  .large-tile-chart {
    height: 88% !important;
  }
}
</style>
