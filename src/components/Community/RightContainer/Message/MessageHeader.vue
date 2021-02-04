<template>
  <div class="row items-center header-container">
    <div>
      <q-avatar size="44px">
        <q-img :src="picture" style="height:44px" />
      </q-avatar>
    </div>
    <div class="sender-name q-mx-md">
      <h6>{{ name }}</h6>
    </div>
    <div>
      <span class="sender-date"> {{ timeSentToNow }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Utils from "../../../../boot/utils";

export default {
  name: "MessageHeader",
  props: {
    picture: { type: String },
    name: { type: String, default: "Huy" },
    time: { type: Number, default: 1606595497076 }
  },
  computed: {
    timeSentToNow() {
      const date = Utils.epochToDate(this.time);
      return date;
    }
  }
};
</script>

<style lang="scss" scoped>
h6 {
  margin: 0;
  font-size: 1.5em;
}

.sender-date {
  color: #313131;
  font-size: 0.9em;
  // display: none;
  margin: 2px 0 0 0;
}

// Hover to display date
// .header-container:hover {
//   & .sender-date {
//     display: block;
//   }
// }
</style>
