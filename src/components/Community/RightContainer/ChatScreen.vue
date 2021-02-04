<template>
  <q-card flat class="no-border-radius">
    <transition name="slide-left-chat-setting" mode="in-out">
      <div v-if="chatSetting" class="chat-setting">
        <ChatSetting />
      </div>
    </transition>

    <transition name="slide-up">
      <q-card flat class="no-border-radius q-pa-md" id="chart-screen-container">
        <div class="scroll-area spinner" v-if="!messagesLoaded">
          <q-spinner-puff color="primary" size="4em" />
        </div>
        <!-- <div class="scroll-area spinner" v-if="isNoChat">
          <h4 class="no-chat">
            Select a chat or create a new one
          </h4>
        </div> -->
        <q-scroll-area
          ref="scrollAreaChat"
          :thumb-style="scrollStyle"
          :bar-style="barStyle"
          class="scroll-area"
          v-else
        >
          <transition-group tag="div" name="slide-up">
            <Message
              v-for="message in messages"
              :key="message.id"
              v-bind="message"
            />
          </transition-group>
        </q-scroll-area>
        <div
          class="chat-bar"
          v-if="messagesLoaded && currentChat.hasOwnProperty('id')"
        >
          <ChatBar v-on:send-message="sendMessage" :chatName="chatName" />
        </div>
      </q-card>
    </transition>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Message from "./Message/Message";
import ChatBar from "./ChatBar";
import ChatSetting from "./ChatSetting";

export default {
  name: "ChatScreen",
  components: {
    Message,
    ChatBar,
    ChatSetting
  },
  props: {
    loaded: { type: Boolean, default: false }
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
      chatName: ""
    };
  },
  mounted() {
    this.getChatName();
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("community", [
      "pageLoaded",
      "chatSetting",
      "messages",
      "currentChat"
    ]),
    messagesLoaded() {
      return this.pageLoaded.messages;
    },
    isNoChat() {
      if (!this.currentChat.id) return true;
      else return false;
    }
  },
  watch: {
    "pageLoaded.addMessage"(val) {
      if (val) {
        setTimeout(() => {
          this.scrollToBottom(100);
        }, 150);
      }
    },
    "pageLoaded.messages"(val) {
      if (val) {
        this.getChatName();
      }
    },
    "pageLoaded.newMessage"(val) {
      if (val) {
        setTimeout(() => {
          this.scrollToBottom(100);
        }, 150);
        this.updatePageLoaded({ newMessage: false });
      }
    }
  },
  methods: {
    ...mapActions("community", ["addMessage", "updatePageLoaded"]),
    reverse(arr) {
      return arr.slice().reverse();
    },
    scrollToBottom(animate) {
      this.$refs.scrollAreaChat.setScrollPercentage(1, animate);
    },
    sendMessage(message) {
      const chat = {
        id: this.currentChat.id,
        message,
        isChannel: this.currentChat.isChannel ? true : false
      };
      this.addMessage(chat);
    },
    getChatName() {
      if (this.currentChat.isChannel) {
        this.chatName = this.currentChat.channelName;
      } else {
        if (this.currentChat.user1.email == this.user.email)
          this.chatName = this.currentChat.user2.displayName;
        else this.chatName = this.currentChat.user1.displayName;
      }
      setTimeout(() => {
        this.scrollToBottom(0);
      }, 50);
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
#chart-screen-container {
  background-color: white;
  width: 100%;
  height: 75vh;
  position: relative;
}

.scroll-area {
  height: 67vh;
  width: calc(100% - 35px);
  position: absolute;
}

.chat-bar {
  padding: 10px 0 0 60px;
  width: calc(100% - 35px);
  position: absolute;
  bottom: 16px;
}

.chat-setting {
  position: absolute;
  right: 350px;
}

.no-chat {
  user-select: none;
  color: rgb(37, 37, 37);
}

@media only screen and (max-width: 1300px) {
  .chat-setting {
    right: 300px;
  }
}
</style>
