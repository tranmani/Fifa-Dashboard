<template>
  <q-card flat unelevated class="card q-mb-md q-pa-md q-ml-sm no-border-radius">
    <div class="row">
      <div class="q-mr-md">
        <q-skeleton height="168px" width="168px" square />
      </div>

      <div>
        <q-skeleton type="rect" width="200px" class="q-pb-sm q-mb-md" />
        <q-skeleton type="text" width="150px" class="q-pb-sm" />
        <q-skeleton type="text" width="150px" class="q-pb-sm" />
        <q-skeleton type="text" width="150px" class="q-pb-sm" />
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "SkeletonFilterResultItemList"
};
</script>

<style lang="scss" scoped>
.card {
  background-color: $primary;
  height: 200px;
}
</style>
