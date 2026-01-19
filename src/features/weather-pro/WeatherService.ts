// features/weather/WeatherService.ts

import { AddressWeather } from "@/types/address-weather-types";

// const API_KEY = 'YOUR_API_KEY'; // Thay YOUR_API_KEY bằng key thật từ OpenWeatherMap
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Thay YOUR_API_KEY bằng key thật từ OpenWeatherMap
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // weather map
const ADDRESS_BASE_URL = process.env.NEXT_PUBLIC_ADDRESS_BASE_URL; // address map

export async function fetchWeatherData(address: string): Promise<AddressWeather | null> {
    try {
        const addressResponse = await fetch(`${ADDRESS_BASE_URL}/search?q=${encodeURIComponent(address)}&format=json`);
        const addressData = await addressResponse.json();

        if (addressData.length > 0) {
            // console.log('Address Data ======', { addressData });
            // setCoordinates({ lat: addressData[0].lat, lon: addressData[0].lon });
            const { lat, lon } = addressData[0];

            const weatherResponse = await fetch(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            // if (!response.ok) throw new Error('Location not found');
            const weatherData = await weatherResponse.json()

            const airQualityResponse = await fetch(`${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const airQualityData = await airQualityResponse.json();

            // Truy xuất các thông số PM10, PM2.5 từ dữ liệu air quality
            const pm10 = airQualityData.list[0].components.pm10;
            const pm25 = airQualityData.list[0].components.pm2_5;

            return {
                // name: weatherData.name,
                name: addressData[0].display_name,
                // name: addressData[0].name,
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
        } else {
            return null
            // alert('Address not found');
        }

    } catch (e) {
        console.log(e)
        throw new Error("Unable to fetch weather data");
    }
}

export async function fetchWeatherByCoords(
    lat: number,
    lon: number
): Promise<AddressWeather | null> {
    try {
        /* =========================
           1. REVERSE GEOCODING
           ========================= */
        const addressResponse = await fetch(
            `${ADDRESS_BASE_URL}/reverse?lat=${lat}&lon=${lon}&format=json`
        )
        const addressData = await addressResponse.json()

        /* =========================
           2. WEATHER
           ========================= */
        const weatherResponse = await fetch(
            `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        const weatherData = await weatherResponse.json()

        /* =========================
           3. AIR QUALITY
           ========================= */
        const airQualityResponse = await fetch(
            `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
        const airQualityData = await airQualityResponse.json()

        const pm10 = airQualityData.list?.[0]?.components?.pm10 ?? 0
        const pm25 = airQualityData.list?.[0]?.components?.pm2_5 ?? 0

        return {
            name:
                addressData?.display_name ||
                `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
            isCurrentLocation: true,
            pm: pm10,
            pm25: pm25,
            temperature: weatherData.main?.temp || 0,
            feelsLike: weatherData.main?.feels_like || 0,
            tempMin: weatherData.main?.temp_min || 0,
            tempMax: weatherData.main?.temp_max || 0,
            pressure: weatherData.main?.pressure || 0,
            humidity: weatherData.main?.humidity || 0,
            windSpeed: weatherData.wind?.speed || 0,
            cloudiness: weatherData.clouds?.all || 0,
            visibility: weatherData.visibility || 0,
            sunrise: weatherData.sys?.sunrise || 0,
            sunset: weatherData.sys?.sunset || 0,
            country: weatherData.sys?.country || '',
        }
    } catch (e) {
        console.error(e)
        throw new Error('Unable to fetch weather data by coordinates')
    }
}
