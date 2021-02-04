<template>
  <div class="row items-center" id="chat-bar-container">
    <q-input
      autofocus
      outlined
      square
      dense
      standout="bg-white"
      v-model="chatMessage"
      hide-bottom-space
      bg-color="white"
      @keyup.enter="sendMessage"
      :placeholder="'Send a message to ' + chatName"
      class="col-grow"
    >
      <template v-slot:after>
        <q-btn
          dense
          unelevated
          size="15.33px"
          color="secondary"
          icon="send"
          class="no-border-radius"
          @click="sendMessage"
        />
      </template>
    </q-input>

    <q-btn
      dense
      size="15.33px"
      icon="settings"
      class="no-border-radius setting-btn shadow-7"
      @click="updateChatSetting(true)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ChatBar",
  props: {
    chatName: { type: String }
  },
  data() {
    return {
      chatMessage: ""
    };
  },
  methods: {
    ...mapActions("community", ["updateChatSetting"]),
    sendMessage() {
      this.$emit("send-message", this.chatMessage);
      this.chatMessage = "";
    }
  }
};
</script>

<style lang="scss" scoped>
#chat-bar-container {
  width: 100%;
}

.chat-input {
  width: calc(100% - 50px);
}

.setting-btn {
  background-color: white;
  color: black;
  margin-left: 15px;
}
</style>
