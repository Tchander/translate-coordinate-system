<template>
  <div id="app">
    <TranslateCoordinateToXYZ />
  </div>
</template>

<script>
import TranslateCoordinateToXYZ from "@/components/TranslateCoordinateToXYZ";
export default {
  name: 'App',
  components: {
    TranslateCoordinateToXYZ
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
