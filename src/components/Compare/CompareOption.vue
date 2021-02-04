<template>
  <div>
    <!-- Toggle button to change search mode between Team and Player -->
    <TeamPlayerSelect
      :loaded="loaded"
      :searchModeProp="searchModeCompare"
      v-on:search="changeSearchMode"
    />

    <div class="q-pt-md">
      <span class="text">
        {{ searchModeCompare == "team" ? "Team " : "Player " }}One</span
      >
      <TeamPlayerDropDown
        :loaded="loaded"
        :compareNr="1"
        :isResearcher="isResearcher()"
      />

      <div class="text-center q-pt-xs"><span class="text">VS</span></div>

      <span class="text"
        >{{ searchModeCompare == "team" ? "Team " : "Player " }}Two</span
      >
      <TeamPlayerDropDown
        :loaded="loaded"
        :compareNr="2"
        class="q-mb-md"
        :isResearcher="isResearcher()"
      />

      <span class="text">Filter</span>
      <q-select
        hide-bottom-space
        dense
        square
        outlined
        options-dense
        :disable="!loaded"
        bg-color="white"
        v-model="filterModelComp"
        :options="filterOptions"
      />
    </div>

    <div class="flex justify-center q-mt-md">
      <q-btn
        color="white"
        text-color="black"
        @click="$emit('download')"
        class="no-border-radius"
        style="width: 70px"
        icon="get_app"
        ><q-tooltip content-class="bg-primary"
          >Download as an image</q-tooltip
        ></q-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TeamPlayerDropDown from "./TeamPlayerDropDown";
import TeamPlayerSelect from "../Filter/TeamPlayerSelect";

export default {
  name: "CompareOption",
  components: {
    TeamPlayerDropDown,
    TeamPlayerSelect
  },
  props: {
    loaded: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters("compare", [
      "filterOptionModel",
      "filterOptions",
      "searchModeCompare"
    ]),
    ...mapGetters("user", ["user"]),
    filterModelComp: {
      get() {
        return this.filterOptionModel;
      },
      set(val) {
        this.updateFilterOptionModel(val);
      }
    }
  },
  created() {
    if (this.user.role == "Coach") this.updateSearchModeCompare("player");
  },
  methods: {
    ...mapActions("filter", [
      "updateSearchQuery",
      "emptySearchQuery",
      "updateSortOption",
      "updateFilterNumberModel",
      "updateFilterOption"
    ]),
    ...mapActions("compare", [
      "updateFilterOptionModel",
      "updateSearchModeCompare"
    ]),
    changeSearchMode(e) {
      if (this.user.role == "Researcher") this.updateSearchModeCompare(e);
      else if (this.user.role == "Coach")
        this.updateSearchModeCompare("player");
    },
    isResearcher() {
      if (this.user.role == "Researcher") return { isResearcher: true };
      else if (this.user.role == "Coach")
        return { isResearcher: false, club: this.user.club };
    }
  }
};
</script>

<style lang="scss" scope>
.text {
  user-select: none;
}
</style>
