<template>
  <q-card
    class="item-list-card q-mb-md q-pa-md q-ml-sm no-border-radius"
    @click="
      searchModeFilter == `team`
        ? $emit('search-list', { name, picture })
        : $emit('detail-list', email)
    "
  >
    <div class="row">
      <div class="flex justify-start team-img q-mr-md">
        <q-img
          contain
          :ratio="1"
          :src="picture"
          style="width: 168px; max-height: 168px;"
        ></q-img>
      </div>

      <!-- Team Info -->
      <div class="team-info" v-if="searchModeFilter == `team`">
        <h4 class="team-name">{{ truncate(name) }}</h4>
        <div>
          <h6>
            <span class="win-lose-number">{{ totalWins }} </span>
            <span class="win-text q-mr-sm">Wins </span>
            <span class="win-lose-number">{{ totalLoses }} </span>
            <span class="lose-text">Loses</span>
          </h6>
        </div>
        <h5>
          <span class="coach">Coach: </span>
          <span>{{ coachFirstname + " " + coachLastname }} </span>
        </h5>
        <h5>
          <span class="players">Players: </span>
          <span>{{ players.length }} </span>
        </h5>
      </div>

      <!-- Player Info -->
      <div class="team-info" v-if="searchModeFilter == `player`">
        <h4 class="team-name">
          {{ truncate(firstname + ` ` + lastname) }}
        </h4>
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
        <!-- Only display coach and team name when viewing player -->
        <div v-if="!currentTeam.name">
          <h5>
            <span class="coach">Coach: </span>
            <span>{{ coach }} </span>
          </h5>
          <h5>
            <span class="coach">Team: </span>
            <span>{{ club }} </span>
          </h5>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FilterResultItemList",
  props: {
    email: String,
    name: String,
    coachEmail: String,
    coachFirstname: String,
    coachLastname: String,
    firstname: String,
    lastname: String,
    picture: String,
    coach: String,
    club: String,
    totalWins: Number,
    totalLoses: Number,
    winlose: Array,
    players: Array
  },
  computed: {
    ...mapGetters("filter", ["searchModeFilter", "currentTeam"])
  },
  data() {
    return {
      localWinLose: [{ wins: 0, loses: 0 }]
    };
  },
  created() {
    if (this.searchModeFilter == "player") {
      if (this.winlose.length == 0 || !this.winlose) {
        this.localWinLose = [{ wins: 0, loses: 0 }];
      } else this.localWinLose = this.winlose;
    }
  },
  methods: {
    truncate(text) {
      if (text.length > 30) {
        return text.substring(0, length) + "...";
      } else {
        return text;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item-list-card {
  height: 200px;
  box-shadow: none;
  cursor: pointer;
  background-color: white;
  transition: scaleY 0.15s ease-out, transform 0.4s ease-out;
  user-select: none;
}

.item-list-card:hover {
  transition: all 0.15s ease-in;
  background-color: $lightPrimary;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  .win-lose-number,
  h6,
  h5,
  h4 {
    color: white;
  }
}

.item-list-card:active {
  transform: scaleY(0.95);
  transition: all 0.15s ease-in-out;
}

.win-lose-container {
  height: 30px;
}

.win-text .lose-text {
  text-transform: uppercase;
}

.win-lose-number {
  font-size: 1.3em;
  margin: 0;
}

h4 {
  margin: 0 0 5px 0;
  font-size: 1.6em;
  // text-transform: uppercase;
  // font-weight: bold;
  color: black;
}

h5 {
  margin: 0;
  color: black;
  font-size: 1em;
}

h6 {
  margin: 0;
  color: black;
  font-size: 1em;
}

.coach,
.players {
  font-size: 1.1em;
  // font-weight: bold;
}

@media only screen and (max-width: 1920px) {
  .team-img {
    max-width: 25%;
  }

  .team-info {
    max-width: 75%;
  }
}

@media only screen and (max-width: 1200px) {
  .team-img {
    max-width: 35%;
  }

  .team-info {
    max-width: 65%;
  }
}

@media only screen and (max-width: 600px) {
  .team-img {
    max-width: 40%;
  }

  .team-info {
    max-width: 60%;
  }
}
</style>
