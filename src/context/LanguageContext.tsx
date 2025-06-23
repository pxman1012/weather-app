// context/LanguageContext.tsx
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        localStorage.setItem('weatherLang', language === 'en' ? 'vi' : 'en')
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'vi' : 'en'));
    };

    useEffect(() => {
        const weatherLang = localStorage.getItem('weatherLang');
        if (weatherLang === 'en' || weatherLang === 'vi') {
            setLanguage(weatherLang);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook for accessing the LanguageContext easily
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
