// utils/translations.ts

export type Language = "en" | "vi";

type TranslationKeys = keyof (typeof translations)["en"]; // Extract valid keys from one language

const translations = {
    en: {
        title: "Pxman Weather App",
        openInNewTab: 'Open in new tab',
        placeHoderSearch: "Enter city name",
        placeHoderAddressSearch: "Enter address",
        myLocation: 'My location',
        useMyLocation: 'Use my location',
        geolocationNotSupported: 'Geolocation is not supported by your browser',
        locationPermissionDenied: 'Turn on location access to see the weather where you are',
        locationUnavailable: 'Unable to determine your current location',
        locationTimeout: 'Location request timed out',
        locationFetchFailed: 'We couldn’t get the weather for your current location',
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
        myLocation: 'Vị trí của tôi',
        useMyLocation: 'Dùng vị trí của tôi',
        geolocationNotSupported: 'Trình duyệt không hỗ trợ định vị',
        locationPermissionDenied: 'Vui lòng bật quyền vị trí để sử dụng tính năng này',
        locationUnavailable: 'Không thể xác định vị trí hiện tại',
        locationTimeout: 'Lấy vị trí quá thời gian cho phép',
        locationFetchFailed: 'Không thể lấy dữ liệu thời tiết theo vị trí',
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
