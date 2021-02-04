<template>
  <div
    class="item-grid-card q-pa-md"
    @click="
      searchMode == `team`
        ? $emit('search-grid', { name, picture })
        : $emit('detail-grid', email)
    "
  >
    <div class="col">
      <div class="q-mt-md q-pb-xs flex justify-center">
        <q-img contain :ratio="1" :src="picture" class="img"></q-img>
      </div>

      <!-- Team Info -->
      <div v-if="searchMode == `team`">
        <h5 class="team-name">{{ truncate(name) }}</h5>
        <div>
          <h6>
            <span class="win-lose-number">{{ totalWins }} </span>
            <span class="win-text q-pr-sm">Wins </span>
            <span class="win-lose-number">{{ totalLoses }} </span>
            <span class="lose-text">Loses</span>
          </h6>
        </div>
      </div>

      <!-- Player Info -->
      <div v-if="searchMode == `player`">
        <h5 class="team-name">
          {{ truncate(firstname + ` ` + lastname) }}
        </h5>
        <div>
          <h6>
            <span class="win-lose-number"
              >{{ localWinLose[localWinLose.length - 1].wins }}
            </span>
            <span class="win-text q-mr-sm">Wins </span>
            <span class="win-lose-number"
              >{{ localWinLose[localWinLose.length - 1].loses }}
            </span>
            <span class="lose-text">Loses</span>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterResultItemGrid",
  props: {
    email: String,
    name: String,
    coach: String,
    firstname: String,
    lastname: String,
    picture: String,
    totalWins: Number,
    totalLoses: Number,
    winlose: Array,
    players: Array,
    searchMode: String
  },
  data() {
    return {
      localWinLose: [{ wins: 0, loses: 0 }]
    };
  },
  created() {
    if (this.searchMode == "player") {
      if (this.winlose.length == 0) {
        this.localWinLose = [{ wins: 0, loses: 0 }];
      } else this.localWinLose = this.winlose;
    }
  },
  methods: {
    truncate(text) {
      if (text.length > 17) {
        return text.substring(0, 17) + "...";
      } else {
        return text;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item-grid-card {
  height: 280px;
  width: 220px;
  box-shadow: none;
  cursor: pointer;
  // background-color: white;
  background-image: url("https://fifadashboard.s3.eu-central-1.amazonaws.com/bg-grid.png");
  transition: scale 0.15s ease-out, transform 0.4s ease-out;
  user-select: none;
}

.item-grid-card:hover {
  transition: all 0.15s ease-in;
  filter: drop-shadow(0 10px 9px rgba(220, 20, 60, 0.452));
}

.item-grid-card:active {
  transform: scale(0.95);
  filter: drop-shadow(0 10px 9px crimson);
  transition: all 0.15s ease-in-out;
}

.win-lose-container {
  height: 30px;
}

.win-text .lose-text {
  text-transform: uppercase;
  font-weight: bold;
}

.win-lose-number {
  font-size: 1.3em;
  font-weight: 900;
  margin: 0;
}

h5 {
  margin: 0;
  // text-transform: uppercase;
  // font-weight: bold;
  text-align: center;
  color: black;
  font-size: 1.3em;
}

h6 {
  margin: 0;
  color: black;
  font-size: 1em;
  text-align: center;
}

.img {
  width: 135px;
  height: 135px;
}

@media only screen and (max-width: 1200px) {
  .img {
    width: 158px;
    height: 158px;
  }

  .item-grid-card {
    height: 250px;
    width: 190px;
  }
}
</style>
