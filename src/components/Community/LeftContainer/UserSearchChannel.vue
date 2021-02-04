<template>
  <div id="user-search-channel-container">
    <div>
      <span class="text">Add Members</span>
      <UserSearch
        :isChannelCreation="true"
        :isChannel="true"
        v-on:search-query="search"
        v-on:select="addSelectedMembers"
        :searchResults="filterResults"
      />
    </div>

    <div class="q-py-xl">
      <span class="text">Selected Members</span>

      <q-scroll-area
        ref="scrollAreaCreateChannel"
        :thumb-style="scrollStyle"
        :bar-style="barStyle"
        class="scroll-area"
      >
        <transition-group tag="div" name="slide-left">
          <SearchItem
            v-for="selection in reverse(selectedMembersCreate)"
            :key="selection.id"
            v-bind="selection"
            :inverted="true"
            :selected="true"
            :isUser="true"
            v-on:unselect="unselect"
          />
        </transition-group>
      </q-scroll-area>
    </div>
    <q-btn
      dense
      color="secondary"
      class="no-border-radius q-px-md shadow-7"
      label="Add Members"
      @click="updateAddMemberChannelCreation(false)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserSearch from "./UserSearch";
import SearchItem from "./SearchItem";

export default {
  name: "UserSearchChannel",
  components: {
    UserSearch,
    SearchItem
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
      },
      filterResults: [],
      club: ""
    };
  },
  mounted() {
    this.getClubs("");
    this.filterResults = this.searchResults.filter(
      result => result.name.toLowerCase().indexOf("") > -1
    );
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("filter", ["searchResults"]),
    ...mapGetters("community", [
      "selectedMembersCreate",
      "searchTypeCreateChat"
    ])
  },
  watch: {
    "pageLoaded.clubs"(val) {
      if (val) {
        this.filterResults = this.searchResults;
      }
    },
    searchResults(val) {
      this.filterResults = this.searchResults;
    },
    searchTypeCreateChat(val) {
      if (val == "Team") {
        this.getClubs("");
      } else if (val == "Player") {
        this.getPlayers({ query: "", club: this.club });
        this.club = "";
      } else if (val == "Coach" || val == "Researcher") {
        this.getAllUserByRole(val);
        this.club = "";
      }
    }
  },
  methods: {
    ...mapActions("filter", ["getClubs", "getPlayers"]),
    ...mapActions("community", [
      "updateSearchTypeCreateChat",
      "getAllUserByRole",
      "addSelectedMembersCreate",
      "removeSelectedMembersCreate",
      "emptySelectedMembersCreate",
      "updateAddMemberChannelCreation"
    ]),
    addSelectedMembers(payload) {
      if (payload.type == "Team") {
        {
          this.club = payload.info.name;
          this.updateSearchTypeCreateChat("Player");
          this.filterResults = [];
          this.getPlayers({ query: "", club: this.club });
        }
      } else if (
        payload.type == "Player" ||
        payload.type == "Coach" ||
        payload.type == "Researcher"
      ) {
        const duplicate = this.selectedMembersCreate.some(
          e => e.id == payload.info.id
        );
        if (!duplicate) this.addSelectedMembersCreate(payload.info);
        else this.showNotification(payload.info.firstname);
        this.$refs.scrollAreaCreateChannel.setScrollPercentage(0);
      }
    },
    reverse(arr) {
      return arr.slice().reverse();
    },
    search(query) {
      this.filterResults = this.searchResults.filter(
        result => result.name.toLowerCase().indexOf(query) > -1
      );
    },
    unselect(id) {
      this.removeSelectedMembersCreate(id);
    },
    // Show error notification
    showNotification(name) {
      this.$q.notify({
        message: `${name} is already in the list`,
        color: "negative",
        icon: "o_new_releases",
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
    }
  }
};
</script>

<style lang="scss" scoped>
#user-search-channel-container {
  width: 100%;
}

.text {
  font-size: 1.2em;
  user-select: none;
}

.scroll-area {
  height: 18.5vh;
}
</style>
