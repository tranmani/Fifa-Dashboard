<template>
  <q-card
    flat
    class="no-border-radius"
    :class="classBasedOnProp"
    @click="$emit('choose', name)"
  >
    <div class="chat-card-item">
      <span class="q-pl-sm chat-name">{{ name }}</span>

      <div :class="unread ? 'unread' : ''"></div>
      <div v-if="picture">
        <img contain :src="model.picture" />
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    inverted: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    name: { type: String, default: "Huy huy huy" },
    picture: { type: String }
  },
  computed: {
    classBasedOnProp() {
      if (this.inverted) return "chat-card-inverted";
      else if (this.active) return "chat-card-active";
      else if (!this.active && !this.inverted) return "chat-card";
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
  transition: 0.2s;
  background-color: white;
  cursor: pointer;

  & :hover {
    background-color: $primary;
    color: white;
    transition: 0.2s;
  }
}

.chat-card-inverted {
  height: $card-height;
  width: 100%;
  margin: 0 0 6px 0;
  transition: 0.2s;
  background-color: $accent;
  cursor: pointer;

  & :hover {
    background-color: $primary;
    color: white;
    transition: 0.2s;
  }
}

.chat-card-active {
  height: $card-height;
  background-color: $primary;
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

.chat-name {
  font-size: 1.1em;
  font-weight: bold;
  user-select: none;
}
</style>
