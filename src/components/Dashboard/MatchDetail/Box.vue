<template>
  <div id="box-container" :class="isWhite ? 'white' : 'black'">
    <span class="text">{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    content: { required: true },
    isWhite: { type: Boolean, required: true, default: true }
  }
};
</script>

<style lang="scss" scoped>
#box-container {
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  & .text {
    font-weight: bold;
    font-size: 1.2em;
    user-select: none;
  }
}

.white {
  width: 50%;
  background: white;

  & .text {
    color: black;
  }
}

.black {
  width: 100%;
  background: $primary;

  & .text {
    color: white;
  }
}

@media only screen and (max-width: 1255px) {
  #box-container .text {
    font-size: 1em;
  }
}

@media only screen and (max-width: 1000px) {
  #box-container .text {
    font-size: 0.9em;
  }
}

@media only screen and (max-width: 800px) {
  #box-container .text {
    font-size: 0.8em;
  }
}

@media only screen and (max-width: 700px) {
  #box-container .text {
    font-size: 0.7em;
  }
  .white {
    width: 75%;
  }
}
</style>
