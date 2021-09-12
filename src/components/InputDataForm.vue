<template>
  <div class="container">
    <h1 class="header-title">Translate coordinate system to XYZ</h1>
    <form class="input-form">
      <h3 class="form-title">Object</h3>
      <div class="input-item">
        <p class="input-subtitles">Enter object name:</p>
        <input class="input-data" type="text" v-model="inputData.starName">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the distance to the object in light years:</p>
        <input class="input-data" type="text" v-model="inputData.distanceInLightYears">
      </div>
      <h3 class="form-title">Right Ascension</h3>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of hours:</p>
        <input class="input-data" type="text" v-model="inputData.hoursRightAscension">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of minutes:</p>
        <input class="input-data" type="text" v-model="inputData.minutesRightAscension">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of seconds:</p>
        <input class="input-data" type="text" v-model="inputData.secondsRightAscension">
      </div>
      <h3 class="form-title">Declination</h3>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of degrees:</p>
        <input class="input-data" type="text" v-model="inputData.degreesDeclination">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of minutes:</p>
        <input class="input-data" type="text" v-model="inputData.minutesDeclination">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of seconds:</p>
        <input class="input-data" type="text" v-model="inputData.secondsDeclination">
      </div>
      <OutputResultForm v-bind:inputData="inputData"/>
    </form>
  </div> <!-- END OF CONTAINER -->
</template>

<script>
import OutputResultForm from "@/components/OutputResultForm"
export default {
  data(){
    return {
      inputData: {
        starName: '',
        distanceInLightYears: '',
        hoursRightAscension: '',
        minutesRightAscension: '',
        secondsRightAscension: '',
        degreesDeclination: '',
        minutesDeclination: '',
        secondsDeclination: ''
      }
    }
  },
  components: {
    OutputResultForm
  }
}
</script>

<style>
.container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  color: #fff;
  font-family: 'Rubik', sans-serif;
}

.header-title {
  margin: 30px auto;
  font-size: 32px;
}

.input-form {
  background: rgba(37, 37, 128, 0.4);
  margin: auto;
  border-radius: 15px;
  padding: 10px
}

.form-title {
  margin: 10px auto;
  padding-bottom: 10px;
  border-bottom: 1px outset #fff;
  font-size: 24px;
}

.input-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 15px 45px 15px;
}

.input-subtitles {
  font-size: 16px;
}

.input-data {
  color: #000;
  font-size: 16px;
}

a {
  text-decoration: none;
  color: #fff;
}

</style>
