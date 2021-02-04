<template>
  <q-card flat class="no-border-radius" id="user-search-individual-container">
    <div class="q-pb-md">
      <span class="text">Who do you want to chat with?</span>
      <UserSearch
        :isChannel="false"
        v-on:search-query="search"
        v-on:select="select"
        :searchResults="filterResults"
      />
    </div>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserSearch from "./UserSearch";
import SearchItem from "./SearchItem";

export default {
  name: "IndividualChatCreation",
  components: {
    UserSearch,
    SearchItem
  },
  data() {
    return {
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
    ...mapGetters("community", ["pageLoaded", "searchTypeCreateChat"])
  },
  watch: {
    "pageLoaded.clubs"(val) {
      if (val) {
        this.filterResults = this.searchResults;
      }
    },
    searchResults(val) {
      if (val) {
        this.filterResults = this.searchResults;
      }
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
    ...mapActions("filter", ["getClubs", "getPlayers", "updateSearchResults"]),
    ...mapActions("community", [
      "createChat",
      "updateSearchTypeCreateChat",
      "getAllUserByRole",
      "updateChatSetting"
    ]),
    search(query) {
      this.filterResults = this.searchResults.filter(
        result => result.name.toLowerCase().indexOf(query) > -1
      );
    },
    select(payload) {
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
        this.createChat({
          user1: this.user.email,
          user2: payload.info.email
        }).then(() => {
          this.$emit("done-create-chat");
          this.updateChatSetting(false);
        });
      }
    }
  },
  beforeDestroy() {
    this.updateSearchTypeCreateChat("Team");
  }
};
</script>

<style lang="scss" scoped>
#user-search-individual-container {
  width: 100%;
  padding: 16px;
}

.text {
  font-size: 1.2em;
  user-select: none;
}
</style>
