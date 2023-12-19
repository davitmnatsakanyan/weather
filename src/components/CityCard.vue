<template>
  <div class="card">
    <div class="info">
      <p class="country">{{ data?.country }}</p>
      <p class="city">{{ data?.city }}</p>
      <p class="country">{{ data?.status }}</p>
    </div>
    <div class="image">
      <img :src="iconUrl">
    </div>
  </div>
</template>

<script setup>
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
  cursor: pointer;
  width: 100%;
  font-family: Montserrat;
  padding: 16px 27px;
  display: flex;
  justify-content: space-between;
  background: #FFF;
  border-radius: 15px;
  .image{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info{
    display: flex;
    flex-direction: column;
    gap: 10px;
    .country{
      color: #777;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .city{
      color: #000;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>