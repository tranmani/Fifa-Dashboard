<template>
  <q-page>
    <!-- Filter sub-header, sort option, change grid and list view -->
    <div class="row items-center">
      <div class="left-column-subheader">
        <h5>Community</h5>
      </div>
    </div>

    <div class="row justify-between">
      <!-- Filter options -->
      <CommunityOption />

      <q-card flat class="right-column no-border-radius bg-page">
        <ChatScreen />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CommunityOption from "../components/Community/LeftContainer/CommunityOption";
import ChatScreen from "../components/Community/RightContainer/ChatScreen";

import LoginRes from "../graphql/login";
import FilterRes from "../graphql/filter";
import CommunityRes from "../graphql/community";
import Utils from "../boot/utils";
import gql from "graphql-tag";

const NEW_CHANNEL = gql`
  subscription {
    newChannel {
      id
      owner {
        email
        displayName
      }
      users {
        email
        displayName
      }
    }
  }
`;

export default {
  name: "ComparePage",
  components: {
    CommunityOption,
    ChatScreen
  },
  data() {
    return {
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
    ...mapGetters("community", [
      "pageLoaded",
      "channels",
      "chats",
      "messages",
      "currentChat"
    ])
  },
  created() {
    this.updateCurrentTeam({});
    this.getClubs("");
    this.getChats({ info: this.user.chats, type: "replace" });
    this._this = this;
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
  apollo: {
    $subscribe: {
      newMessage: {
        query: CommunityRes.subscribeNewMessage(),
        variables() {
          return {
            id: this.currentChat.id
          };
        },
        result({ data }) {
          if (this.user.email != data.newMessage.sender) {
            this.addMessageFromSubscription(data.newMessage);
          }
          this.updatePageLoaded({ newMessage: true });
        }
      }
    }
  },
  methods: {
    ...mapActions("community", [
      "updatePageLoaded",
      "getChannels",
      "getChats",
      "getMessages",
      "updateChannels",
      "addNewMessage",
      "addMessageFromSubscription"
    ]),
    ...mapActions("filter", [
      "updateSearchQuery",
      "updateSearchResults",
      "updateCurrentTeam",
      "getClubs",
      "getPlayers"
    ]),
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
.left-column-subheader {
  width: 350px;
}

.right-column {
  margin-top: 16px;
  height: 75vh;
  width: calc(100% - 370px);
  overflow: hidden;
}

h5 {
  margin: 0;
}

@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 1100px) {
  .left-column {
    width: 300px;
  }
  .left-column-subheader {
    width: 300px;
  }
  .right-column {
    width: calc(100% - 320px);
  }
}
@media only screen and (max-width: 900px) {
}
@media only screen and (max-width: 600px) {
}
</style>
