<template>
  <div class="card">
    <p class="day">{{ moment(data.date).format('dddd')}}</p>
    <div class="image">
      <img :src="iconUrl">
    </div>
    <p class="temp">{{ Math.round(data.temp) }}&deg;</p>
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
  return `https://openweathermap.org/img/wn/`+props.data?.icon+`@2x.png`
})

</script>

<style scoped lang="scss">
.card{
  font-family: Montserrat;
  width: 100%;
  height: 350px;
  border-radius: 40px;
  background: #FAFAFA;
  .image{
    display: flex;
    justify-content: center;
    margin: 41px 0;
  }
  .temp{
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .day{
    display: flex;
    padding-top: 17px;
    padding-bottom: 24px;
    justify-content: center;
    border-bottom: 1px solid #E4E4E4;
    color: #0F0F117C;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
</style>