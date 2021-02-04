<template>
  <q-page>
    <!-- Filter sub-header, sort option, change grid and list view -->
    <div class="row justify-around items-center">
      <div class="left-column-subheader">
        <h5>Filter</h5>
      </div>
      <div class="col-grow">
        <div class="row items-center">
          <h5 v-if="searchModeFilter == 'team'" class="q-pl-xs">Teams</h5>
          <h5
            v-if="searchModeFilter == 'player' && user.role == 'Researcher'"
            class="q-pl-xs"
          >
            Players
          </h5>
          <h5
            v-if="searchModeFilter == 'player' && user.role == 'Coach'"
            class="q-pl-xs"
          >
            Your Team
          </h5>
          <div v-if="user.role == 'Coach'">
            <q-btn
              class="q-ml-md"
              flat
              color="primary"
              padding="xs"
              icon="add"
              size="md"
              @click="inviteDialog = true"
            >
              <q-tooltip content-class="bg-grey-8">Add new player</q-tooltip>
            </q-btn>
            <InviteCodeDialog
              v-if="inviteDialog"
              :code="user.code"
              :club="user.club"
              v-on:close="inviteDialog = false"
            />
          </div>
          <q-space />

          <!-- Sort options -->
          <h5 class="q-pr-md">Sort by</h5>
          <span>
            <q-select
              class="q-pr-lg"
              hide-bottom-space
              dense
              options-dense
              square
              outlined
              bg-color="white"
              v-model="sortModel"
              :options="
                searchModeFilter == 'team'
                  ? sortOptions
                  : sortOptions.slice(0, 6)
              "
          /></span>

          <!-- Change view mode [List and Grid] -->
          <q-btn-toggle
            class="q-mr-xs no-border-radius shadow-7"
            dense
            v-model="gridViewModel"
            toggle-color="secondary"
            toggle-text-color="white"
            color="white"
            text-color="black"
            :options="[
              { value: 'list', slot: 'one' },
              { value: 'grid', slot: 'two' }
            ]"
          >
            <template v-slot:one>
              <q-icon name="reorder" />
            </template>

            <template v-slot:two>
              <q-icon name="view_module" />
            </template>
          </q-btn-toggle>
        </div>
      </div>
    </div>

    <div class="row justify-around">
      <!-- Filter options -->
      <div class="left-column">
        <div class="row">
          <div class="filter-option blur-bg q-pa-md">
            <FilterOption
              v-on:search="search"
              v-on:download="downloadExcel"
              :loaded="!pageLoading"
            />
          </div>
          <div class="go-back-container-sm">
            <transition name="slide-right-back-filter" mode="out-in">
              <q-btn
                dense
                size="xs"
                class="go-back-btn no-border-radius"
                @click="backToViewTeam"
                v-if="currentTeam.name && user.role === 'Researcher'"
              >
                <i class="row go-back-text">▼ Go back</i>
              </q-btn>
            </transition>
          </div>
        </div>
      </div>

      <div class="col-grow filter-results">
        <q-scroll-area
          ref="scrollArea"
          @scroll="scrollInfo"
          :thumb-style="scrollStyle"
          class="scroll-area"
        >
          <!-- List display -->
          <transition name="slide-left" mode="out-in">
            <div class="items-container q-pr-lg" v-if="gridViewModel == 'list'">
              <transition name="slide-left" mode="out-in">
                <div v-if="!pageLoading">
                  <transition-group name="filter-list" tag="div">
                    <!-- Result items -->
                    <FilterResultItemList
                      style="width: 100%;"
                      v-for="result in searchResults"
                      :key="result.name"
                      v-bind="result"
                      v-on:search-list="viewTeamMembers"
                      v-on:detail-list="viewPlayer"
                  /></transition-group></div
              ></transition>
              <!-- Skeleton pageLoading -->
              <transition name="slide-left" mode="out-in">
                <div v-if="pageLoading">
                  <SkeletonFilterResultItemList
                    style="width: 100%"
                    v-for="result in 6"
                    :key="result"
                  /></div
              ></transition></div
          ></transition>

          <!-- Grid display -->
          <transition name="slide-left" mode="out-in">
            <div class="items-container" v-if="gridViewModel == 'grid'">
              <transition name="slide-left" mode="out-in">
                <div v-if="!pageLoading" class="q-ml-sm">
                  <transition-group
                    name="flip-list"
                    tag="div"
                    class="row justify-start"
                  >
                    <!-- Result items -->
                    <FilterResultItemGrid
                      class="q-mb-lg q-mr-lg row justify-start"
                      v-for="result in searchResults"
                      :key="result.name"
                      v-bind="result"
                      v-on:search-grid="viewTeamMembers"
                      v-on:detail-grid="viewPlayer"
                      :searchMode="searchModeFilter"
                  /></transition-group></div
              ></transition>
              <!-- Skeleton pageLoading -->
              <transition name="slide-left" mode="out-in">
                <div v-if="pageLoading" class="row justify-start">
                  <SkeletonFilterResultItemGrid
                    class="q-mb-lg q-mr-lg q-ml-sm"
                    v-for="result in 8"
                    :key="result"
                  /></div
              ></transition></div
          ></transition>

          <!-- No result -->
          <div
            class="items-container"
            v-if="searchResults.length == 0 && pageLoading == false"
          >
            <h4 class="no-result">
              No result available for the searched term :(
            </h4>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FilterOption from "../components/Filter/FilterOption";
import FilterResultItemList from "../components/Filter/FilterResultItemList";
import FilterResultItemGrid from "../components/Filter/FilterResultItemGrid";
import SkeletonFilterResultItemList from "../components/Filter/SkeletonFilterResultItemList";
import SkeletonFilterResultItemGrid from "../components/Filter/SkeletonFilterResultItemGrid";
import InviteCodeDialog from "../components/Filter/InviteCodeDialog";

import LoginRes from "../graphql/login";
import FilterRes from "../graphql/filter";
import Utils from "../boot/utils";

import XLSX from "xlsx";

import { throttle } from "quasar";

export default {
  name: "FilterPage",
  components: {
    FilterResultItemList,
    FilterResultItemGrid,
    SkeletonFilterResultItemList,
    SkeletonFilterResultItemGrid,
    FilterOption,
    InviteCodeDialog
  },
  data() {
    return {
      scrollStyle: {
        backgroundColor: "secondary",
        width: "6px",
        opacity: 0.75
      },
      sortOptions: [
        "Name Ascending",
        "Name Descending",
        "Match Win Ascending",
        "Match Win Descending",
        "Match Lose Ascending",
        "Match Lose Descending",
        "Players Ascending",
        "Players Descending"
      ],
      pageLoading: true,
      club: "",
      inviteDialog: false
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
      "gridView",
      "filterNumberModel",
      "filterOption",
      "scrollPosition",
      "searchResults"
    ]),
    ...mapGetters("dashboard", ["matches"]),
    gridViewModel: {
      get() {
        return this.gridView;
      },
      set(val) {
        this.updateGridView(val);
      }
    },
    sortModel: {
      get() {
        return this.sortOption;
      },
      set(val) {
        this.updateSortOption(val);
      }
    }
  },
  created() {
    if (this.user.role == "eSporter") this.$router.push("/dashboard");
    // If viewing a team, will get all players from that team when get back to this page
    if (this.currentTeam.name) {
      this.viewTeamMembers(this.currentTeam);
    } else {
      // Get all clubs when enter the page
      this.search(this.searchModeFilter);
    }
    this.sortModel = this.sortOption;

    this.scrollInfo = throttle(this.scrollInfo, 100);
  },
  watch: {
    // Watch for sortModel variable to change and return sorted searchResults accordingly to the selected sort option
    sortModel(val) {
      this.updateSortOption(val);
      switch (val) {
        case "Name Ascending":
          if (this.searchModeFilter == "team")
            return this.searchResults.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          else
            return this.searchResults.sort((a, b) =>
              a.firstname.localeCompare(b.firstname)
            );

        case "Name Descending":
          if (this.searchModeFilter == "team")
            return this.searchResults.sort((a, b) =>
              b.name.localeCompare(a.name)
            );
          else
            return this.searchResults.sort((a, b) =>
              b.firstname.localeCompare(a.firstname)
            );

        case "Match Win Ascending":
          if (this.searchModeFilter == "team")
            return this.searchResults.sort((a, b) => a.totalWins - b.totalWins);
          else
            return this.searchResults.sort(
              (a, b) =>
                a.winlose[a.winlose.length - 1].wins -
                b.winlose[b.winlose.length - 1].wins
            );

        case "Match Win Descending":
          if (this.searchModeFilter == "team")
            return this.searchResults.sort((a, b) => b.totalWins - a.totalWins);
          else
            return this.searchResults.sort(
              (a, b) =>
                b.winlose[b.winlose.length - 1].wins -
                a.winlose[a.winlose.length - 1].wins
            );

        case "Match Lose Ascending":
          if (this.searchModeFilter == "team")
            return this.searchResults.sort(
              (a, b) => a.totalLoses - b.totalLoses
            );
          else
            return this.searchResults.sort(
              (a, b) =>
                a.winlose[a.winlose.length - 1].loses -
                b.winlose[b.winlose.length - 1].loses
            );

        case "Match Lose Descending":
          if (this.searchModeFilter == "team")
            return this.searchResults.sort(
              (a, b) => b.totalLoses - a.totalLoses
            );
          else
            return this.searchResults.sort(
              (a, b) =>
                b.winlose[b.winlose.length - 1].loses -
                a.winlose[a.winlose.length - 1].loses
            );

        case "Players Ascending":
          return this.searchResults.sort(
            (a, b) => a.players.length - b.players.length
          );

        case "Players Descending":
          return this.searchResults.sort(
            (a, b) => b.players.length - a.players.length
          );
      }
    }
  },
  methods: {
    ...mapActions("user", [
      "updateUser",
      "updateTokenCookie",
      "updateTokenSession",
      "getLoggedInUserInfo",
      "logout"
    ]),
    ...mapActions("filter", [
      "updateSearchModeFilter",
      "updateCurrentTeam",
      "updateSearchQuery",
      "updateSortOption",
      "updateCurrentPlayer",
      "updateGridView",
      "updateScrollPosition",
      "updateSearchResults",
      "getClubs",
      "getPlayers",
      "getPlayerByEmail"
    ]),
    ...mapActions("dashboard", ["updateMatches"]),
    // Called when click to search mode button [Team or Player]
    search(payload) {
      this.updateSearchModeFilter(payload);
      if (this.user.role === "Researcher") {
        if (payload == "team") {
          this.getAllClub();
        } else if (payload == "player") {
          this.getAllPlayer();
        }
      } else if (this.user.role === "Coach") {
        this.updateSearchModeFilter("player");
        this.updateCurrentTeam({ name: this.user.club });
        this.club = this.user.club;
        this.getAllPlayer();
      }
    },
    // Called when click a club card
    viewTeamMembers(payload) {
      // Reset scroll position for player
      if (this.$refs.scrollArea) this.updateScrollPosition({ player: 0 });
      this.updateSearchQuery("");
      this.updateSearchModeFilter("player");
      this.updateCurrentTeam(payload);
      this.club = payload.name;
      this.getAllPlayer();
    },
    // Called when click back button
    backToViewTeam() {
      // Reset scroll position for player
      if (this.$refs.scrollArea) this.updateScrollPosition({ player: 0 });
      this.club = "";
      this.updateSearchQuery("");
      this.updateCurrentTeam({});
      this.updateSearchModeFilter("team");
      this.getAllClub();
    },
    // Called when click a player card
    viewPlayer(payload) {
      this.getPlayer(payload);
    },
    // Get all clubs or get specific club
    getAllClub() {
      this.club = "";
      this.updateCurrentTeam({});
      this.updateSearchResults([]);
      this.pageLoading = true;
      this.getClubs(this.searchQuery).then(data => {
        if (this.filterNumberModel != 0) this.filter();
        this.pageLoading = false;
        this.animateScroll(this.scrollPosition.team, 1);
      });
    },
    // Get all players or get specific player based on the search query or club
    getAllPlayer() {
      this.updateSearchResults([]);
      this.pageLoading = true;
      this.getPlayers({
        query: this.searchQuery,
        club: this.club
      }).then(data => {
        if (this.filterNumberModel != 0) this.filter();
        this.pageLoading = false;
        this.animateScroll(this.scrollPosition.player, 1);
      });
    },
    // Get player detail by email
    getPlayer(email) {
      this.getPlayerByEmail(email).then(data => {
        this.$router.push("/dashboard");
      });
    },
    // Show error notification from GraphQL call
    showNotification(payload) {
      let color, icon;
      if (payload.error) {
        color = "negative";
        icon = "o_new_releases";
      } else {
        color = "positive";
        icon = "fas fa-check-circle";
      }
      this.$q.notify({
        message: payload.message,
        color: color,
        icon: icon,
        actions: [
          {
            label: "Dismiss",
            color: "white",
            handler: () => {
              /* ... */
            }
          }
        ]
      });
      if (payload.message == "Authentication token is invalid, please log in") {
        this.logout();
        this.$router.push("/");
      }
    },
    // Animate scroll
    animateScroll(position, offset) {
      this.$refs.scrollArea.setScrollPosition(position, offset);
    },
    // Filter searchResults array based on filter option
    filter() {
      if (this.filterOption == "Match Win Greater Than") {
        this.updateSearchResults(
          this.searchResults.filter(
            result => this.isTeam(result) >= this.filterNumberModel
          )
        );
      } else if (this.filterOption == "Match Win Lower than") {
        this.updateSearchResults(
          this.searchResults.filter(
            result => this.isTeam(result) <= this.filterNumberModel
          )
        );
      } else if (this.filterOption == "Match Lose Greater Than") {
        this.updateSearchResults(
          this.searchResults.filter(
            result => this.isTeam(result) >= this.filterNumberModel
          )
        );
      } else if (this.filterOption == "Match Lose Lower Than") {
        this.updateSearchResults(
          this.searchResults.filter(
            result => this.isTeam(result) <= this.filterNumberModel
          )
        );
      }
    },
    isTeam(result) {
      if (
        this.filterOption == "Match Win Greater Than" ||
        this.filterOption == "Match Win Lower than"
      ) {
        if (this.searchModeFilter == "team") return result.totalWins;
        else return result.winlose[result.winlose.length - 1].wins;
      } else if (
        this.filterOption == "Match Lose Greater Than" ||
        this.filterOption == "Match Lose Lower Than"
      ) {
        if (this.searchModeFilter == "team") return result.totalLoses;
        else return result.winlose[result.winlose.length - 1].loses;
      }
    },
    scrollInfo(e) {
      // Save scroll position
      if (this.searchModeFilter == "player")
        this.updateScrollPosition({
          player: e.verticalPosition
        });
      else if (this.searchModeFilter == "team")
        this.updateScrollPosition({
          team: e.verticalPosition
        });
    },
    async downloadExcel() {
      // Export team data to XLSX
      if (this.searchModeFilter == "team") {
        let teamResults = JSON.parse(JSON.stringify(this.searchResults));
        let playerResults = JSON.parse(JSON.stringify(this.searchResults));

        // First sheet include information of all teams
        for (let i = 0; i < teamResults.length; i++) {
          delete teamResults[i].__typename;
          delete teamResults[i].players;
          delete teamResults[i].inactive;
        }

        const data = XLSX.utils.json_to_sheet(teamResults);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, data, "All Team");

        // Subsequent sheets will include players data from each team
        for (let i = 0; i < teamResults.length; i++) {
          let playerData = [];
          playerResults[i].players.forEach(player => {
            const latestWinLose = player.winlose[player.winlose.length - 1];
            player.wins = latestWinLose.wins;
            player.loses = latestWinLose.loses;
            player.latestUpdate = Utils.epochToDate(latestWinLose.date);

            delete player.winlose;
            delete player.__typename;

            playerData.push(player);
          });

          const data = XLSX.utils.json_to_sheet(playerData);
          playerData = [];
          XLSX.utils.book_append_sheet(
            wb,
            data,
            playerResults[i].name + " players"
          );
        }

        XLSX.writeFile(wb, "FIFA Dashboard Teams Data.xlsx");
        // Export players data to XLSX
      } else {
        await this.updateMatches();
        let playerResults = JSON.parse(JSON.stringify(this.searchResults));
        let playerDetailResults = JSON.parse(
          JSON.stringify(this.searchResults)
        );
        // First sheet include information of all players
        for (let i = 0; i < playerResults.length; i++) {
          const latestWinLose =
            playerResults[i].winlose[playerResults[i].winlose.length - 1];
          playerResults[i].wins = latestWinLose.wins;
          playerResults[i].loses = latestWinLose.loses;
          playerResults[i].latestUpdate = Utils.epochToDate(latestWinLose.date);
          delete playerResults[i].__typename;
          delete playerResults[i].winlose;
          delete playerResults[i].bio;
          delete playerResults[i].inactive;
          delete playerResults[i].note;
        }

        const data = XLSX.utils.json_to_sheet(playerResults);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, data, "All Player");

        // Subsequent sheets will include detail match data from each player
        for (let i = 0; i < playerResults.length; i++) {
          let playerMatches = this.matches.filter(
            match => match.player == playerResults[i].email
          );
          playerMatches.forEach(match => {
            delete match.__typename;
          });

          const data = XLSX.utils.json_to_sheet(playerMatches);
          // Set width for column
          // data["!cols"] = [{ width: 20 }, { width: 20 }, { width: 150 }];
          playerMatches = [];
          XLSX.utils.book_append_sheet(
            wb,
            data,
            playerResults[i].firstname + " " + playerResults[i].lastname
          );
        }

        XLSX.writeFile(wb, "FIFA Dashboard Players Data.xlsx");
      }
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
.left-column {
  width: 400px;
  margin-top: 16px;
}

.left-column-subheader {
  width: 400px;
}

.filter-option {
  width: calc(100% - 20px);
  max-height: 75%;
  max-width: 100%;
}

.filter-results {
  margin-top: 16px;
  height: 75vh;
  max-width: 100%;
  overflow: hidden;
}

.items-container {
  width: 100%;
}

h5 {
  margin: 0;
}

.no-result {
  text-align: center;
  color: grey;
  user-select: none;
}

.scroll-area {
  width: 100%;
  height: 75vh;
}

.left-triangle {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
}

@media only screen and (min-width: 1921px) {
}
@media only screen and (max-width: 1920px) {
}
@media only screen and (max-width: 1500px) {
}
@media only screen and (max-width: 1100px) {
  .left-column {
    width: 300px;
  }
  .left-column-subheader {
    width: 300px;
  }
}
@media only screen and (max-width: 900px) {
}
@media only screen and (max-width: 600px) {
}
</style>
