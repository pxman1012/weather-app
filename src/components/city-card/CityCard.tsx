// components/CityCard.tsx
import React from 'react';
import styles from './CityCard.module.css'; // Import CSS module
import { CityWeather } from '@/types/city-weather-types';
// import { CityWeather } from '../features/weather/types';

type CityCardProps = {
    city: CityWeather;
};

const CityCard: React.FC<CityCardProps> = ({ city }) => {
    return (
        <div className={styles.cityCard}>
            <p className={styles.cityName}>{city.name}, {city.temperature}°C</p>
            <p className={styles.details}>PM 10: {city.pm}</p>
            <p className={styles.details}>Wind: {city.windSpeed} m/s</p>
        </div>
    );
};

export default CityCard;
