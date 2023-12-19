<template>
  <BaseLoader v-if="weatherStore.isLoading" />
  <div class="container" v-else>
    <h1 class="city">{{ weatherStore.current?.name }}, {{ weatherStore.current?.sys.country }}</h1>
    <div class="cards">
      <div class="current">
        <CurrentCard :data="currentData" />
      </div>
      <div class="weekdays">
        <WeekdayCard v-for="weekday in weekdaysData" :data="weekday" :key="weekday.date" />
      </div>
    </div>
    <div class="other_cities">
      <div class="top">
        <p class="title">Recent Searches</p>
      </div>
      <div class="cities">
        <CityCard v-for="(item, index) in weatherStore.recentSearches" :data="item" :key="index" @click="showCityWeather(item)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import { useWeatherStore } from "@/stores/weather.js";
import CurrentCard from "@/components/CurrentCard.vue";
import WeekdayCard from "@/components/WeekdayCard.vue";
import CityCard from "@/components/CityCard.vue";
import BaseLoader from "@/components/BaseLoader.vue";

const weatherStore = useWeatherStore();

const showCityWeather = (item) => {
  weatherStore.fetchData(item.city)
}

const currentData = computed(() => {
  return weatherStore.current;
})

const weekdaysData = computed(() => {
  return weatherStore.forecast
})

onMounted(() => {
  weatherStore.fetchData();
})

onMounted(() => {
  // console.log(weatherStore.getCurrentWeather('Yerevan'))
})
</script>

<style scoped lang="scss">
.container{
  @media only screen and (max-width: 600px) {
    padding: 40px 20px !important;
  }
  @media only screen and (max-width: 1750px) {
    padding: 80px 150px;
  }
  @media only screen and (max-width: 1500px) {
    padding: 80px 100px;
  }
  @media only screen and (max-width: 1200px) {
    padding: 80px 50px;
  }
  padding: 80px 200px;
  .city{
    @media only screen and (max-width: 600px) {
      font-size: 30px;
    }
    color: #12334B;
    margin-bottom: 50px;
    font-family: Montserrat;
    font-size: 64px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .cards{
    @media only screen and (max-width: 1200px) {
      flex-direction: column;
    }
    display: flex;
    gap: 45px;
    .current{
      width: 30%;
      @media only screen and (max-width: 1200px) {
        width: 100%;
      }
    }
    .weekdays{
      width: 100%;
      display: flex;
      gap: 45px;
      @media only screen and (max-width: 1200px) {
        flex-wrap: wrap;
      }
    }
  }
  .other_cities{
    font-family: Montserrat;
    border-radius: 33px;
    background: #ECF6FF;
    padding: 30px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    .cities{
      display: flex;
      gap: 27px;
      @media only screen and (max-width: 1200px) {
        flex-wrap: wrap;
      }
    }
    .top{
      flex-wrap: wrap;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title{
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
      .see_all{
        color: #12334B;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-decoration-line: underline;
        cursor: pointer;
      }
    }
  }
}
</style>