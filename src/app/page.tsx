// 'use client'

import React from 'react';
import WeatherSearch from '../features/weather/WeatherSearch';
// import WeatherApp from '../components/weather/WeatherApp';

export default function Home() {
  return (
    <div className='w-[400px] m-auto bg-blue-300 p-2 my-2'>
      <h1>Weather App</h1>
      <WeatherSearch />

      {/* <WeatherApp /> */}
    </div>
  );
}
