<template>
  <div class="q-mr-md blur-bg" id="match-option-container">
    Search For Match
    <!-- Search query field -->
    <q-input
      clearable
      clear-icon="close"
      autofocus
      outlined
      square
      debounce="100"
      standout="bg-white"
      color="white"
      bg-color="white"
      v-model="teamName"
      v-on:keyup.enter="search(false)"
      @clear="search(true)"
      dense
      hide-bottom-space
      class="q-mb-md"
      placeholder="Team name"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    Filter By
    <q-select
      hide-bottom-space
      dense
      options-dense
      square
      outlined
      bg-color="white"
      v-model="filter"
      :options="filterOptions"
      class="q-mb-lg"
    />

    Sort By
    <q-select
      hide-bottom-space
      dense
      options-dense
      square
      outlined
      bg-color="white"
      v-model="sort"
      :options="sortOptions"
      class="q-mb-lg"
    />

    <!-- Search button -->
    <div class="flex flex-center">
      <q-btn
        color="white"
        text-color="black"
        class="no-border-radius"
        label="Search"
        @click="search(false)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MatchDetailOption",
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("filter", ["currentPlayer"])
  },
  data() {
    return {
      teamName: "",
      filter: "Default",
      filterOptions: ["Default", "Win", "Lose"],
      sort: "Default",
      sortOptions: [
        "Default",
        "Most Goals",
        "Most Shots",
        "Most Shots On Target",
        "Most Possession %",
        "Most Tackles",
        "Most Fouls",
        "Most Corners",
        "Most Shot Accuracy %",
        "Most Pass Accuracy %"
      ]
    };
  },
  methods: {
    ...mapActions("dashboard", [
      "updatePersonalMatchesDetail",
      "updateFilterMatchDetail",
      "updateSortMatchDetail"
    ]),
    search(clear) {
      if (clear) this.teamName = "";
      if (this.teamName == null) this.teamName = "";
      let player;
      if (this.user.role == "eSporter") {
        player = this.user.email;
      } else if (this.user.role == "Researcher" || this.user.role == "Coach") {
        player = this.currentPlayer.email;
      }
      this.updatePersonalMatchesDetail({
        player: player,
        team: this.teamName
      }).then(() => {
        this.updateFilterMatchDetail(this.filter);
        this.updateSortMatchDetail(this.sort);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#match-option-container {
  max-height: 75%;
  max-width: 100%;
  padding: 16px;
}

@media only screen and (max-width: 600px) {
}
</style>
