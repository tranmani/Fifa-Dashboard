<template>
  <div id="user-search-chat-setting-container">
    <div>
      <span class="text">Add Members</span>
      <UserSearch
        :isChannelCreation="false"
        :isChannel="true"
        v-on:search-query="search"
        v-on:select="addSelectedMembers"
        :searchResults="filterResults"
      />
    </div>

    <div class="q-pt-sm q-pb-xs">
      <span class="text">Selected Members</span>

      <q-scroll-area
        ref="scrollAreaCreateChannel"
        :thumb-style="scrollStyle"
        :bar-style="barStyle"
        class="scroll-area"
      >
        <transition-group tag="div" name="slide-left">
          <SearchItem
            v-for="selection in reverse(selectedMembersSetting)"
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
      class="no-border-radius q-px-md"
      label="Add Members"
      @click="addMembers"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserSearch from "../LeftContainer/UserSearch";
import SearchItem from "../LeftContainer/SearchItem";

export default {
  name: "UserSearchChatSetting",
  components: {
    UserSearch,
    SearchItem
  },
  props: {
    members: { type: Array, required: true }
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
      "selectedMembersSetting",
      "searchTypeSetting",
      "currentChat"
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
    searchTypeSetting(val) {
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
      "updateSearchTypeSetting",
      "getAllUserByRole",
      "addSelectedMembersSetting",
      "removeSelectedMembersSetting",
      "emptySelectedMembersSetting",
      "updateAddMemberSetting",
      "addMembersToChannel"
    ]),
    addSelectedMembers(payload) {
      if (payload.type == "Team") {
        {
          this.club = payload.info.name;
          this.updateSearchTypeSetting("Player");
          this.filterResults = [];
          this.getPlayers({ query: "", club: this.club });
        }
      } else if (
        payload.type == "Player" ||
        payload.type == "Coach" ||
        payload.type == "Researcher"
      ) {
        // Check for duplication from selected users and current members
        const duplicate = this.selectedMembersSetting.some(
          e => e.id == payload.info.id
        );
        const duplicateCurrentMember = this.members.some(
          e => e == payload.info.email
        );
        if (!duplicate && !duplicateCurrentMember)
          this.addSelectedMembersSetting(payload.info);
        else {
          if (duplicateCurrentMember)
            this.showNotification(payload.info.firstname, true);
          else this.showNotification(payload.info.firstname);
        }
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
      this.removeSelectedMembersSetting(id);
    },
    addMembers() {
      this.addMembersToChannel({
        id: this.currentChat.id,
        users: this.selectedMembersSetting.map(e => e.email)
      }).then(() => {
        this.updateAddMemberSetting(false);
        this.emptySelectedMembersSetting();
      });
    },
    // Show error notification
    showNotification(name, duplicate) {
      let message;
      if (duplicate) message = `${name} is already a member of this channel`;
      else message = `${name} is already in the list`;
      this.$q.notify({
        message: message,
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
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
#user-search-chat-setting-container {
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
