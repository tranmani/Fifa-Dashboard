<template>
  <div class="q-pr-md" id="match-list-container">
    <q-scroll-area
      ref="scrollAreaMatchList"
      :thumb-style="scrollStyle"
      :class="
        mobile == 'md'
          ? 'scroll-area-match-list'
          : 'scroll-area-match-list-mobile'
      "
    >
      <!-- Loading icon -->
      <div v-if="!dashboardLoaded.matchesDetail" class="flex justify-center">
        <q-spinner-puff color="primary" size="4em" />
      </div>
      <!-- Matches list -->
      <div
        v-if="
          personalMatchesDetail.length != 0 && dashboardLoaded.matchesDetail
        "
      >
        <Match
          v-for="match in reverse(personalMatchesDetail)"
          :key="match._id"
          class="q-mb-sm"
          v-on:selectMatch="selectMatch"
          :id="match._id"
          :team1="match.teamName"
          :team1Pic="match.teamInfo[0].picture"
          :goal1="match.goals"
          :team2="match.teamNameOpp"
          :team2Pic="
            match.teamInfoOpp.length != 0
              ? match.teamInfoOpp[0].picture
              : undefined
          "
          :goal2="match.goalsOpp"
          :time="match.gameDate"
          :isWin="match.isWin"
          :isActive="currentMatchDetail._id == match._id ? true : false"
        />
      </div>
      <!-- No match found -->
      <h5
        v-if="
          personalMatchesDetail.length == 0 && dashboardLoaded.matchesDetail
        "
        class="no-match"
      >
        No match found
      </h5>
    </q-scroll-area>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Match from "./Match";

export default {
  name: "MatchList",
  components: { Match },
  computed: {
    ...mapGetters("util", ["mobile"]),
    ...mapGetters("dashboard", [
      "personalMatchesDetail",
      "dashboardLoaded",
      "currentMatchDetail"
    ])
  },
  data() {
    return {
      scrollStyle: {
        backgroundColor: "secondary",
        width: "6px",
        opacity: 0.75,
        right: "-11px"
      },
      barStyle: {
        right: "-11px"
      }
    };
  },
  methods: {
    ...mapActions("dashboard", ["updateCurrentMatchDetail"]),
    selectMatch(id) {
      this.updateCurrentMatchDetail(id);
    },
    reverse(arr) {
      return arr.slice().reverse();
    }
  }
};
</script>

<style lang="scss" scoped>
#match-list-container {
  max-height: 75vh;
  width: 100%;
}

.scroll-area-match-list {
  height: 74.2vh;
}

.scroll-area-match-list-mobile {
  height: 49.2vh;
}

.no-match {
  color: grey;
  user-select: none;
  text-align: center;
}

@media only screen and (max-width: 600px) {
}
</style>
