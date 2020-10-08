<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-date
        style="width: 600px; height: 400px"
        minimal
        landscape
        v-model="date"
        :events="events"
        :options="events"
        event-color="red"
        color="cyan"
        @click="displayDate"
      />
    </div>
  </q-page>
</template>

<script>
const axios = require("axios");
import gql from "graphql-tag";

const ALL_STRINGS = gql`
  {
    allTestText {
      text
    }
  }
`;

export default {
  name: "PageIndex",
  data() {
    return {
      date: "2020/10/08",
      events: [
        "2020/10/01",
        "2020/10/05",
        "2020/10/06",
        "2020/10/09",
        "2020/10/23",
      ],
      lorem:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.",
    };
  },
  apollo: {},
  methods: {
    dateDetail(text) {
      this.$q
        .dialog({
          title: "Date detail" + ` ${this.date}`,
          message: text,
        })
        .onOk(() => {
          this.date = "";
        })
        .onCancel(() => {
          this.date = "";
        });
    },
    displayDate() {
      this.events.forEach((element) => {
        if (element === this.date) {
          this.dateDetail(this.lorem);
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
