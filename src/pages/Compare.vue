<template>
  <q-page>
    <!-- Compare sub-header -->
    <div class="row items-center">
      <div class="left-column-subheader">
        <h5>Compare</h5>
      </div>
    </div>

    <div class="row justify-around">
      <!-- Compare options -->
      <div class="left-column">
        <div class="row">
          <q-card flat class="compare-option blur-bg q-pa-md no-border-radius">
            <CompareOption :loaded="!pageLoading" />
          </q-card>
          <div class="go-back-container-sm">
            <transition name="slide-right-back-filter" mode="out-in">
              <q-btn
                dense
                size="xs"
                class="go-back-btn no-border-radius"
                to="/filter"
              >
                <i class="row go-back-text">▼ Go back</i>
              </q-btn>
            </transition>
          </div>
        </div>
      </div>

      <q-card flat class="row compare-results no-border-radius bg-page">
        <div class="q-ml-lg q-mr-sm">
          <FilterResultItemGrid
            v-if="compareOne.name && !pageLoading"
            v-bind="compareOne"
            :searchMode="searchModeCompare"
          />
          <SkeletonFilterResultItemGrid v-else :isCompare="true" />
        </div>
        <div class="compare-chart">
          <CompareChart :loaded="!pageLoading" />
        </div>
        <div class="q-ml-sm">
          <FilterResultItemGrid
            v-if="compareTwo.name && !pageLoading"
            v-bind="compareTwo"
            :searchMode="searchModeCompare"
          />
          <SkeletonFilterResultItemGrid v-else :isCompare="true" />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CompareOption from "../components/Compare/CompareOption";
import FilterResultItemGrid from "../components/Filter/FilterResultItemGrid";
import SkeletonFilterResultItemGrid from "../components/Filter/SkeletonFilterResultItemGrid";
import CompareChart from "../components/Compare/CompareChart";

import LoginRes from "../graphql/login";
import FilterRes from "../graphql/filter";
import Utils from "../boot/utils";

export default {
  name: "ComparePage",
  components: {
    FilterResultItemGrid,
    SkeletonFilterResultItemGrid,
    CompareOption,
    CompareChart
  },
  data() {
    return {
      pageLoading: true,
      club: ""
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("filter", [
      "searchModeFilter",
      "searchQuery",
      "searchResults"
    ]),
    ...mapGetters("compare", ["compareOne", "compareTwo", "searchModeCompare"]),
    gridViewModel: {
      get() {
        return this.gridView;
      },
      set(val) {
        this.updateGridView(val);
      }
    }
  },
  created() {
    this.updateCurrentTeam({});
    if (this.searchModeCompare == "team") {
      this.getClubs();
    } else if (this.searchModeCompare == "player") {
      this.getPlayers();
    }
  },
  watch: {
    searchModeCompare(val) {
      if (val == "team") {
        this.getClubs();
      } else if (val == "player") {
        this.getPlayers();
      }
    }
  },
  methods: {
    ...mapActions("compare", ["updateSearchModeCompare"]),
    ...mapActions("filter", [
      "updateSearchModeFilter",
      "updateCurrentTeam",
      "updateSearchQuery",
      "updateSortOption",
      "updateCurrentPlayer",
      "updateGridView",
      "updateSearchResults"
    ]),
    // Get all clubs or get specific club
    getClubs() {
      this.updateSearchResults([]);
      this.pageLoading = true;
      this.$apollo
        .query({
          query: FilterRes.getClubs(),
          variables: {
            query: this.searchQuery
          }
        })
        .then(data => {
          this.updateSearchResults(data.data.getClubs);
          this.updateSearchResults(Utils.totalWinLose(this.searchResults));
          this.updateSearchResults(
            this.searchResults.map(e => ({
              ...e,
              inactive: false
            }))
          );
          this.pageLoading = false;
        })
        .catch(error => {
          if (error) {
            this.showNotification({
              message: error.graphQLErrors[0].message,
              error: true
            });
          }
        });
    },
    // Get all players or get specific player based on the search query or club
    getPlayers() {
      this.updateSearchResults([]);
      this.pageLoading = true;
      this.$apollo
        .query({
          query: FilterRes.getPlayers(),
          variables: {
            query: "",
            club: ""
          }
        })
        .then(data => {
          this.updateSearchResults(data.data.getPlayers);
          this.pageLoading = false;
        })
        .catch(error => {
          if (error) {
            this.showNotification({
              message: error.graphQLErrors[0].message,
              error: true
            });
          }
        });
    },
    // Get player detail by email
    getPlayerByEmail(email) {
      this.$apollo
        .query({
          query: FilterRes.getPlayerByEmail(),
          variables: {
            email: email
          }
        })
        .then(data => {
          this.updateCurrentPlayer(data.data.getPlayerByEmail);
          this.$router.push("/dashboard");
        })
        .catch(error => {
          if (error) {
            this.showNotification({
              message: error.graphQLErrors[0].message,
              error: true
            });
          }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.left-column {
  width: 350px;
  margin-top: 16px;
}

.left-column-subheader {
  width: 350px;
}

.compare-option {
  width: calc(100% - 20px);
  max-height: 75%;
  max-width: 100%;
}

.compare-results {
  margin-top: 16px;
  height: 75vh;
  width: calc(100% - 350px);
  overflow: hidden;
}

.compare-chart {
  width: calc(100% - 480px);
}

.items-container {
  width: 100%;
}

h5 {
  margin: 0;
}

@media only screen and (max-width: 1200px) {
  .compare-chart {
    width: calc(100% - 420px);
  }
}
@media only screen and (max-width: 1100px) {
  .left-column {
    width: 300px;
  }
  .left-column-subheader {
    width: 300px;
  }
  .compare-results {
    width: calc(100% - 300px);
  }
}
@media only screen and (max-width: 900px) {
}
@media only screen and (max-width: 600px) {
}
</style>
