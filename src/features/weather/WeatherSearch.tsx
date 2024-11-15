'use client'

// features/weather/WeatherSearch.tsx
import React, { useState } from 'react';
import styles from './WeatherSearch.module.css'; // Import CSS module
import CityCard from '@/components/city-card/CityCard';
import { CityWeather } from '../../types/city-weather-types';
import { fetchWeatherData } from './WeatherService';
import { getText } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

const WeatherSearch: React.FC = () => {
    const [cityName, setCityName] = useState('');
    const [cityWeather, setCityWeather] = useState<CityWeather | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { language } = useLanguage(); // Access language from context

    const handleSearch = async () => {
        try {
            const weather = await fetchWeatherData(cityName);
            setCityWeather(weather);
            setError(null);
        } catch (e) {
            console.log(e)
            setError('City not found');
            setCityWeather(null);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.weatherSearch}>
                <input
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={getText(language, 'placeHoderSearch')}
                    className={styles.input}
                />
                <button onClick={handleSearch} className={styles.button}>{getText(language, 'search')}</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {cityWeather && <CityCard city={cityWeather} />}
        </div>
    );
};

export default WeatherSearch;
