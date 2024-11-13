// features/weather/WeatherService.ts
// import { CityWeather } from './types';

import { CityWeather } from "@/types/city-weather-types";

// const API_KEY = 'YOUR_API_KEY'; // Thay YOUR_API_KEY bằng key thật từ OpenWeatherMap
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Thay YOUR_API_KEY bằng key thật từ OpenWeatherMap

export async function fetchWeatherData(city: string): Promise<CityWeather> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if (!response.ok) {
        throw new Error('City not found');
    }

    const data = await response.json();

    return {
        name: data.name,
        temperature: Math.round(data.main.temp),
        pm: data.main.aqi || 50, // Giả sử PM chưa có dữ liệu thật từ OpenWeatherMap
        windSpeed: data.wind.speed,
    };
}
