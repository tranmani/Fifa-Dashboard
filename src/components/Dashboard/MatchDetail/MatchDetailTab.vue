<template>
  <div class="q-mt-md">
    <q-tab-panels
      v-model="tabModel"
      animated
      vertical
      transition-prev="jump-up"
      transition-next="jump-down"
      class="full-height"
    >
      <q-tab-panel name="matchDetail">
        <div v-if="mobile == 'md'" class="row">
          <div class="match-detail-option">
            <MatchDetailOption />
          </div>
          <div class="col-3">
            <MatchList />
          </div>
          <div class="col-grow">
            <div v-if="currentMatchDetail._id">
              <MatchDetail :matchDetail="currentMatchDetail" />
            </div>
            <div
              v-else
              class="match-detail-container flex justify-center items-center"
            >
              <h5 class="no-match">Select a match</h5>
            </div>
          </div>
        </div>

        <div v-if="mobile == 'sm'" class="row">
          <div class="match-detail-option column">
            <MatchDetailOption class="q-mb-md" />
            <MatchList />
          </div>
          <div class="col-grow">
            <div v-if="currentMatchDetail._id">
              <MatchDetail :matchDetail="currentMatchDetail" />
            </div>
            <div
              v-else
              class="match-detail-container flex justify-center items-center"
            >
              <h5 class="no-match">Select a match</h5>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import MatchDetailOption from "./MatchDetailOption";
import MatchList from "./MatchList";
import MatchDetail from "./MatchDetail";

export default {
  name: "MatchDetailTab",
  components: {
    MatchDetailOption,
    MatchList,
    MatchDetail
  },
  computed: {
    ...mapGetters("dashboard", ["tabModel", "currentMatchDetail"]),
    ...mapGetters("util", ["mobile"]),
    ...mapGetters("user", ["user"]),
    ...mapGetters("filter", ["currentPlayer"])
  },
  methods: {
    ...mapActions("dashboard", [
      "updatePersonalMatchesDetail",
      "emptyPersonalMatchesDetail",
      "updateCurrentMatchDetail"
    ])
  },
  mounted() {
    let player;
    if (this.user.role == "eSporter") {
      player = this.user.email;
    } else if (this.user.role == "Researcher" || this.user.role == "Coach") {
      player = this.currentPlayer.email;
    }
    this.updatePersonalMatchesDetail({
      player: player,
      team: ""
    });
  },
  beforeDestroy() {
    this.emptyPersonalMatchesDetail();
    this.updateCurrentMatchDetail();
  }
};
</script>

<style lang="scss" scoped>
.q-tab-panel {
  padding: 0;
}

.match-detail-option {
  width: 350px;
}

.match-detail-container {
  height: 75vh;
  width: 100%;
  background-color: $accent;
}

.no-match {
  color: grey;
  user-select: none;
}

.q-tab-panels {
  background: #fff0;
}

@media only screen and (max-width: 1335px) {
  .match-detail-option {
    width: 300px;
  }
}

@media only screen and (max-width: 900px) {
  .match-detail-option {
    width: 250px;
  }
}
</style>
