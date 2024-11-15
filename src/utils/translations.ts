// utils/translations.ts

export type Language = 'en' | 'vi';

type TranslationKeys = keyof typeof translations["en"]; // Extract valid keys from one language

const translations = {
    en: {
        title: 'Weather App',
        placeHoderSearch: 'Enter city name',
        search: 'Search',
        pm: 'PM 10',
        wind: 'Wind',
        humidity: 'Humidity',
        cloudiness: 'Cloudiness',
        feelsLike: 'Feels Like',
        pm25: 'PM 2.5',
        minTemp: 'Min Temperature',
        maxTemp: 'Max Temperature',
        pressure: 'Pressure',
        visibility: 'Visibility',
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        showMore: 'Show More',
        showLess: 'Show Less',
    },
    vi: {
        title: 'Dự báo thời tiết',
        placeHoderSearch: 'Nhập tên thành phố',
        search: 'Tìm kiếm',
        pm: 'Bụi thô < 10μm',
        wind: 'Gió',
        humidity: 'Độ ẩm',
        cloudiness: 'Mây (khả năng mưa)',
        feelsLike: 'Cảm giác như',
        pm25: 'Bụi mịn < 2.5μm',
        minTemp: 'Nhiệt độ tối thiểu',
        maxTemp: 'Nhiệt độ tối đa',
        pressure: 'Áp suất',
        visibility: 'Tầm nhìn',
        sunrise: 'Bình minh',
        sunset: 'Hoàng hôn',
        showMore: 'Hiện Thêm',
        showLess: 'Ẩn Bớt',
    },
};

export const getText = (language: Language, key: TranslationKeys): string => {
    return translations[language][key];
};
