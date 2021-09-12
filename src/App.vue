<template>
  <div id="app">
    <InputDataForm />
  </div>
</template>

<script>
import InputDataForm from "@/components/InputDataForm"
export default {
  name: 'App',
  components: {
    InputDataForm
  }
}
</script>

<style>
body {
  margin: 0;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("assets/images/space-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
