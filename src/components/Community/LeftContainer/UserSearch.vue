<template>
  <div>
    <div class="row">
      <div class="user-input-field">
        <q-input
          clearable
          clear-icon="close"
          autofocus
          outlined
          square
          dense
          debounce="100"
          standout="bg-accent"
          v-model="searchModel"
          @clear="searchModel = ''"
          hide-bottom-space
          color="accent"
          bg-color="accent"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="search-type">
        <q-select
          dense
          filled
          square
          options-dense
          hide-dropdown-icon
          bg-color="accent"
          v-model="type"
          class=""
          :options="['Team', 'Player', 'Coach', 'Researcher']"
        />
      </div>
    </div>
    <div class="q-pt-sm">
      <q-scroll-area
        :thumb-style="scrollStyle"
        :bar-style="barStyle"
        :class="isChannel ? 'scroll-area' : 'scroll-area-individual'"
      >
        <div v-if="isLoaded">
          <transition-group tag="div" name="filter-list">
            <SearchItem
              v-for="result in searchResults"
              :key="result.id"
              v-bind="result"
              :inverted="true"
              :isUser="true"
              v-on:select="selectUser(result)"
            />
          </transition-group>
        </div>
        <div v-else>
          <SearchItemSkeleton v-for="skeleton in 10" :key="skeleton" />
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchItem from "./SearchItem";
import SearchItemSkeleton from "./SearchItemSkeleton";

export default {
  name: "UserSearch",
  components: {
    SearchItem,
    SearchItemSkeleton
  },
  props: {
    searchResults: { type: Array, required: true },
    isChannel: { type: Boolean, default: true },
    isChannelCreation: { type: Boolean, default: true }
  },
  data() {
    return {
      searchTypeModel: "Team",
      searchModel: "",
      scrollStyle: {
        backgroundColor: "secondary",
        width: "6px",
        opacity: 0.75,
        right: "-11px"
      },
      barStyle: {
        right: "-11px"
      }
    };
  },
  computed: {
    ...mapGetters("community", [
      "pageLoaded",
      "searchTypeCreateChat",
      "searchTypeSetting"
    ]),
    type: {
      get() {
        if (this.isChannelCreation) return this.searchTypeCreateChat;
        else return this.searchTypeSetting;
      },
      set(val) {
        if (this.isChannelCreation) this.updateSearchTypeCreateChat(val);
        else this.updateSearchTypeSetting(val);
      }
    },
    isLoaded() {
      let searchType;
      if (this.isChannelCreation) searchType = this.searchTypeCreateChat;
      else searchType = this.searchTypeSetting;

      if (searchType == "Team") {
        if (this.pageLoaded.clubs) return true;
        else return false;
      } else if (searchType == "Player") {
        if (this.pageLoaded.players) return true;
        else return false;
      } else if (searchType == "Coach") {
        if (this.pageLoaded.coaches) return true;
        else return false;
      } else if (searchType == "Researcher") {
        if (this.pageLoaded.researchers) return true;
        else return false;
      }
    }
  },
  watch: {
    searchModel(val) {
      this.$emit("search-query", val);
    }
  },
  methods: {
    ...mapActions("community", [
      "updateSearchTypeCreateChat",
      "updateSearchTypeSetting"
    ]),
    selectUser(payload) {
      if (this.isChannel) {
        if (this.isChannelCreation)
          this.$emit("select", {
            type: this.searchTypeCreateChat,
            info: payload
          });
        else
          this.$emit("select", {
            type: this.searchTypeSetting,
            info: payload
          });
      } else {
        this.$emit("select", {
          type: this.searchTypeCreateChat,
          info: payload
        });
      }
    }
  },
  beforeDestroy() {
    if (this.isChannelCreation) this.updateSearchTypeCreateChat("Team");
    else this.updateSearchTypeSetting("Team");
  }
};
</script>

<style lang="scss" scoped>
.user-input-field {
  width: calc(100% - 100px);

  padding: 0 10px 0 0;
}

.search-type {
  width: 100px;
}

.scroll-area {
  height: 18.5vh;
}

.scroll-area-individual {
  height: 15.5vh;
}
</style>
