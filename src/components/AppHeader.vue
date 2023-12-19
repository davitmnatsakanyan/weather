<template>
  <div class="header">
    <div class="search">
      <img src="/icons/search.svg">
      <input type="text" placeholder="Search City" name="" id="" v-model="search" v-on:keyup.enter="handleSearchInput">
    </div>
    <div class="units">
      <div class="unit" :class="{'active' : weatherStore.unit === 'metric'}" @click="handleUnitChange('metric')">℃</div>
      <div class="unit" :class="{'active' : weatherStore.unit === 'imperial'}" @click="handleUnitChange('imperial')">℉</div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from "@/stores/weather.js";
import { ref } from 'vue';

const weatherStore = useWeatherStore();
const search = ref('')

const handleUnitChange = (unit) => {
  weatherStore.unit = unit;
  weatherStore.fetchData(weatherStore.current.name);
}
const handleSearchInput = async () => {
  await weatherStore.fetchData(search.value);

  // if
  if(weatherStore.current.cod == 200){
    weatherStore.setSearchedItem(weatherStore.current)
  }
}
</script>

<style scoped lang="scss">
.header{
  @media only screen and (max-width: 1750px) {
    padding: 80px 150px;
  }
  @media only screen and (max-width: 1500px) {
    padding: 80px 100px;
  }
  @media only screen and (max-width: 1200px) {
    padding: 80px 50px;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 25px;
    padding: 40px 20px;
  }
  padding: 40px 250px;
  display: flex;
  gap: 50px;
  border-bottom: 1px solid #E4E4E4;
  justify-content: space-between;
  align-items: center;
  .units{
    display: flex;
    height: 40px;
    width: 163px;
    border-radius: 76px;
    border: 1px solid #E4E4E4;
    justify-content: center;
    align-items: center;
    .unit{
      cursor: pointer;
      height: 100%;
      width: 50%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active{
        background-color: #ECF6FF;
        border-radius: 49px;
      }
    }
  }
  .search{
    display: flex;
    width: 50%;
    padding: 14px 28px;
    align-items: center;
    gap: 10px;
    border-radius: 79px;
    border: 1px solid #D9D9D9;
    @media only screen and (max-width: 600px) {
      width: 80%;
    }
    input{
      width: 100%;
      font-size: 16px;
      height: 22px;
      border: none;
      &:focus-visible{
        border: none;
        outline: none;
      }
    }
  }
}

</style>