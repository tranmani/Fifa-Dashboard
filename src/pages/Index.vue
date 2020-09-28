<template>
  <q-page class="flex flex-center">
    <q-list bordered>
      <q-item
        clickable
        v-ripple
        v-for="testString in testStrings"
        :key="testString"
      >
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ testString }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
// import AxiosClient from "../remote/AxiosClient";
const axios = require("axios");

export default {
  name: "PageIndex",
  data() {
    return {
      testStrings: ["huy", "huy2"],
    };
  },
  methods: {
    getString() {
      axios({
        url: "https://fifa-dashboard-api.herokuapp.com/graphql",
        method: "post",
        data: {
          query: `
              query {
          getAllTestString {
            text
          }
        }

      `,
        },
      }).then((result) => {
        result.data.data.getAllTestString.forEach((element) => {
          this.testStrings.push(element.text);
        });
      });
    },
  },
  mounted() {
    this.getString();
  },
};
</script>

<style scoped></style>
