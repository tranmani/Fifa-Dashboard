<template>
  <q-page class="flex flex-center">
    <q-table
      title="XML Objects"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
// import AxiosClient from "../remote/AxiosClient";
const axios = require("axios");

export default {
  name: "PageIndex",
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Lable name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
        },
        {
          name: "xmin",
          align: "center",
          label: "X min",
          field: "xmin",
          sortable: true,
        },
        {
          name: "ymin",
          align: "center",
          label: "Y min",
          field: "ymin",
          sortable: true,
        },
        {
          name: "xmax",
          align: "center",
          label: "X max",
          field: "xmax",
          sortable: true,
        },
        {
          name: "ymax",
          align: "center",
          label: "Y max",
          field: "ymax",
          sortable: true,
        },
      ],
      data: [],
    };
  },
  methods: {
    getString() {
      axios({
        url: "https://fifa-dashboard-api.herokuapp.com/graphql",
        method: "post",
        data: {
          query: `
             {
              allXML {
                name
                xmin
                ymin
                xmax
                ymax
              }
            }

      `,
        },
      }).then((result) => {
        result.data.data.allXML.forEach((element) => {
          this.data.push(element);
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
