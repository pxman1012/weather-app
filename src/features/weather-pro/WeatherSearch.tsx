'use client'

// features/weather/WeatherSearch.tsx
import React, { useState } from 'react';
import styles from './WeatherSearch.module.css'; // Import CSS module
import { fetchWeatherData } from './WeatherService';
import { getText } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';
import AddressCard from '@/components/address-card/AddressCard';
import { AddressWeather } from '@/types/address-weather-types';

const WeatherSearch: React.FC = () => {
    const [addressName, setAddressName] = useState('');
    const [addressWeather, setAddressWeather] = useState<AddressWeather | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { language } = useLanguage(); // Access language from context

    const handleSearch = async () => {
        try {
            const weather = await fetchWeatherData(addressName);
            if (weather) {
                setAddressWeather(weather);
                setError(null);
            } else {
                setError('Address not found');
                setAddressWeather(null);
            }
        } catch (e) {
            console.log(e)
            setError('Address not found');
            setAddressWeather(null);
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
                    value={addressName}
                    onChange={(e) => setAddressName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={getText(language, 'placeHoderAddressSearch')}
                    className={styles.input}
                />
                <button onClick={handleSearch} className={styles.button}>{getText(language, 'search')}</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {addressWeather && <AddressCard address={addressWeather} />}
        </div>
    );
};

export default WeatherSearch;
