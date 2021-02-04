<template>
  <div class="column blur-bg" id="community-option-container">
    <transition name="zoom-in" mode="in-out">
      <div v-if="addMemberChannelCreation">
        <div class="row justify-between items-center q-pb-sm">
          <span class="text">Channels</span>
          <!-- Close button -->
          <q-btn
            dense
            size="sm"
            color="secondary"
            icon="close"
            class="no-border-radius shadow-7"
            @click="closeAddUser"
          />
        </div>

        <q-card flat class="no-border-radius q-pa-md">
          <UserSearchChannel />
        </q-card>
      </div>
    </transition>

    <div class="col-6" v-if="!addMemberChannelCreation">
      <div class="row justify-between items-center">
        <span class="text">Channels</span>
        <!-- Add and Close button -->
        <q-btn
          dense
          size="sm"
          color="secondary"
          :icon="channelCreation ? 'close' : 'add'"
          class="no-border-radius shadow-7"
          @click="openChannelCreation"
          ><q-tooltip v-if="!channelCreation" content-class="bg-primary"
            >Create New Channel</q-tooltip
          ></q-btn
        >
      </div>
      <q-separator class="q-mb-md bg-primary" />

      <div class="scroll-area spinner" v-if="!pageLoaded.channels">
        <q-spinner-puff color="primary" size="4em" />
      </div>
      <div v-else>
        <transition name="zoom-in" mode="out-in">
          <div v-if="!channelCreation" key="channels">
            <ChatList :chats="channels" :isChannel="true" />
          </div>
          <div v-else key="addChannel">
            <ChanelCreation />
          </div>
        </transition>
      </div>
    </div>

    <div class="col-6" v-if="!addMemberChannelCreation">
      <div class="row justify-between items-center">
        <span class="text">Individual Chats</span>
        <!-- Add and Close button -->
        <q-btn
          dense
          size="sm"
          color="secondary"
          :disable="!pageLoaded.chats"
          :icon="isAddChat ? 'close' : 'add'"
          class="no-border-radius shadow-7"
          @click="isAddChat = !isAddChat"
          ><q-tooltip v-if="!isAddChat" content-class="bg-primary"
            >Start New Chat</q-tooltip
          ></q-btn
        >
      </div>
      <q-separator class="q-mb-md bg-primary" />

      <div class="scroll-area spinner" v-if="!pageLoaded.chats">
        <q-spinner-puff color="primary" size="4em" />
      </div>
      <div v-else>
        <transition name="zoom-in" mode="out-in">
          <div v-if="!isAddChat" key="chats">
            <ChatList :chats="chats" :isChat="true" />
          </div>
          <div v-else key="addChat">
            <IndividualChatCreation v-on:done-create-chat="isAddChat = false" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChatList from "./ChatList";
import ChanelCreation from "./ChanelCreation";
import IndividualChatCreation from "./IndividualChatCreation";
import UserSearchChannel from "./UserSearchChannel";

export default {
  name: "CommunityOption",
  components: {
    ChatList,
    ChanelCreation,
    IndividualChatCreation,
    UserSearchChannel
  },
  data() {
    return {
      scrollStyle: {
        backgroundColor: "secondary",
        width: "6px",
        opacity: 0.75,
        right: "-11px"
      },
      isAddChannel: false,
      isAddChat: false,
      addUser: false
    };
  },
  computed: {
    ...mapGetters("community", [
      "pageLoaded",
      "channels",
      "chats",
      "addMemberChannelCreation",
      "channelCreation"
    ])
  },
  methods: {
    ...mapActions("community", [
      "updateAddMemberChannelCreation",
      "emptySelectedMembersCreate",
      "updateChannelCreation",
      "updateChannelNameCreation"
    ]),
    closeAddUser() {
      this.updateAddMemberChannelCreation(false);
      this.emptySelectedMembersCreate();
    },
    openChannelCreation() {
      if (!this.channelCreation) {
        this.updateChannelNameCreation("");
        this.emptySelectedMembersCreate();
      }
      this.updateChannelCreation(!this.channelCreation);
    }
  }
};
</script>

<style lang="scss" scoped>
#community-option-container {
  height: 75vh;
  width: 350px;
  padding: 16px;
  margin: 16px 0 0 0;
  overflow: hidden;
}

.text {
  font-size: 1.3em;
  font-weight: bold;
  user-select: none;
}

@media only screen and (max-width: 1100px) {
  #community-option-container {
    width: 300px;
  }
}
</style>
