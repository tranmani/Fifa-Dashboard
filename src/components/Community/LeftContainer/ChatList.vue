<template>
  <div class="scroll-container">
    <q-scroll-area
      :thumb-style="scrollStyle"
      :bar-style="barStyle"
      class="scroll-area"
    >
      <SearchItem
        v-for="(chat, id) in chats"
        :key="id"
        v-bind="chat"
        :picture="isChat ? chatInfo(chat, false) : ''"
        :isIndividualChat="isChat"
        :isChannel="isChannel"
        v-on:select="selectChat"
        :individualChatName="isChat ? chatInfo(chat, true) : ''"
      />
    </q-scroll-area>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchItem from "./SearchItem";
import CommunityRes from "../../../graphql/community";

export default {
  name: "ChatList",
  components: {
    SearchItem
  },
  props: {
    isChannel: { type: Boolean },
    isChat: { type: Boolean },
    chats: { type: Array, required: true }
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
  computed: {
    ...mapGetters("user", ["user"])
  },
  methods: {
    ...mapActions("community", [
      "updatePageLoaded",
      "updateChatSetting",
      "getChannelDetail",
      "getMessages"
    ]),
    selectChat(payload) {
      if (payload.isChannel) this.getChannelDetail(payload);
      else this.getMessages(payload);
      this.updateChatSetting(false);
    },
    chatInfo(chat, name) {
      if (name) {
        if (chat.user1.email == this.user.email) return chat.user2.displayName;
        else return chat.user1.displayName;
      } else {
        if (chat.user1.email == this.user.email) return chat.user2.picture;
        else return chat.user1.picture;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 28vh;
}

.scroll-area {
  height: 28vh;
}
</style>
