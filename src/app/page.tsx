// 'use client'

import React from 'react';
import WeatherSearch from '../features/weather/WeatherSearch';
// import WeatherApp from '../components/weather/WeatherApp';

export default function Home() {
  return (
    <div className='w-full h-screen m-auto bg-gradient-to-b from-blue-300 via-green-400 to-yellow-950'>
      <h1 className='font-bold p-2'>Weather App</h1>
      <WeatherSearch />

      {/* <WeatherApp /> */}
    </div>
  );
}
