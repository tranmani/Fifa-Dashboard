<template>
  <div id="match-detail-container" class="column">
    <div class="col-3 row">
      <!-- Team 1 Logo and short name -->
      <div class="col-4 flex row justify-center items-center ">
        <q-img contain :src="matchDetail.teamInfo[0].picture" class="img" />
        <span class="team-name">{{ shortName(matchDetail.teamName) }}</span>
      </div>
      <!-- Goal -->
      <div
        class="col-4 flex justify-center items-center goal-container"
        :class="matchDetail.isWin ? 'win' : 'lose'"
      >
        {{ matchDetail.goals + " - " + matchDetail.goalsOpp }}
      </div>
      <!-- Team 2 Logo and short name -->
      <div class="col-4 flex row justify-center items-center">
        <span class="team-name">{{ shortName(matchDetail.teamNameOpp) }}</span>
        <q-img
          contain
          :src="
            matchDetail.teamInfoOpp.length != 0
              ? matchDetail.teamInfoOpp[0].picture
              : defaultPic
          "
          class="img"
        />
      </div>
    </div>

    <div class="col-5 row">
      <!-- Team 1 detail -->
      <div class="col-4 flex items-end info-left column">
        <Box
          class="col q-mb-sm"
          v-for="(number, index) in team1Numbers"
          :content="number"
          :isWhite="true"
          :key="index"
        />
      </div>
      <!-- Category name -->
      <div class="col-4 flex justify-center column">
        <Box
          class="col q-mb-sm"
          v-for="category in categories"
          :content="category"
          :isWhite="false"
          :key="category"
        />
      </div>
      <!-- Team 2 detail -->
      <div class="col-4 flex items-start info-right column">
        <Box
          class="col q-mb-sm"
          v-for="(number, index) in team2Numbers"
          :content="number"
          :isWhite="true"
          :key="index"
        />
      </div>
    </div>

    <div class="col-4 row">
      <div class="col-6 flex justify-end"></div>
      <div class="col-6 flex justify-start"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Box from "./Box";

export default {
  name: "MatchDetail",
  components: { Box },
  props: {
    matchDetail: { type: Object, required: true }
  },
  data() {
    return {
      categories: [
        "SHOTS",
        "SHOTS ON TARGET",
        "POSESSSION %",
        "TACKLES",
        "FOULS",
        "CORNERS",
        "SHOT ACCURACY %",
        "PASS ACCURACY %"
      ],
      team1Numbers: [],
      team2Numbers: [],
      defaultPic:
        "https://fifadashboard.s3.eu-central-1.amazonaws.com/profile/fifa-21-logo.png"
    };
  },
  watch: {
    matchDetail(val) {
      this.team1Numbers = [
        this.matchDetail.shots,
        this.matchDetail.targetShots,
        this.matchDetail.possession,
        this.matchDetail.tackles,
        this.matchDetail.fouls,
        this.matchDetail.corners,
        this.matchDetail.shotAcc,
        this.matchDetail.passAcc
      ];
      this.team2Numbers = [
        this.matchDetail.shotsOpp,
        this.matchDetail.targetShotsOpp,
        this.matchDetail.possessionOpp,
        this.matchDetail.tacklesOpp,
        this.matchDetail.foulsOpp,
        this.matchDetail.cornersOpp,
        this.matchDetail.shotAccOpp,
        this.matchDetail.passAccOpp
      ];
    }
  },
  methods: {
    shortName(name) {
      name = name.replace(/\s/g, "");
      let newName = name.slice(0, 3);
      return newName.toUpperCase();
    }
  },
  created() {
    this.team1Numbers = [
      this.matchDetail.shots,
      this.matchDetail.targetShots,
      this.matchDetail.possession,
      this.matchDetail.tackles,
      this.matchDetail.fouls,
      this.matchDetail.corners,
      this.matchDetail.shotAcc,
      this.matchDetail.passAcc
    ];
    this.team2Numbers = [
      this.matchDetail.shotsOpp,
      this.matchDetail.targetShotsOpp,
      this.matchDetail.possessionOpp,
      this.matchDetail.tacklesOpp,
      this.matchDetail.foulsOpp,
      this.matchDetail.cornersOpp,
      this.matchDetail.shotAccOpp,
      this.matchDetail.passAccOpp
    ];
  }
};
</script>

<style lang="scss" scoped>
#match-detail-container {
  height: 75vh;
  width: 100%;
  background-color: $accent;
  padding: 0 16px;

  & .img {
    width: 40%;
    height: 40%;
  }

  & .team-name {
    font-weight: bold;
    font-size: 3em;
    padding: 0 16px;
    user-select: none;
  }

  & .goal-container {
    background: white;
    font-weight: bold;
    font-size: 5em;
    user-select: none;
  }

  & .win {
    color: $win;
  }

  & .lose {
    color: $lose;
  }

  & .info-left {
    padding-right: 16px;
  }

  & .info-right {
    padding-left: 16px;
  }
}

@media only screen and (max-width: 1520px) {
  #match-detail-container {
    & .img {
      width: 70px;
      height: 70px;
    }

    & .team-name {
      font-size: 2em;
      padding: 0 10px;
    }

    & .goal-container {
      background: white;
      font-size: 4em;
    }

    & .info-left {
      padding-right: 10px;
    }

    & .info-right {
      padding-left: 10px;
    }
  }
}

@media only screen and (max-width: 1020px) {
  #match-detail-container {
    & .team-name {
      font-size: 2em;
      padding: 0 10px;
    }

    & .goal-container {
      background: white;
      font-size: 2.5em;
    }

    & .info-left {
      padding-right: 10px;
    }

    & .info-right {
      padding-left: 10px;
    }
  }
}

@media only screen and (max-width: 745px) {
  #match-detail-container .img {
    width: 35%;
    height: 35%;
  }
}
</style>
