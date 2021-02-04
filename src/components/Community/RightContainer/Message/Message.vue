<template>
  <div id="message-container">
    <MessageHeader :name="displayName" :time="time" :picture="getPicture" />
    <div class="message">
      <div v-for="message in messages" :key="message.id">
        <span class="message-time"> {{ timeSent(message.time) }}</span>

        <p class="message-detail">{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MessageHeader from "./MessageHeader";
import Utils from "../../../../boot/utils";

export default {
  name: "Message",
  components: {
    MessageHeader
  },
  props: {
    messages: { type: Array },
    displayName: { type: String },
    time: { type: Number },
    sender: { type: String }
  },
  computed: {
    ...mapGetters("community", ["currentChat"]),
    getPicture() {
      if (this.currentChat.isChannel) {
        if (this.sender == this.currentChat.owner.email) {
          return this.currentChat.owner.picture;
        } else {
          const user = this.currentChat.users.find(e => e.email == this.sender);
          return user.picture;
        }
      } else {
        if (this.sender == this.currentChat.user1.email)
          return this.currentChat.user1.picture;
        else if (this.sender == this.currentChat.user2.email)
          return this.currentChat.user2.picture;
      }
    }
  },
  methods: {
    ...mapActions("community", []),
    timeSent(time) {
      return Utils.epochToTime(time);
    }
  }
};
</script>

<style lang="scss" scoped>
#message-container {
  margin: 7px 0;
}

.message {
  margin: 0 0 5px 60px;
  color: black;
  font-size: 1.1em;

  & :hover .message-time {
    display: block;
  }
}

p {
  margin: 2px 0 0 0;
}

.message-time {
  color: #313131;
  font-size: 0.7em;
  margin: 5px 0 0 -55px;
  position: absolute;
  display: none;
}
</style>
