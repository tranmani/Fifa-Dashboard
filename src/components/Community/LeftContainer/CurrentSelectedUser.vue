<template>
  <q-card flat class="no-border-radius selected-user-card">
    {{ truncate(name) }}
  </q-card>
</template>

<script>
import Utils from "../../../boot/utils";

export default {
  name: "CurrentSelectedUser",
  props: {
    name: { type: String }
  },
  methods: {
    truncate(text) {
      if (text.length > 10) {
        return text.substring(0, 10) + "...";
      } else {
        return text;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$card-height: 20px;

.selected-user-card {
  height: $card-height;
  width: calc(271px / 3);
  padding: 0 3px;
  margin: 0 5px 5px 0;
  background-color: $accent;
  cursor: pointer;
  text-align: center;
  user-select: none;
  overflow: hidden;
}
</style>
