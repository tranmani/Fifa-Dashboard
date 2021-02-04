<template>
  <q-card flat unelevated class="card q-pa-md no-border-radius">
    <div class="col">
      <div class="q-mr-md q-pb-md">
        <q-skeleton class="square" square />
      </div>

      <div class="column items-center">
        <div v-if="!isCompare">
          <q-skeleton type="rect" width="120px" class="q-pb-sm" />
          <q-skeleton type="text" width="100px" class="q-pb-sm" />
        </div>
        <div v-else>
          <h5>Choose one</h5>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: { isCompare: { type: Boolean, default: false } },
  name: "SkeletonFilterResultItemGrid"
};
</script>

<style lang="scss" scoped>
.card {
  background-color: $primary;
  height: 280px;
  width: 220px;
}

.square {
  height: 188px;
  width: 188px;
}

h5 {
  margin: 0;
  color: white;
  font-weight: 400;
  user-select: none;
}

@media only screen and (max-width: 1200px) {
  .card {
    background-color: $primary;
    height: 250px;
    width: 190px;
  }

  .square {
    height: 158px;
    width: 158px;
  }
}
</style>
