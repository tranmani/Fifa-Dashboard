<template>
  <q-card color="gray" class="card">
    <q-card-section class="card-section"> </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "LoginForm",
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("pokemon", ["card", "mobile"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("pokemon", ["addFavorite"]),
  },
  created() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.card {
  width: 280px;
  padding: 5px;
  margin: 25px;
  transition: 0.25s;
}

@media only screen and (max-width: 600px) {
}
</style>
