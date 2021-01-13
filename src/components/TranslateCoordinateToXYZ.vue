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
      <button class="btn btn-translate" @click="translateCoordinate">
        <a href="#translate-results">Translate</a></button>
      <div id="translate-results" v-if="advancedData.isTranslate">
        <h2 class="star-name-title">{{ inputData.starName}}</h2>
        <div class="new-coordinates">
          <p class="output-subtitles">Coordinate in kilometers:</p>
          <ul>
            <li>X: {{ outputResults.x }}</li>
            <li>Y: {{ outputResults.y }}</li>
            <li>Z: {{ outputResults.z }}</li>
          </ul>
        </div>
        <div class="new-coordinates">
          <p class="output-subtitles">Coordinate in astronomical units:</p>
          <ul>
            <li>X: {{ outputResults.auX }}</li>
            <li>Y: {{ outputResults.auY }}</li>
            <li>Z: {{ outputResults.auZ }}</li>
          </ul>
        </div>
        <div class="new-coordinates">
          <p class="output-subtitles">Coordinate in light years:</p>
          <ul>
            <li>X: {{ outputResults.lyX }}</li>
            <li>Y: {{ outputResults.lyY }}</li>
            <li>Z: {{ outputResults.lyZ }}</li>
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
      inputData: {
        starName: '',
        distanceInLightYears: '',
        hoursRightAscension: '',
        minutesRightAscension: '',
        secondsRightAscension: '',
        degreesDeclination: '',
        minutesDeclination: '',
        secondsDeclination: ''
      },
      outputResults: {
        x: '',
        y: '',
        z: '',
        auX: '',
        auY: '',
        auZ: '',
        lyX: '',
        lyY: '',
        lyZ: ''
      },
      advancedData: {
        km: 0,
        rightAscension: 0,
        declination: 0,
        isTranslate: false
      }
    }
  },
   methods: {
      translateCoordinate() {
        this.advancedData.km = Number(this.inputData.distanceInLightYears) * LY
        this.advancedData.rightAscension = (((Number(this.inputData.secondsRightAscension) / 60 +
            Number(this.inputData.minutesRightAscension)) / 60 + Number(this.inputData.hoursRightAscension)) *
            15) * Math.PI / 180
        if (Number(this.inputData.degreesDeclination) < 0) {
          this.advancedData.declination = ((Number(this.inputData.secondsDeclination) / 60 +
              Number(this.inputData.minutesDeclination)) / 60 + Number(this.inputData.degreesDeclination) *
              (-1)) * Math.PI / 180
          this.outputResults.x = this.advancedData.km * Math.cos(this.advancedData.rightAscension) *
              Math.cos(this.advancedData.declination) * (-1)
          this.outputResults.y = this.advancedData.km * Math.sin(this.advancedData.rightAscension) *
              Math.cos(this.advancedData.declination) * (-1)
          this.outputResults.z = this.advancedData.km * Math.sin(this.advancedData.declination) * (-1)
        } else {
          this.advancedData.declination = ((Number(this.inputData.secondsDeclination) / 60 +
              Number(this.inputData.minutesDeclination)) / 60 + Number(this.inputData.degreesDeclination)) *
              Math.PI / 180
          this.outputResults.x = this.advancedData.km * Math.cos(this.advancedData.rightAscension) *
              Math.cos(this.advancedData.declination)
          this.outputResults.y = this.advancedData.km * Math.sin(this.advancedData.rightAscension) *
              Math.cos(this.advancedData.declination)
          this.outputResults.z = this.advancedData.km * Math.sin(this.advancedData.declination)
        }

        this.outputResults.auX = this.outputResults.x / AU
        this.outputResults.auY = this.outputResults.y / AU
        this.outputResults.auZ = this.outputResults.z / AU
        this.outputResults.lyX = this.outputResults.x / LY
        this.outputResults.lyY = this.outputResults.y / LY
        this.outputResults.lyZ = this.outputResults.z / LY

        this.advancedData.isTranslate = true
      },
     clearForm() {
        for(let key in this.inputData) {
          this.inputData[key] = ''
        }
        for(let key in this.outputResults) {
          this.outputResults[key] = ''
        }
       this.advancedData.km = 0
       this.advancedData.rightAscension = 0
       this.advancedData.declination = 0
       this.advancedData.isTranslate = false
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
   text-align: left;
 }

 li {
   margin-bottom: 10px;
 }
</style>
