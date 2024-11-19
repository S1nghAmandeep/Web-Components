<template>
  <div id="app">
    <uc-stock-price v-if="showStockFinder"></uc-stock-price>
    <uc-stock-finder ></uc-stock-finder>
<!-- <uc-spinner></uc-spinner> -->
 <button @click="showStockFinder = !showStockFinder">Load price template</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data() {
    return {showStockFinder: false}
  },
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
