<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },

  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect());
  },
};
</script>

<template>
  <div class="the-select">
    <button class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </button>
    <div class="options" v-if="areOptionsVisible">
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/styles.scss";
.the-select {
  float: left;
  position: relative;
  width: 125px;
  cursor: pointer;
  margin-bottom: 10px;
}
.title {
  width: 100%;
  height: 35px;
  border: solid 1px #aeaeae;
  background: rgb(58, 58, 252);
  color: #fff;
}
.the-select p {
  margin: $margin;
  margin-left: 0;
  color: rgb(58, 58, 252);
  // border-radius: $radius;
  width: 100%;
  height: 100%;
}
.options {
  margin: $margin 0;
  margin-bottom: $margin;
  position: absolute;
  border: solid 1px rgb(58, 58, 252);
  border-radius: $radius;
  top: 30px;
  left: 0;
  width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    position: static;
    top: 10px;
  }
}
.options p:hover {
  background: rgb(58, 58, 252);
  color: #fff;
}
</style>
