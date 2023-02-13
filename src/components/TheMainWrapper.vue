<script>
export default {};
</script>

<template>
  <router-view></router-view>
  <div class="the-main-wrapper"></div>
</template>

<style lang="scss">
@import "../assets/styles/styles.scss";
.the-main-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
button:hover {
  border: 1px dotted #3a7999;
  color: #3a7999;
  background: rgba(0, 0, 0, 0);
  transition: all 200ms ease;
  cursor: pointer;
}
button {
  border-radius: $radius;
}
</style>
