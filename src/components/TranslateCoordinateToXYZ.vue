<template>
  <div class="container">
    <h1 class="header-title">Translate coordinate system to XYZ</h1>
    <form class="input-form">
      <h3 class="form-title">Object</h3>
      <div class="input-item">
        <p class="input-subtitles">Enter object name:</p>
        <input class="input-data" type="text" v-model="starName">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the distance to the object in light years:</p>
        <input class="input-data" type="text" v-model="distanceInLightYears">
      </div>
      <h3 class="form-title">Right Ascension</h3>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of hours:</p>
        <input class="input-data" type="text" v-model="hoursRightAscension">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of minutes:</p>
        <input class="input-data" type="text" v-model="minutesRightAscension">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of seconds:</p>
        <input class="input-data" type="text" v-model="secondsRightAscension">
      </div>
      <h3 class="form-title">Declination</h3>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of degrees:</p>
        <input class="input-data" type="text" v-model="degreesDeclination">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of minutes:</p>
        <input class="input-data" type="text" v-model="minutesDeclination">
      </div>
      <div class="input-item">
        <p class="input-subtitles">Enter the number of seconds:</p>
        <input class="input-data" type="text" v-model="secondsDeclination">
      </div>
      <button class="btn btn-translate" @click="translateCoordinate">
        <a href="#translate-results">Translate</a></button>
      <div id="translate-results" v-if="isTranslate">
        <h2 class="star-name-title">{{ starName}}</h2>
        <div class="new-coordinates">
          <p class="output-subtitles">Coordinate in kilometers:</p>
          <ul>
            <li>X: {{ x }}</li>
            <li>Y: {{ y }}</li>
            <li>Z: {{ z }}</li>
          </ul>
        </div>
        <div class="new-coordinates">
          <p class="output-subtitles">Coordinate in astronomical units:</p>
          <ul>
            <li>X: {{ auX }}</li>
            <li>Y: {{ auY }}</li>
            <li>Z: {{ auZ }}</li>
          </ul>
        </div>
        <div class="new-coordinates">
          <p class="output-subtitles">Coordinate in light years:</p>
          <ul>
            <li>X: {{ lyX }}</li>
            <li>Y: {{ lyY }}</li>
            <li>Z: {{ lyZ }}</li>
          </ul>
        </div>
        <button class="btn btn-clear" @click.prevent="clearForm">Clear</button>
      </div>
    </form>
  </div> <!-- END OF CONTAINER -->
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
      lyZ: '',
      isTranslate: false
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

        this.isTranslate = true
      },
     clearForm() {
       this.starName = ''
       this.distanceInLightYears = ''
       this.hoursRightAscension = ''
       this.minutesRightAscension = ''
       this.secondsRightAscension = ''
       this.degreesDeclination = ''
       this.minutesDeclination = ''
       this.secondsDeclination = ''
       this.km = 0
       this.rightAscension = 0
       this.declination = 0
       this.x = ''
       this.y = ''
       this.z = ''
       this.auX = ''
       this.auY = ''
       this.auZ = ''
       this.lyX = ''
       this.lyY = ''
       this.lyZ = ''
       this.isTranslate = false
     }
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

 .btn {
   width: 100%;
   max-width: 100px;
   margin: 0 20px;
   padding: 5px;

   color: #fff;
   cursor: pointer;
   border: 1px solid #fff;
   border-radius: 5px;
   font-size: 16px;
 }

 .btn-translate {
   background-color: #180e26;
 }

 .btn-translate:hover {
   background-color: #324d82;
 }

 .btn-clear {
   background-color: #213367;
 }

 .btn-clear:hover {
   background-color: #170b1f;
 }

 a {
   text-decoration: none;
   color: #fff;
 }

 .star-name-title {
   margin: 50px auto 20px 0;
   border-top: 1px solid #fff;
   padding-top: 20px;
   font-size: 30px;
   color: #c54848;
 }

 .new-coordinates {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   margin: 0 15px 15px 15px;
   font-size: 20px;
 }

 .output-subtitles {
   font-size: 22px;
 }

 ul {
   list-style: none;
   margin: 0;
   text-align: center;
 }

 li {
   margin-bottom: 10px;
 }
</style>
