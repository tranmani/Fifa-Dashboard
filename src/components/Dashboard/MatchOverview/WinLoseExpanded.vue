<template>
  <div class="row q-pt-md items-center justify-center">
    <div class="col-3">
      <h2>{{ currentWin }}</h2>
    </div>

    <div class="col-3">
      <div class="column">
        <div class="col-6">
          <p class="winlose-text">WINS</p>
        </div>
        <div class="col-6 text-center">
          <span class="win-text">+{{ winDiff.toFixed(2) }}%</span>
        </div>
      </div>
    </div>

    <div class="col-3">
      <h2>{{ currentLose }}</h2>
    </div>

    <div class="col-3">
      <div class="column">
        <div class="col-6">
          <p class="winlose-text">LOSES</p>
        </div>
        <div class="col-6 text-center">
          <span class="lose-text">+{{ loseDiff.toFixed(2) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "WinLoseExpanded",
  props: {
    currentWin: Number,
    currentLose: Number,
    oldWin: { type: Number, default: 0 },
    oldLose: { type: Number, default: 0 }
  },
  computed: {
    winDiff() {
      if (this.currentWin == 0) return 0;
      if (((this.currentWin - this.wins) / this.wins) * 100 === Infinity)
        return 0;
      else return ((this.currentWin - this.wins) / this.wins) * 100;
    },
    loseDiff() {
      if (this.currentLose == 0) return 0;
      if (((this.currentLose - this.loses) / this.loses) * 100 === Infinity)
        return 0;
      else return ((this.currentLose - this.loses) / this.loses) * 100;
    }
  },
  data() {
    return {
      wins: 0,
      loses: 0
    };
  },
  watch: {
    oldWin(newVal, oldVal) {
      gsap.to(this.$data, { duration: 0.5, wins: newVal });
    },
    oldLose(newVal, oldVal) {
      gsap.to(this.$data, { duration: 0.5, loses: newVal });
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-weight: bold;
  margin: 0;
  font-size: 5em;
  text-align: center;
  user-select: none;
}

.winlose-text {
  margin: 0;
  text-align: center;
  user-select: none;
}

.win-text {
  color: rgb(0, 192, 10);
  user-select: none;
}

.lose-text {
  user-select: none;
}

@media only screen and (max-width: 1600px) {
  h2 {
    font-size: 4em;
  }
}
@media only screen and (max-width: 1300px) {
  h2 {
    font-size: 3em;
  }
}
@media only screen and (max-width: 600px) {
  h2 {
    font-size: 2em;
  }
}
</style>
