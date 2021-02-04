<template>
  <q-page class="">
    <q-table
      title="XML Objects"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import gql from "graphql-tag";

import Login from "../graphql/login";

const ALL_XML = gql`
  {
    allXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

const REAL_TIME_XML = gql`
  subscription {
    newXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

export default {
  name: "Dashboard",
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Lable name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: "xmin",
          align: "center",
          label: "X min",
          field: "xmin",
          sortable: true
        },
        {
          name: "ymin",
          align: "center",
          label: "Y min",
          field: "ymin",
          sortable: true
        },
        {
          name: "xmax",
          align: "center",
          label: "X max",
          field: "xmax",
          sortable: true
        },
        {
          name: "ymax",
          align: "center",
          label: "Y max",
          field: "ymax",
          sortable: true
        }
      ],
      data: []
    };
  },
  apollo: {
    data: {
      query: ALL_XML,
      update(data) {
        return data.allXML;
      },
      subscribeToMore: {
        document: REAL_TIME_XML,
        updateQuery: (previousResult, { subscriptionData }) => {
          if (previousResult) {
            return {
              data: previousResult.allXML.push(subscriptionData.data.newXML)
            };
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters("user", ["user", "token"])
  },
  created() {
    this.getUserByToken();
    const this_ = this;
  },
  methods: {
    ...mapActions("user", [
      "updateUser",
      "updateTokenCookie",
      "updateTokenSession",
      "logout"
    ]),
    getUserByToken() {
      this.$apollo
        .query({
          query: Login.getUserByToken(),
          variables: {
            token: this.token
          }
        })
        .then(data => {
          this.updateUser(data.data.getUserByToken);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-dashboard {
  width: 85%;
  position: fixed;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
}
</style>
