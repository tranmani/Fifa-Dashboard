<template>
  <!-- Toggle button to change search mode between Team and Player -->
  <q-btn-toggle
    @input="changeSearchMode"
    v-model="searchModeComp"
    spread
    :disable="!loaded"
    toggle-color="secondary"
    toggle-text-color="white"
    color="white"
    text-color="black"
    class="no-border-radius shadow-7"
    :options="[
      { label: 'Team', value: 'team' },
      { label: 'Player', value: 'player' }
    ]"
  />
</template>

<script>
export default {
  name: "TeamPlayerSelect",
  props: {
    loaded: { type: Boolean, default: false },
    searchModeProp: { type: String, default: false, required: true }
  },
  data() {
    return {
      searchMode: ""
    };
  },
  mounted() {},
  computed: {
    searchModeComp: {
      get() {
        return this.searchModeProp;
      },
      set(val) {
        this.searchMode = val;
      }
    }
  },
  methods: {
    changeSearchMode() {
      this.$emit("search", this.searchMode);
    }
  }
};
</script>

<style lang="scss"></style>
