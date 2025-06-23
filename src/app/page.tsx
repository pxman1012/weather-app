'use client'

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getText } from '@/utils/translations';
import LanguageToggle from '@/components/language-toggle/LanguageToggle';
// import WeatherApp from '../components/weather/WeatherApp';
// import WeatherSearch from '../features/weather/WeatherSearch';
import WeatherSearch from '@/features/weather-pro/WeatherSearch';

export default function Home() {
  const { language } = useLanguage(); // Access language from context

  return (
    <div className='w-full h-screen m-auto bg-gradient-to-b from-blue-300 via-green-400 to-yellow-950'>
      <h1 className='font-bold p-2'>{getText(language, 'title')}</h1>
      <div className='m-auto w-fit'>
        <LanguageToggle />
      </div>

      <WeatherSearch />

      {/* <WeatherApp /> */}
    </div>
  );
}
