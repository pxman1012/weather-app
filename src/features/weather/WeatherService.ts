// features/weather/WeatherService.ts
// import { CityWeather } from './types';

import { CityWeather } from "@/types/city-weather-types";

// const API_KEY = 'YOUR_API_KEY'; // Thay YOUR_API_KEY bằng key thật từ OpenWeatherMap
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Thay YOUR_API_KEY bằng key thật từ OpenWeatherMap
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // 

export async function fetchWeatherData(city: string): Promise<CityWeather> {
    try {
        const weatherResponse = await fetch(`${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const weatherData = await weatherResponse.json();

        const { lat, lon } = weatherData.coord;

        const airQualityResponse = await fetch(`${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const airQualityData = await airQualityResponse.json();

        // Truy xuất các thông số PM10, PM2.5 từ dữ liệu air quality
        const pm10 = airQualityData.list[0].components.pm10;
        const pm25 = airQualityData.list[0].components.pm2_5;

        return {
            name: weatherData.name,
            pm: pm10 || 0,  // Lưu ý: PM10 là chỉ số bụi mịn PM10
            temperature: weatherData.main?.temp || 0,
            windSpeed: weatherData.wind?.speed || 0,
            country: weatherData.sys?.country || '',
            feelsLike: weatherData.main?.feels_like || 0,
            tempMin: weatherData.main?.temp_min || 0,
            tempMax: weatherData.main?.temp_max || 0,
            pressure: weatherData.main?.pressure || 0,
            humidity: weatherData.main?.humidity || 0,
            cloudiness: weatherData.clouds?.all || 0,
            visibility: weatherData.visibility || 0,
            sunrise: weatherData.sys?.sunrise || 0,
            sunset: weatherData.sys?.sunset || 0,
            pm25: pm25 || 0,  // Lưu ý: PM2.5 là chỉ số bụi mịn PM2.5
        };

    } catch (e) {
        console.log(e)
        throw new Error("Unable to fetch weather data");
    }
}
