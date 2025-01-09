<template>
  <div id="root">
    <InputDataForm />
  </div>
</template>

<script setup>
import InputDataForm from '@/components/InputDataForm.vue';
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

#root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
