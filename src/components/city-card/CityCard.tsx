// components/CityCard.tsx

'use client';

import React, { useState } from 'react';
import styles from './CityCard.module.css'; // Import CSS module
import { CityWeather } from '@/types/city-weather-types';
import { getText } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

type CityCardProps = {
    city: CityWeather;
};

const CityCard: React.FC<CityCardProps> = ({ city }) => {
    const { language } = useLanguage(); // Access language from context
    const [more, setMore] = useState(false);

    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString();
    };

    return (
        <div className={styles.cityCard}>
            <p className={styles.cityName}>
                {city.name}, {city.temperature}°C
            </p>
            <p className={styles.details}>{getText(language, 'wind')}: {city.windSpeed} m/s</p>
            <p className={styles.details}>{getText(language, 'humidity')}: {city.humidity}%</p>
            <p className={styles.details}>{getText(language, 'cloudiness')}: {city.cloudiness}%</p>
            <p className={styles.details}>{getText(language, 'feelsLike')}: {city.feelsLike}°C</p>
            <p className={styles.details}>{getText(language, 'pm')}: {city.pm}</p>

            {more && (
                <>
                    <p className={styles.details}>{getText(language, 'pm25')}: {city.pm25}</p>
                    <p className={styles.details}>{getText(language, 'minTemp')}: {city.tempMin}°C</p>
                    <p className={styles.details}>{getText(language, 'maxTemp')}: {city.tempMax}°C</p>
                    <p className={styles.details}>{getText(language, 'pressure')}: {city.pressure} hPa</p>
                    <p className={styles.details}>{getText(language, 'visibility')}: {city.visibility / 1000} km</p>
                    <p className={styles.details}>{getText(language, 'sunrise')}: {formatTime(city.sunrise)}</p>
                    <p className={styles.details}>{getText(language, 'sunset')}: {formatTime(city.sunset)}</p>
                </>
            )}

            <button
                className={styles.toggleButton}
                onClick={() => setMore(!more)}
            >
                {more ? getText(language, 'showLess') : getText(language, 'showMore')}
            </button>
        </div>
    );
};

export default CityCard;
