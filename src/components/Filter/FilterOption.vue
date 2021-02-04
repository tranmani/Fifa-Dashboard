<template>
  <div>
    <!-- Toggle button to change search mode between Team and Player -->
    <TeamPlayerSelect
      :loaded="loaded"
      :searchModeProp="searchModeFilter"
      v-on:search="changeSearchMode"
    />

    <!-- Search query field -->
    <q-input
      clearable
      clear-icon="close"
      autofocus
      outlined
      square
      debounce="100"
      standout="bg-white"
      color="white"
      bg-color="white"
      v-model="searchQueryComp"
      @clear="$emit('search', searchModeFilter)"
      @input="updateSearchQuery"
      @keyup.enter="$emit('search', searchModeFilter)"
      dense
      hide-bottom-space
      class="q-my-md"
      placeholder="Team or Player name"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    Data filter
    <!-- Filter options -->
    <div class="row" id="filter-option">
      <q-select
        class="col-md-grow"
        hide-bottom-space
        dense
        options-dense
        style="width: 165.61px"
        square
        outlined
        bg-color="white"
        v-model="filterOptionComp"
        :options="filterOptions"
      />
      <div class="col-md-1"></div>
      <q-input
        clearable
        clear-icon="close"
        outlined
        square
        no-error-icon
        debounce="70"
        type="number"
        standout="bg-white"
        v-model.number="filterModelComp"
        @clear="$emit('search', searchModeFilter)"
        @keyup.enter="$emit('search', searchModeFilter)"
        dense
        hide-bottom-space
        style="width: 70px"
        color="white"
        bg-color="white"
        placeholder="Number"
      />
    </div>

    <!-- Search button -->
    <div class="row">
      <q-btn
        color="white"
        text-color="black"
        @click="$emit('search', searchModeFilter)"
        class="col-grow no-border-radius shadow-7"
        >Search</q-btn
      >
      <div class="col-md-1"></div>
      <q-btn
        color="white"
        text-color="black"
        @click="$emit('download')"
        class="no-border-radius shadow-7"
        style="width: 70px"
        icon="get_app"
        ><q-tooltip content-class="bg-primary"
          >Export to Excel</q-tooltip
        ></q-btn
      >
    </div>

    <!-- Compare button -->
    <div class="flex flex-center q-pt-lg">
      <q-btn
        color="orange"
        text-color="black"
        to="/compare"
        class="no-border-radius shadow-7"
        icon="compare"
        label="Compare"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TeamPlayerSelect from "./TeamPlayerSelect";

export default {
  name: "FilterOption",
  components: {
    TeamPlayerSelect
  },
  props: {
    loaded: { type: Boolean, default: false }
  },
  data() {
    return {
      searchQueryComp: "",
      filterOptions: [
        "Match Win Higher Than",
        "Match Win Lower than",
        "Match Lose Higher Than",
        "Match Lose Lower Than"
      ]
    };
  },
  computed: {
    ...mapGetters("filter", [
      "searchModeFilter",
      "currentTeam",
      "searchQuery",
      "filterNumberModel",
      "filterOption"
    ]),
    ...mapGetters("user", ["user"]),
    filterModelComp: {
      get() {
        return this.filterNumberModel;
      },
      set(val) {
        this.updateFilterNumberModel(val);
      }
    },
    filterOptionComp: {
      get() {
        return this.filterOption;
      },
      set(val) {
        this.updateFilterOption(val);
      }
    }
  },
  watch: {
    searchModeFilter(val) {
      this.reset();
      this.$emit("search", this.searchModeFilter);
    },
    searchQuery(val) {
      this.searchQueryComp = val;
    }
  },
  methods: {
    ...mapActions("filter", [
      "updateSearchModeFilter",
      "updateSearchQuery",
      "emptySearchQuery",
      "updateSortOption",
      "updateFilterNumberModel",
      "updateFilterOption"
    ]),
    changeSearchMode(e) {
      this.updateSearchModeFilter(e);
    },
    reset() {
      this.emptySearchQuery();
      this.updateSortOption("Name Ascending");
      this.updateFilterNumberModel(0);
      this.updateFilterOption("Match Win Greater Than");
    }
  },
  beforeDestroy() {
    this.reset();
  }
};
</script>

<style lang="scss">
h3 {
  margin: 15px 0 30px 0;
}

#filter-option {
  margin: 0 0 16px 0;
}

.col-md-1 {
  width: 5%;
}

// Hide input number arrow
input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.q-field--dense .q-field__after,
.q-field--dense .q-field__append {
  padding-left: 0px;
}

.q-field--outlined .q-field__control {
  padding: 0 6px;
}

@media (min-width: 1024px) {
  .row > .col-md-1 {
    width: 5%;
  }
}
</style>
