<template>
  <div>
    <h1>Translate coordinate system to XYZ</h1>
    <div class="container">
      <h3>Object</h3>
      <div class="input-item">
        <p>Enter object name:</p>
        <input type="text" v-model="starName">
      </div>
      <div class="input-item">
        <p>Enter the distance to the object in light years:</p>
        <input type="text" v-model="distanceInLightYears">
      </div>
      <h3>Right Ascension</h3>
      <div class="input-item">
        <p>Enter the number of hours:</p>
        <input type="text" v-model="hoursRightAscension">
      </div>
      <div class="input-item">
        <p>Enter the number of minutes:</p>
        <input type="text" v-model="minutesRightAscension">
      </div>
      <div class="input-item">
        <p>Enter the number of seconds:</p>
        <input type="text" v-model="secondsRightAscension">
      </div>
      <h3>Declination</h3>
      <div class="input-item">
        <p>Enter the number of degrees:</p>
        <input type="text" v-model="degreesDeclination">
      </div>
      <div class="input-item">
        <p>Enter the number of minutes:</p>
        <input type="text" v-model="minutesDeclination">
      </div>
      <div class="input-item">
        <p>Enter the number of seconds:</p>
        <input type="text" v-model="secondsDeclination">
      </div>

      <button v-on:click="translateCoordinate">Translate</button>


      <h2>{{ starName}}</h2>
      <div class="new-coordinates">
        <p>Coordinate in kilometers</p>
        <ul>
          <li>X: {{ x }}</li>
          <li>Y: {{ y }}</li>
          <li>Z: {{ z }}</li>
        </ul>
      </div>
      <div class="new-coordinates">
        <p>Coordinate in astronomical units</p>
        <ul>
          <li>X: {{ auX }}</li>
          <li>Y: {{ auY }}</li>
          <li>Z: {{ auZ }}</li>
        </ul>
      </div>
      <div class="new-coordinates">
        <p>Coordinate in light years</p>
        <ul>
          <li>X: {{ lyX }}</li>
          <li>Y: {{ lyY }}</li>
          <li>Z: {{ lyZ }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
   const LY = 9460800000000
   const AU = 149600000
 export default {
  data(){
    return {
      starName: '',
      distanceInLightYears: '',
      hoursRightAscension: '',
      minutesRightAscension: '',
      secondsRightAscension: '',
      degreesDeclination: '',
      minutesDeclination: '',
      secondsDeclination: '',
      km: 0,
      rightAscension: 0,
      declination: 0,
      x: '',
      y: '',
      z: '',
      auX: '',
      auY: '',
      auZ: '',
      lyX: '',
      lyY: '',
      lyZ: ''
    }
  },
   methods: {
      translateCoordinate() {
        this.km = Number(this.distanceInLightYears) * LY
        this.rightAscension = (((Number(this.secondsRightAscension) / 60 + Number(this.minutesRightAscension)) / 60 +
            Number(this.hoursRightAscension)) * 15) * Math.PI / 180
        if (Number(this.degreesDeclination) < 0) {
          this.declination = ((Number(this.secondsDeclination) / 60 + Number(this.minutesDeclination)) / 60 +
              Number(this.degreesDeclination) * (-1)) * Math.PI / 180
          this.x = this.km * Math.cos(this.rightAscension) * Math.cos(this.declination) * (-1)
          this.y = this.km * Math.sin(this.rightAscension) * Math.cos(this.declination) * (-1)
          this.z = this.km * Math.sin(this.declination) * (-1)
        } else {
          this.declination = ((Number(this.secondsDeclination) / 60 + Number(this.minutesDeclination)) / 60 +
              Number(this.degreesDeclination)) * Math.PI / 180
          this.x = this.km * Math.cos(this.rightAscension) * Math.cos(this.declination)
          this.y = this.km * Math.sin(this.rightAscension) * Math.cos(this.declination)
          this.z = this.km * Math.sin(this.declination)
        }
        this.auX = this.x / AU
        this.auY = this.y / AU
        this.auZ = this.z / AU
        this.lyX = this.x / LY
        this.lyY = this.y / LY
        this.lyZ = this.z / LY
      }
   }
 }
</script>

<style>
 ul {
   list-style: none;
 }
</style>
