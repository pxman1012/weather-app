'use client'

import React, { Suspense } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getText } from '@/utils/translations'
import LanguageToggle from '@/components/language-toggle/LanguageToggle'
import WeatherSearch from '@/features/weather-pro/WeatherSearch'

export default function Home() {
    const { language } = useLanguage()

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-sky-300 via-emerald-400 to-amber-900">
            <header className="w-full max-w-md flex items-center justify-between px-4 pt-6 pb-4">
                <h1 className="text-lg font-semibold text-white">
                    {getText(language, 'title')}
                </h1>
                <LanguageToggle />
            </header>

            <main className="w-full max-w-md px-4">
                <Suspense fallback={null}>
                    <WeatherSearch />
                </Suspense>
            </main>
        </div>
    )
}
