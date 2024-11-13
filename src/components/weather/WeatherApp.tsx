'use client'

import React, { useState } from 'react';
import styles from './WeatherApp.module.css';

type CityWeather = {
    name: string;
    temperature: number;
    pm: number;
    wind: number;
};

const citiesData: CityWeather[] = [
    { name: 'Pushchino', temperature: 4, pm: 132, wind: 2 },
    { name: 'Aleksin', temperature: 8, pm: 115, wind: 1 },
    { name: 'Chekhov', temperature: 5, pm: 42, wind: 2 },
];

export default function WeatherApp() {
    const [cities, setCities] = useState<CityWeather[]>(citiesData);
    const [minTemperature, setMinTemperature] = useState<number>(0);

    const handleRemoveCity = (cityName: string) => {
        setCities(cities.filter(city => city.name !== cityName));
    };

    const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinTemperature(Number(event.target.value));
    };

    const filteredCities = cities.filter(city => city.temperature >= minTemperature);

    return (
        <div className="weather-app">
            <div className="header">
                <p>Select a city</p>
            </div>
            <div className="temperature-slider">
                <span>Warmer than</span>
                <input type="range" min="0" max="10" value={minTemperature} onChange={handleTemperatureChange} />
            </div>
            <div className="city-list">
                {filteredCities.map((city) => (
                    <div key={city.name} className="city-card">
                        <p className="city-name">{city.name}, {city.temperature}°C</p>
                        <p className="pm-info">PM 10: {city.pm}</p>
                        <p className="wind-info">Wind: {city.wind} m/s</p>
                        <button className="remove-button" onClick={() => handleRemoveCity(city.name)}>✖</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
