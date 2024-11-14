// components/CityCard.tsx
'use client'

import React, { useState } from 'react';
import styles from './CityCard.module.css'; // Import CSS module
import { CityWeather } from '@/types/city-weather-types';

type CityCardProps = {
    city: CityWeather;
};

const CityCard: React.FC<CityCardProps> = ({ city }) => {
    const [more, setMore] = useState(false);

    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString();
    };

    return (
        <div className={styles.cityCard}>
            <p className={styles.cityName}>{city.name}, {city.temperature}°C</p>
            <p className={styles.details}>PM 10: {city.pm}</p>
            <p className={styles.details}>Wind: {city.windSpeed} m/s</p>
            <p className={styles.details}>Humidity: {city.humidity}%</p>
            <p className={styles.details}>Cloudiness: {city.cloudiness}%</p>
            <p className={styles.details}>Feels Like: {city.feelsLike}°C</p>

            {more && (
                <>
                    <p className={styles.details}>PM 2.5: {city.pm25}</p>
                    <p className={styles.details}>Min Temperature: {city.tempMin}°C</p>
                    <p className={styles.details}>Max Temperature: {city.tempMax}°C</p>
                    <p className={styles.details}>Pressure: {city.pressure} hPa</p>
                    <p className={styles.details}>Visibility: {city.visibility / 1000} km</p>
                    <p className={styles.details}>Sunrise: {formatTime(city.sunrise)}</p>
                    <p className={styles.details}>Sunset: {formatTime(city.sunset)}</p>
                </>
            )}

            <button
                className={styles.toggleButton}
                onClick={() => setMore(!more)}
            >
                {more ? 'show less' : 'show more'}
            </button>
        </div>
    );
};

export default CityCard;