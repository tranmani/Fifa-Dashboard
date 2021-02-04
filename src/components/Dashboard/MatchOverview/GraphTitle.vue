<template>
  <div class="row justify-between items-center title">
    <h6>{{ name }}</h6>
    <span>Last Update: {{ lastUpdate }}</span>
  </div>
</template>

<script>
export default {
  name: "GraphTitle",
  props: {
    name: String,
    lastUpdate: String
  }
};
</script>

<style lang="scss" scoped>
div {
  & h6 {
    margin: 0;
  }

  & span {
    font-size: 0.85em;
  }
}

.title {
  user-select: none;
}
</style>
