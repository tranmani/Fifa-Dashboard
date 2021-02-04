<template>
  <q-card
    flat
    class="no-border-radius"
    :class="classBasedOnProp"
    @click="select"
  >
    <div class="chat-card-item">
      <q-img :src="picture" class="img" v-if="picture" />
      <span class="q-pl-sm chat-name">
        {{ itemName }}
      </span>
      <q-space />
      <div :class="unread ? 'unread' : ''"></div>
      <div v-if="isChatSetting">
        <q-btn
          dense
          unelevated
          size="sm"
          color="secondary"
          icon="close"
          class="no-border-radius close-btn"
          @click="$emit('remove-member', email)"
          ><q-tooltip content-class="bg-primary"
            >Remove member</q-tooltip
          ></q-btn
        >
      </div>
      <div v-if="selected">
        <q-btn
          dense
          unelevated
          size="sm"
          color="secondary"
          icon="close"
          class="no-border-radius close-btn"
          @click="$emit('unselect', id)"
        />
      </div>
      <div v-if="leaveChannel">
        <q-btn
          :ripple="false"
          dense
          unelevated
          size="sm"
          color="secondary"
          icon="arrow_right_alt"
          class="no-border-radius"
          @click="$emit('leave-channel')"
        />
      </div>
      <div v-if="deleteChat">
        <q-btn
          :ripple="false"
          dense
          unelevated
          size="sm"
          color="secondary"
          icon="arrow_right_alt"
          class="no-border-radius"
          @click="$emit('delete-chat')"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SearchItem",
  components: {},
  props: {
    inverted: { type: Boolean, default: false },
    unread: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    leaveChannel: { type: Boolean, default: false },
    deleteChat: { type: Boolean, default: false },
    name: { type: String },
    displayName: { type: String },
    email: { type: String },
    id: { type: String },
    channelName: { type: String },
    individualChatName: { type: String },
    isChannel: { type: Boolean, default: false },
    isIndividualChat: { type: Boolean, default: false },
    isUser: { type: Boolean, default: false },
    isChatSetting: { type: Boolean, default: false },
    picture: { type: String }
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {
    if (this.currentChat.id == this.id) this.active = true;
    else this.active = false;
  },
  computed: {
    ...mapGetters("community", ["currentChat"]),
    ...mapGetters("user", ["user"]),
    classBasedOnProp() {
      if (this.inverted || this.leaveChannel || this.deleteChat)
        return "chat-card-inverted";
      else if (this.active) return "chat-card-active";
      else if (!this.active && !this.inverted) return "chat-card";
    },
    itemName() {
      if (this.isChannel) return this.channelName;
      if (this.isIndividualChat) return this.individualChatName;
      if (this.isUser) return this.name || this.displayName;
      if (this.leaveChannel) return "Leave Channel";
      if (this.deleteChat) return "Delete Chat";
    }
  },
  watch: {
    "currentChat.id"(val) {
      if (val == this.id) this.active = true;
      else this.active = false;
    }
  },
  methods: {
    select(e) {
      if (this.isChannel) {
        this.$emit("select", { id: this.id, isChannel: true });
      }
      if (this.isIndividualChat) {
        this.$emit("select", { id: this.id, isChannel: false });
      }
      if (this.isUser) {
        this.$emit("select", this.email);
      }
      if (this.leaveChannel) {
        this.$emit("leave-channel");
      }
      if (this.deleteChat) {
        this.$emit("delete-chat");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$card-height: 25px;

.chat-card {
  height: $card-height;
  width: 100%;
  margin: 0 0 6px 0;
  transition: all 0.2s linear;
  background-color: white;
  cursor: pointer;
}

.chat-card:hover {
  background-image: $secondary;
  color: white;
  transition: 0.2s;
}

.chat-card-inverted {
  height: $card-height;
  width: 100%;
  margin: 0 0 6px 0;
  transition: 0.2s;
  background-color: $accent;
  cursor: pointer;
}

.chat-card-inverted:hover {
  background-image: $secondary;
  color: white;
  transition: 0.2s;
}

.chat-card-active {
  height: $card-height;
  background-image: $secondary;
  color: white;
  width: 100%;
  margin: 0 0 6px 0;
}

.chat-card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $card-height;
}

.close-btn {
  width: $card-height;
  height: $card-height;
}

.unread {
  width: 10px;
  height: $card-height;
  background-color: $primary;
}

.chat-name {
  font-size: 1.1em;
  font-weight: bold;
  user-select: none;
}

.chat-card-item .img {
  width: $card-height;
  height: $card-height;
  z-index: $card-height;
}
</style>
