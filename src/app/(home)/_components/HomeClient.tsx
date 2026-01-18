"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getText } from "@/utils/translations";
import LanguageToggle from "@/components/language-toggle/LanguageToggle";
import WeatherSearch from "@/features/weather-pro/WeatherSearch";

export default function Home() {
    const { language } = useLanguage();

    const handleOpenNewTab = () => {
        if (typeof window === "undefined") return;
        window.open(window.location.href, "_blank");
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-sky-300 via-emerald-400 to-amber-900">
            {/* Header */}
            <header className="w-full max-w-md flex items-center justify-between px-4 pt-6 pb-4">
                <h1 className="text-lg font-semibold text-white">
                    {getText(language, "title")}
                </h1>

                <div className="flex items-center gap-2">
                    {/* Open URL button */}
                    <button
                        onClick={handleOpenNewTab}
                        title={getText(language, 'openInNewTab')}
                        className="h-8 min-w-8 px-2 flex items-center justify-center rounded-full bg-white/20 backdrop-blur border border-white/30
                                    text-white text-sm hover:bg-white/30 active:scale-95 transition"
                    >
                        ↗
                    </button>

                    <LanguageToggle />
                </div>
            </header>

            {/* Main */}
            <main className="w-full max-w-md px-4">
                <WeatherSearch />
            </main>
        </div>
    );
}
