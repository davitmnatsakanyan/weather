import { defineStore } from 'pinia'
import { useWeatherstackApiInstance } from '/src/api_helper'
import moment from "moment";


const weatherstackApiInstance = useWeatherstackApiInstance();

export const useWeatherStore = defineStore('weather',  {
    state: () => {
        return {
            unit: 'metric',
            current: null,
            forecast: null,
            isLoading: true,
            recentSearches: localStorage.getItem('recent_searches') ? JSON.parse(localStorage.getItem('recent_searches')) : []
        }
    },
    actions: {
        setSearchedItem(item){
            let recent_searches = localStorage.getItem('recent_searches') ? JSON.parse(localStorage.getItem('recent_searches')) : [];

            let isUnique = true;
            //Check if store already contains the city
            for (let index in recent_searches){
                if(recent_searches[index].city == item.name){
                    isUnique = false;
                    break;
                }
            }

            // If city does not exist on the store, add it
            if(isUnique){
                if(recent_searches.length == 4){
                    recent_searches.shift();
                }
                recent_searches.push({
                    country: item.sys.country,
                    city: item.name,
                    status: item.weather[0].main,
                    icon: item.weather[0].icon,

                })

                this.recentSearches = recent_searches
                localStorage.setItem('recent_searches', JSON.stringify(recent_searches))
            }
        },
        // Fet weather data for current day and for new 5 days
        async fetchData(query = null) {
            this.isLoading = true
            if(!query){
                query = 'Yerevan';
            }
            await this.getCurrentWeather(query);
            await this.getDailyForecast(query);
            this.isLoading = false
        },
        async getCurrentWeather(query){
            try{
                const response = await weatherstackApiInstance.get('/weather', {
                    params: {
                        q: query,
                        units: this.unit
                    }
                })

                if(response.data.cod == 200){
                    this.current = response.data;
                }
                else{
                    alert('City not found')
                }
            }
            catch (err) {
                alert('Something went wrong')
            }
        },
        async getDailyForecast(query){
            try{
                const response = await weatherstackApiInstance.get('/forecast', {
                    params: {
                        q: query,
                        units: this.unit
                    }
                })

                if(response.data.cod == 200){
                    // As the free plan does not support daily forecast, instead it has 3 hours forecast for 5 days
                    // I am grouping the data by day and calculating the average values
                    this.forecast =  this.groupByDay(response.data.list)
                }
                else{
                    alert('City not found')
                }
            }
            catch (err) {
                alert('Something went wrong')
            }
        },
        groupByDay(data) {
            const groupedData = {};

            data.forEach((entry) => {

                const date = entry.dt_txt.split(' ')[0]; // Extracting date from dt_txt

                // exclude current date
                if(date == moment().format('YYYY-MM-DD')){
                    return;
                }
                if (!groupedData[date]) {
                    groupedData[date] = {
                        totalTemp: 0,
                        count: 0,
                        icon: entry.weather[0].icon
                    };
                }

                groupedData[date].totalTemp += entry.main.temp;
                groupedData[date].count += 1;
            });

            const result = [];

            for (const date in groupedData) {
                const averageTemp = groupedData[date].totalTemp / groupedData[date].count;
                result.push({
                    temp: averageTemp.toFixed(2), // Rounding to 2 decimal places
                    date,
                    icon: groupedData[date].icon
                })
            }

            return result;
        }
    }
})