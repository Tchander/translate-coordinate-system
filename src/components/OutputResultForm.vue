<template>
    <div class="output-results">
      <div>
        <h2 class="star-name-title">
          {{ props.starName}}
        </h2>
        <div class="new-coordinates">
          <p class="output-subtitles">
            Coordinate in kilometers:
          </p>
          <ul>
            <li>
              X: {{ props.x }}
            </li>
            <li>
              Y: {{ props.y }}
            </li>
            <li>
              Z: {{ props.z }}
            </li>
          </ul>
        </div>
        <div class="new-coordinates">
          <p class="output-subtitles">
            Coordinate in astronomical units:
          </p>
          <ul>
            <li>
              X: {{ props.auX }}
            </li>
            <li>
              Y: {{ props.auY }}
            </li>
            <li>
              Z: {{ props.auZ }}
            </li>
          </ul>
        </div>
        <div class="new-coordinates">
          <p class="output-subtitles">
            Coordinate in light years:
          </p>
          <ul>
            <li>
              X: {{ props.lyX }}
            </li>
            <li>
              Y: {{ props.lyY }}
            </li>
            <li>
              Z: {{ props.lyZ }}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
  starName: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  z: {
    type: Number,
    required: true,
  },
  auX: {
    type: Number,
    required: true,
  },
  auY: {
    type: Number,
    required: true,
  },
  auZ: {
    type: Number,
    required: true,
  },
  lyX: {
    type: Number,
    required: true,
  },
  lyY: {
    type: Number,
    required: true,
  },
  lyZ: {
    type: Number,
    required: true,
  },
})
</script>

<style>
.btn-clear {
  width: 100%;
  max-width: 100px;
  margin: 0 20px;
  padding: 5px;

  background-color: #213367;
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 16px;
}

.btn-clear:hover {
  background-color: #170b1f;
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
