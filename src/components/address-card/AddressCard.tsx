// components/AddressCard.tsx

'use client';

import React, { useState } from 'react';
import styles from './AddressCard.module.css'; // Import CSS module
import { getText } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';
import { AddressWeather } from '@/types/address-weather-types';

type AddressCardProps = {
    // address: any;
    address: AddressWeather;
};

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
    const { language } = useLanguage(); // Access language from context
    const [more, setMore] = useState(false);

    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString();
    };

    return (
        <div className={styles.addressCard}>
            <p className={styles.addressName}>
                {address?.name}, {address?.temperature}°C
            </p>
            <div>
                <p className={styles.details}>{getText(language, 'wind')}: {address?.windSpeed} m/s</p>
                <p className={styles.details}>{getText(language, 'humidity')}: {address?.humidity}%</p>
                <p className={styles.details}>{getText(language, 'cloudiness')}: {address?.cloudiness}%</p>
                <p className={styles.details}>{getText(language, 'feelsLike')}: {address?.feelsLike}°C</p>
                <p className={styles.details}>{getText(language, 'pm')}: {address?.pm}</p>

                {more && (
                    <>
                        <p className={styles.details}>{getText(language, 'pm25')}: {address?.pm25}</p>
                        <p className={styles.details}>{getText(language, 'minTemp')}: {address?.tempMin}°C</p>
                        <p className={styles.details}>{getText(language, 'maxTemp')}: {address?.tempMax}°C</p>
                        <p className={styles.details}>{getText(language, 'pressure')}: {address?.pressure} hPa</p>
                        <p className={styles.details}>{getText(language, 'visibility')}: {address?.visibility / 1000} km</p>
                        <p className={styles.details}>{getText(language, 'sunrise')}: {formatTime(address?.sunrise)}</p>
                        <p className={styles.details}>{getText(language, 'sunset')}: {formatTime(address?.sunset)}</p>
                    </>
                )}

                <button
                    className={styles.toggleButton}
                    onClick={() => setMore(!more)}
                >
                    {more ? getText(language, 'showLess') : getText(language, 'showMore')}
                </button>
            </div>
        </div>
    );
};

export default AddressCard;
