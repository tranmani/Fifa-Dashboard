<template>
  <q-select
    outlined
    square
    dense
    options-dense
    v-model="model"
    use-input
    use-chips
    bg-color="white"
    input-debounce="0"
    :disable="!loaded"
    option-label="name"
    option-disable="inactive"
    emit-value
    map-options
    @input="input"
    @filter="filterFn"
    :options="options"
  >
    <!-- Show item if selected -->
    <template v-slot:selected>
      <div v-if="loaded" class="row items-center">
        <q-avatar square class="selected-avatar">
          <img contain :src="model.picture" />
        </q-avatar>
        <div>
          {{ truncate(model.name, 20) }}
        </div>
      </div>

      <!-- Spinner when page is still loading -->
      <div v-else>
        <q-spinner-dots color="primary" size="2em" />
      </div>
    </template>

    <!-- Template for options -->
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
        class="row items-center"
      >
        <q-avatar square class="option-avatar">
          <img class="option-img" contain :src="scope.opt.picture" />
        </q-avatar>
        <div>
          {{ truncate(scope.opt.name, 30) }}
        </div>
      </q-item>
    </template>

    <!-- If no result is found for the searched term -->
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          No result
        </q-item-section>
      </q-item>
    </template>

    <!-- Clear button -->
    <template v-if="model.name" v-slot:append>
      <q-icon name="close" @click.stop="clearCompare" class="cursor-pointer" />
    </template>
  </q-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Utils from "../../boot/utils";

export default {
  name: "TeamPlayerDropDown",
  props: {
    loaded: { type: Boolean, default: false },
    compareNr: { type: Number, required: true },
    isResearcher: { type: Object, required: true }
  },
  data() {
    return {
      model: { name: "", picture: "" },
      options: [],
      lastItem: {},
      searchModeChanged: false
    };
  },
  computed: {
    ...mapGetters("filter", ["searchResults"]),
    ...mapGetters("compare", [
      "searchModeCompare",
      "compareOne",
      "compareTwo",
      "compareThree",
      "compareFour"
    ])
  },
  watch: {
    loaded(val) {
      if (val) {
        if (this.compareNr == 1) {
          this.model = this.compareOne;
          if (this.compareOne.name) {
            this.addInactiveToSearchResults(this.compareOne.name);
          }
        } else if (this.compareNr == 2) {
          this.model = this.compareTwo;
          if (this.compareTwo.name) {
            this.addInactiveToSearchResults(this.compareTwo.name);
          }
        } else if (this.compareNr == 3) {
          this.model = this.compareThree;
          if (this.compareThree.name) {
            if (!this.searchModeChanged)
              this.addInactiveToSearchResults(this.compareThree.name);
          }
        } else if (this.compareNr == 4) {
          this.model = this.compareFour;
          if (this.compareFour.name) {
            if (!this.searchModeChanged)
              this.addInactiveToSearchResults(this.compareFour.name);
          }
        }

        this.filterPlayer();
        this.lastItem = this.model;

        if (
          (this.compareOne.__typename == "User" &&
            this.searchModeCompare == "team") ||
          (this.compareOne.__typename == "Club" &&
            this.searchModeCompare == "player")
        ) {
          this.resetCompare(1);
          this.resetCompare(2);
          this.resetCompare(3);
          this.resetCompare(4);
        }
      }
    },
    searchModeCompare(val) {
      this.searchModeChanged = true;
      this.resetCompare();
    }
  },
  mounted() {},
  methods: {
    ...mapActions("compare", [
      "updateCompareOne",
      "updateCompareTwo",
      "updateCompareThree",
      "updateCompareFour",
      "resetCompare"
    ]),
    ...mapActions("filter", [
      "addInactiveToSearchResults",
      "removeInactiveFromSearchResults"
    ]),
    // Filter function for the input
    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterPlayer();
        } else {
          const typed = val.toLowerCase();
          this.options = this.searchResults.filter(
            e => e.name.toLowerCase().indexOf(typed) > -1
          );
        }
      });
    },
    // Chosen item
    input(val) {
      if (this.compareNr == 1) {
        this.updateCompareOne(val);
      } else if (this.compareNr == 2) {
        this.updateCompareTwo(val);
      } else if (this.compareNr == 3) {
        this.updateCompareThree(val);
      } else if (this.compareNr == 4) {
        this.updateCompareFour(val);
      }
      // Disable item
      this.addInactiveToSearchResults(val.name);
      // Set inactive state of the last item to false
      if (this.lastItem.name) {
        this.removeInactiveFromSearchResults(this.lastItem.name);
      }
      this.lastItem = val;
    },
    // Called whn press clear button
    clearCompare() {
      if (this.lastItem.name) {
        this.removeInactiveFromSearchResults(this.lastItem.name);
      } else {
        this.removeInactiveFromSearchResults(this.model.name);
      }
      if (this.compareNr == 1) {
        this.resetCompare(1);
        this.model = this.compareOne;
      } else if (this.compareNr == 2) {
        this.resetCompare(2);
        this.model = this.compareTwo;
      } else if (this.compareNr == 3) {
        this.resetCompare(3);
        this.model = this.compareThree;
      } else if (this.compareNr == 4) {
        this.resetCompare(4);
        this.model = this.compareFour;
      }
    },
    // Only show player from a specific club
    filterPlayer() {
      if (this.isResearcher.isResearcher) {
        this.options = this.searchResults;
      } else {
        this.options = this.searchResults.filter(
          result => result.club == this.isResearcher.club
        );
      }
    },
    truncate(text, length) {
      if (text) return Utils.truncate(text, length);
      else return;
    }
  }
};
</script>

<style lang="scss">
.q-chip {
  margin: 0;
}

.selected-avatar {
  height: 23px;
  width: 23px;
  margin-right: 5px;
}

.option-avatar {
  height: 30px;
  width: 30px;
}

.option-img {
  padding: 3px;
}

.q-field--outlined .q-field__control {
  padding: 0 8px;
}

.q-field__native,
.q-field__prefix,
.q-field__suffix,
.q-field__input {
  padding: 0;
}
</style>
