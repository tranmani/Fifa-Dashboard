<template>
  <div
    id="match-container"
    class="row"
    :class="isActive ? 'active' : 'not-active'"
    @click="$emit('selectMatch', id)"
  >
    <div class="col-8 row team items-center justify-center">
      <!-- Picture team 1 -->
      <div class="col-3 flex items-center justify-end">
        <q-img contain :src="team1Pic" class="img"></q-img>
      </div>
      <div class="col-6 column">
        <div class="col-9 flex items-center justify-center">
          <!-- Team 1 name -->
          <span class="team-name">
            {{ shortName(team1) + " " }}
          </span>
          <span class="minus-symbol">
            -
          </span>
          <!-- Team 2 name -->
          <span class="team-name">
            {{ " " + shortName(team2) }}
          </span>
        </div>
        <!-- Time -->
        <div class="col-3 time">{{ Utils.epochToDate(time) }}</div>
      </div>

      <!-- Picture team 2 -->
      <div class="col-3 flex items-center justify-start">
        <q-img contain :src="team2Pic" class="img"></q-img>
      </div>

      <!-- Team info -->
    </div>
    <!-- Goal -->
    <div
      class="col-4 goal flex items-center justify-center"
      :class="isWin ? 'goal-win' : 'goal-lose'"
    >
      {{ goal1 + " - " + goal2 }}
    </div>
  </div>
</template>

<script>
import Utils from "../../../boot/utils";

export default {
  name: "Match",
  props: {
    id: { type: String, required: true },
    team1: { type: String, required: true },
    team1Pic: {
      type: String,
      required: true
    },
    goal1: { type: Number, required: true },
    team2: { type: String, required: true },
    team2Pic: {
      type: String,
      required: true,
      default:
        "https://fifadashboard.s3.eu-central-1.amazonaws.com/profile/fifa-21-logo.png"
    },
    goal2: { type: Number, required: true },
    time: { type: Number, required: true },
    isWin: { type: Boolean, required: true, default: true },
    isActive: { type: Boolean, required: true, default: false }
  },
  data() {
    return {
      Utils: Utils
    };
  },
  methods: {
    shortName(name) {
      name = name.replace(/\s/g, "");
      let newName = name.slice(0, 3);
      return newName.toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
#match-container {
  height: 50px;
  width: 100%;
  transition: all 0.1s ease;

  & .team {
    & .img {
      width: 45px;
      height: 45px;
    }

    & .team-name,
    .minus-symbol {
      font-weight: bold;
      font-size: 1.2em;
    }

    & .team-name {
      margin: 0 5px;
    }
  }

  & .time {
    text-align: center;
    font-size: 0.8em;
  }

  & .goal {
    background: $primary;
    font-weight: bold;
    font-size: 1.4em;
  }

  & .goal-win {
    color: $win;
  }

  & .goal-lose {
    color: $lose;
  }
}

.not-active {
  background: $accent;
}

#match-container:hover,
.active {
  cursor: pointer;
  background: $primary;
  transition: all 0.1s ease;

  & .time,
  .team-name,
  .minus-symbol {
    color: white;
    transition: all 0.1s ease;
  }
}

@media only screen and (max-width: 1500px) {
  #match-container .team .img {
    width: 35px;
    height: 35px;
  }

  #match-container .team .team-name,
  .minus-symbol {
    font-size: 1em;
  }

  #match-container .team .team-name {
    margin: 0 2px;
  }
}

@media only screen and (max-width: 900px) {
  #match-container .team .img {
    width: 28px;
    height: 28px;
  }

  #match-container .team .team-name,
  .minus-symbol {
    font-size: 0.9em;
  }

  #match-container .team .team-name {
    margin: 0 1px;
  }
}
</style>
