<template>
  <div class="card">
    <div class="header">
      <p class="day">{{ moment.unix(data?.dt).format('dddd') }}</p>
      <p class="time">{{ moment.unix(data?.dt).format('LT') }}</p>
    </div>
    <div class="body">
      <div class="top">
        <p class="temperature">{{ Math.round(data?.main.temp)}}&deg;</p>
        <img :src="iconUrl">
      </div>

      <div class="list">
        <div class="block">
          <p>Real Feel <span>{{ Math.round(data?.main.feels_like)}}&deg;</span></p>
          <p>Wind N-E <span>{{ data?.wind.speed }}m/s</span></p>
          <p>Pressure <span>{{ data?.main.pressure }}hPa</span></p>
          <p>Humidity <span>{{ data?.main.humidity }}%</span></p>
        </div>
        <div class="block">
          <p>Sunrise <span>{{ moment.unix(data?.sys.sunrise).format('LT')}}</span></p>
          <p>Sunset <span>{{ moment.unix(data?.sys.sunset).format('LT')}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import moment from 'moment'
import {computed} from "vue";


const props = defineProps({
  data:{
    type: Object,
    required: true
  }
})

const iconUrl = computed(() => {
  return `https://openweathermap.org/img/wn/`+props.data?.weather[0].icon+`@2x.png`
})
</script>

<style scoped lang="scss">
.card{
  font-family: Montserrat;
  width: 100%;
  height: 350px;
  border-radius: 33px;
  background: #ECF6FF;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  .header{
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background: #D4EBFF;
    padding: 24px 33px;
    display: flex;
    justify-content: space-between;
    font-size: 21px;
    font-weight: 600;
  }
  .body{
    padding: 14px 28px;
    .top{
      display: flex;
      justify-content: space-between;
      .temperature{
        font-size: 48px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
    .list{
      margin-top: 21px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .block{
        display: flex;
        gap: 5px;
        flex-direction: column;
        p{
          font-size: 16px;
          font-style: normal;
          span{
            font-weight: 600;
          }
        }
      }
    }
  }
}

</style>