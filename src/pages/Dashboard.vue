<template>
  <q-page v-if="currentPlayer.email || user.role == 'eSporter'">
    <div class="row justify-around items-center">
      <div class="">
        <div class="column">
          <div class="col">
            <h5 v-if="user.role == 'eSporter'">Your Statistics</h5>
            <h5 v-if="user.role == 'Researcher' || user.role == 'Coach'">
              {{ currentPlayer.firstname + " " + currentPlayer.lastname }}
            </h5>
          </div>
          <div class="col">
            <span>Current date: </span>
            <span>{{ today }}</span>
          </div>
        </div>
      </div>
      <q-space />
      <div class="">
        <h5 v-if="tabModel == 'match'">Match Overview</h5>
        <h5 v-if="tabModel == 'matchDetail'">
          Match Detail
        </h5>
      </div>
    </div>

    <!-- Dashboard content -->
    <div class="row">
      <div
        :class="
          currentPlayer.email && !dashboardExpand
            ? 'dashboard-container'
            : 'dashboard-container-player'
        "
      >
        <!-- Match overview tab -->
        <MatchOverview
          v-if="tabModel == 'match' && !dashboardExpand"
          class="full-height"
          v-on:expand-match="updateDashboardExpand"
        />

        <!-- Match tab expanded -->
        <transition name="slide-right-dashboard" mode="out-in">
          <MatchOverviewExpanded
            v-if="dashboardExpand == 'match'"
            class="full-height"
        /></transition>

        <!-- Personal overview tab -->
        <MatchDetailTab
          v-if="tabModel == 'matchDetail' && !dashboardExpand"
          class="full-height"
        />
      </div>
      <div
        class="go-back-container-md"
        v-if="currentPlayer.email && !dashboardExpand"
      >
        <q-btn
          dense
          size="xs"
          class="go-back-btn no-border-radius slide-right-back-dashboard"
          @click="$router.push('/filter')"
        >
          <i class="row go-back-text">▼ Go back</i>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AreaChart from "../components/Charts/AreaChart";
import RadarChart from "../components/Charts/RadarChart";
import MatchOverview from "../components/Dashboard/MatchOverview/MatchOverview";
import MatchDetailTab from "../components/Dashboard/MatchDetail/MatchDetailTab";
import MatchOverviewExpanded from "../components/Dashboard/MatchOverview/MatchOverviewExpanded";

import Login from "../graphql/login";
import Filter from "../graphql/filter";
import Utils from "../boot/utils";

export default {
  name: "Dashboard",
  components: {
    AreaChart,
    RadarChart,
    MatchOverview,
    MatchDetailTab,
    MatchOverviewExpanded
  },
  data() {
    return {
      data: []
    };
  },
  computed: {
    ...mapGetters("user", ["user", "token"]),
    ...mapGetters("filter", [
      "searchQuery",
      "searchModeFilter",
      "currentTeam",
      "sortOption",
      "currentPlayer",
      "gridView"
    ]),
    ...mapGetters("dashboard", ["tabModel", "dashboardExpand", "allDates"]),
    today() {
      const today = new Date();
      return (
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear()
      );
    }
  },
  created() {
    if (!this.currentPlayer.email && this.user.role != "eSporter")
      this.$router.push("/filter");
    else {
      const this_ = this;
      this.getAllMatchWinLose();
      this.updatePersonalMatches(this.currentPlayer.email);
    }
  },
  methods: {
    ...mapActions("user", [
      "updateUser",
      "updateTokenCookie",
      "updateTokenSession",
      "logout"
    ]),
    ...mapActions("filter", ["emptyCurrentPlayer"]),
    ...mapActions("dashboard", [
      "updateDashboardExpand",
      "updateTabModel",
      "updateWinLoseHistory",
      "emptyChart",
      "updateMatchWinNeedMoreData",
      "updatePersonalMatches",
      "emptyMatchWinNeedMoreData"
    ]),
    getAllMatchWinLose() {
      this.isPlayer().winlose.forEach(element => {
        const date = Utils.epochToDate(element.date);
        this.updateWinLoseHistory({
          date,
          wins: element.wins,
          loses: element.loses
        });
      });
      if (this.allDates.length != 1) {
        this.updateMatchWinNeedMoreData(false);
      } else this.updateMatchWinNeedMoreData(true);
    },
    isPlayer() {
      if (this.currentPlayer.email) return this.currentPlayer;
      else if (this.user.role == "eSporter") return this.user;
    }
  },
  beforeDestroy() {
    this.emptyCurrentPlayer();
    this.updateTabModel("match");
    this.updateDashboardExpand("");
    this.emptyChart();
    this.emptyMatchWinNeedMoreData();
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 75vh;
  width: calc(100% - 30px);
  overflow: hidden;
}

.dashboard-container-player {
  height: 75vh;
  width: 100%;
  overflow: hidden;
}

h5 {
  margin: 0;
}

.slide-right-back-dashboard {
  animation: slide-right 0.2s ease-in-out;
}

@keyframes slide-right {
  0% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
