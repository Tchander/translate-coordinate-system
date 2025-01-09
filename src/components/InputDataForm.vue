<template>
  <div class="container">
    <h1 class="header-title">
      Translate coordinate system to XYZ
    </h1>
    <form class="input-form">
      <h3 class="form-title">
        Object
      </h3>
      <div class="input-item">
        <p class="input-subtitles">
          Enter object name:
        </p>
        <input 
          class="input-data"
          type="text" 
          v-model="inputData.starName"
        >
      </div>
      <div class="input-item">
        <p class="input-subtitles">
          Enter the distance to the object in light years:
        </p>
        <input 
          class="input-data" 
          type="number" 
          v-model="inputData.distanceInLightYears"
        >
      </div>
      <h3 class="form-title">
        Right Ascension
      </h3>
      <div class="input-item">
        <p class="input-subtitles">
          Enter the number of hours:
        </p>
        <input 
          class="input-data" 
          type="number" 
          v-model="inputData.hoursRightAscension"
        >
      </div>
      <div class="input-item">
        <p class="input-subtitles">
          Enter the number of minutes:
        </p>
        <input 
          class="input-data" 
          type="number" 
          v-model="inputData.minutesRightAscension"
        >
      </div>
      <div class="input-item">
        <p class="input-subtitles">
          Enter the number of seconds:
        </p>
        <input 
          class="input-data" 
          type="number" 
          v-model="inputData.secondsRightAscension"
        >
      </div>
      <h3 class="form-title">
        Declination
      </h3>
      <div class="input-item">
        <p class="input-subtitles"
        >Enter the number of degrees:
      </p>
        <input 
          class="input-data" 
          type="number" 
          v-model="inputData.degreesDeclination"
        >
      </div>
      <div class="input-item">
        <p class="input-subtitles">
          Enter the number of minutes:
        </p>
        <input 
          class="input-data" 
          type="number" 
          v-model="inputData.minutesDeclination"
        >
      </div>
      <div class="input-item">
        <p class="input-subtitles">
          Enter the number of seconds:
        </p>
        <input 
          class="input-data" 
          type="number" 
          v-model="inputData.secondsDeclination"
        >
      </div>
      <button
        v-if="showTranslateButton"
        class="btn-translate" 
        @click="translateCoordinate()"
      >
        <a a href="#translate-results">
          Translate
        </a>
      </button>
      <template v-if="showOutputResultForm">
        <OutputResultForm
          id="translate-results"
          v-bind="outputResults"
          :star-name="inputData.starName"
        />
        <button 
          class="btn-clear" 
          @click="clearData()"
        >
          Clear
        </button>
      </template>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import OutputResultForm from '@/components/OutputResultForm.vue';
import { LY, AU } from '@/consts/index.js';
import { scrollToTop } from '@/utils/index.js';

const defaultInputData = {
  starName: '',
  distanceInLightYears: undefined,
  hoursRightAscension: undefined,
  minutesRightAscension: undefined,
  secondsRightAscension: undefined,
  degreesDeclination: undefined,
  minutesDeclination: undefined,
  secondsDeclination: undefined,
};

const defaultOutputResults = {
  x: '',
  y: '',
  z: '',
  auX: '',
  auY: '',
  auZ: '',
  lyX: '',
  lyY: '',
  lyZ: '',
};

const inputData = ref({ ...defaultInputData });

const outputResults = ref({ ...defaultOutputResults });

const showOutputResultForm = ref(false);

const showTranslateButton = computed(() => {
  return inputData.value.starName && inputData.value.distanceInLightYears && inputData.value.hoursRightAscension 
  && inputData.value.minutesRightAscension && inputData.value.secondsRightAscension && inputData.value.degreesDeclination 
  && inputData.value.minutesDeclination && inputData.value.secondsDeclination;
});

function translateCoordinate() {
  const km = inputData.value.distanceInLightYears * LY;

  const rightAscension = (
    ((inputData.value.secondsRightAscension / 60 + inputData.value.minutesRightAscension) / 60 + inputData.value.hoursRightAscension) * 15)
     * Math.PI / 180;
  
  let declination = undefined;

  if (inputData.value.degreesDeclination < 0) {
    declination = (
      (inputData.value.secondsDeclination / 60 + inputData.value.minutesDeclination) / 60 + inputData.value.degreesDeclination
       * (-1)) * Math.PI / 180;

    outputResults.value.x = km * Math.cos(rightAscension) *
        Math.cos(declination) * (-1);

    outputResults.value.y = km * Math.sin(rightAscension) *
        Math.cos(declination) * (-1);

    outputResults.value.z = km * Math.sin(declination) * (-1);
  } else {
    declination = (
      (inputData.value.secondsDeclination / 60 + inputData.value.minutesDeclination) / 60 + inputData.value.degreesDeclination)
       * Math.PI / 180;

    outputResults.value.x = km * Math.cos(rightAscension) *
        Math.cos(declination);

    outputResults.value.y = km * Math.sin(rightAscension) *
        Math.cos(declination);

    outputResults.value.z = km * Math.sin(declination);
  }

  outputResults.value.auX = outputResults.value.x / AU;
  outputResults.value.auY = outputResults.value.y / AU;
  outputResults.value.auZ = outputResults.value.z / AU;
  outputResults.value.lyX = outputResults.value.x / LY;
  outputResults.value.lyY = outputResults.value.y / LY;
  outputResults.value.lyZ = outputResults.value.z / LY;

  showOutputResultForm.value = true;
}

function clearData() {
  showOutputResultForm.value = false;
  inputData.value = ref({ ...defaultInputData });
  outputResults.value = ref({ ...defaultOutputResults });
  scrollToTop();
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

.btn-translate {
  width: 100%;
  max-width: 100px;
  margin: 0 20px;
  padding: 5px;

  background-color: #180e26;
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 16px;
}

.btn-translate:hover {
  background-color: #324d82;
}

a {
  text-decoration: none;
  color: #fff;
}
</style>
