'use client'

// features/weather/WeatherSearch.tsx
import React, { useState } from 'react';
import styles from './WeatherSearch.module.css'; // Import CSS module
import CityCard from '@/components/city-card/CityCard';
import { CityWeather } from '../../types/city-weather-types';
import { fetchWeatherData } from './WeatherService';

const WeatherSearch: React.FC = () => {
    const [cityName, setCityName] = useState('');
    const [cityWeather, setCityWeather] = useState<CityWeather | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            const weather = await fetchWeatherData(cityName);
            setCityWeather(weather);
            setError(null);
        } catch (e) {
            setError('City not found');
            setCityWeather(null);
        }
    };

    return (
        <div className={styles.weatherSearch}>
            <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter city name"
                className={styles.input}
            />
            <button onClick={handleSearch} className={styles.button}>Search</button>

            {error && <p className={styles.error}>{error}</p>}
            {cityWeather && <CityCard city={cityWeather} />}
        </div>
    );
};

export default WeatherSearch;
