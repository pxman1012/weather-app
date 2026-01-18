// utils/translations.ts

export type Language = "en" | "vi";

type TranslationKeys = keyof (typeof translations)["en"]; // Extract valid keys from one language

const translations = {
    en: {
        title: "Pxman Weather App",
        openInNewTab: 'Open in new tab',
        placeHoderSearch: "Enter city name",
        placeHoderAddressSearch: "Enter address",
        search: "Search",
        addressNotFound: "Address not found",
        pm: "PM 10",
        wind: "Wind",
        humidity: "Humidity",
        cloudiness: "Cloudiness",
        feelsLike: "Feels Like",
        pm25: "PM 2.5",
        minTemp: "Min Temperature",
        maxTemp: "Max Temperature",
        pressure: "Pressure",
        visibility: "Visibility",
        sunrise: "Sunrise",
        sunset: "Sunset",
        showMore: "Show More",
        showLess: "Show Less",

        air_good: "Good",
        air_medium: "Moderate",
        air_warning: "Unhealthy",
        air_danger: "Hazardous",

        aqi_vn: "AQI Vietnam",
        who: "WHO",
    },
    vi: {
        title: "Dự báo thời tiết",
        openInNewTab: 'Mở trong tab mới',
        placeHoderSearch: "Nhập tên thành phố",
        placeHoderAddressSearch: "Nhập địa điểm",
        search: "Tìm kiếm",
        addressNotFound: "Địa chỉ không tồn tại",
        pm: "Bụi thô < 10μm",
        wind: "Gió",
        humidity: "Độ ẩm",
        cloudiness: "Mây (khả năng mưa)",
        feelsLike: "Cảm giác như",
        pm25: "Bụi mịn < 2.5μm",
        minTemp: "Nhiệt độ tối thiểu",
        maxTemp: "Nhiệt độ tối đa",
        pressure: "Áp suất",
        visibility: "Tầm nhìn",
        sunrise: "Bình minh",
        sunset: "Hoàng hôn",
        showMore: "Hiện Thêm",
        showLess: "Ẩn Bớt",

        air_good: 'Tốt',
        air_medium: 'Trung bình',
        air_warning: 'Cảnh báo',
        air_danger: 'Nguy hiểm',

        aqi_vn: 'AQI Việt Nam',
        who: 'WHO',
    },
};

export const getText = (language: Language, key: TranslationKeys): string => {
    return translations[language][key];
};
