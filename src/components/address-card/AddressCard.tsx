'use client';

import React, { useEffect, useState } from 'react';
import styles from './AddressCard.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { getText } from '@/utils/translations';
import { AddressWeather } from '@/types/address-weather-types';
import AirQualityItem from '@/components/air-quality-item/AirQualityItem';

type Props = {
    address: AddressWeather;
};

export default function AddressCard({ address }: Props) {
    const { language } = useLanguage();
    const [more, setMore] = useState(false);

    useEffect(() => {
        setMore(localStorage.getItem('weatherMore') === '1');
    }, []);

    const formatTime = (t: number) =>
        new Date(t * 1000).toLocaleTimeString();

    const getTempClass = (temp: number) => {
        if (temp <= 18) return styles.tempCold;
        if (temp <= 28) return styles.tempWarm;
        return styles.tempHot;
    };


    return (
        <div className={styles.card}>
            {/* Header */}
            <div className={styles.header}>
                <p className={styles.location}>
                    📍{' '}
                    {address.isCurrentLocation && (
                        <>
                            <span className={styles.myLocation}>
                                ({getText(language, 'myLocation')})
                            </span><br />
                        </>
                    )}
                    {address.name}
                </p>

                <div className={styles.tempRow}>
                    <span className={styles.temp}>
                        <span className={`${styles.temp} ${getTempClass(address.temperature)}`}>
                            {address.temperature}°C
                        </span>
                    </span>

                    <span className={styles.feels}>
                        {getText(language, 'feelsLike')}: {address.feelsLike}°C
                    </span>
                </div>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
                <div className={styles.item}>
                    💨 {getText(language, 'wind')}: {address.windSpeed} m/s
                </div>

                <div className={styles.item}>
                    💧 {getText(language, 'humidity')}: {address.humidity}%
                </div>

                <div className={styles.item}>
                    ☁️ {getText(language, 'cloudiness')}: {address.cloudiness}%
                </div>

                <div className={styles.item}>
                    👁 {getText(language, 'visibility')}:{' '}
                    {address.visibility / 1000} km
                </div>
            </div>

            {/* Air quality */}
            <div className={`${styles.pmItemBox}`}>
                <AirQualityItem
                    label={getText(language, 'pm')}
                    value={address.pm}
                    language={language}
                />

                <AirQualityItem
                    label={getText(language, 'pm25')}
                    value={address.pm25}
                    language={language}
                />
            </div>

            {more && (
                <div className={styles.extra}>
                    <span>
                        🌅 {getText(language, 'sunrise')}: {formatTime(address.sunrise)}
                    </span>

                    <span>
                        🌇 {getText(language, 'sunset')}: {formatTime(address.sunset)}
                    </span>
                </div>
            )}

            <button
                className={styles.toggle}
                onClick={() => {
                    localStorage.setItem('weatherMore', more ? '0' : '1');
                    setMore(!more);
                }}
            >
                {more
                    ? getText(language, 'showLess')
                    : getText(language, 'showMore')}
            </button>
        </div>
    );
}
