<template>
  <q-card flat class="no-border-radius skeleton">
    <q-skeleton class="bg-primary" type="rect" animation="fade" />
  </q-card>
</template>

<script>
export default {
  name: "SearchItemSkeleton"
};
</script>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  height: 25px;
}
</style>
