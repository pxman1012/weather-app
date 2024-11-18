// features/weather/types.ts

export interface AddressWeather {
    name: string;          // Tên thành phố
    pm: number;            // PM10 (Chỉ số bụi mịn PM10)
    pm25: number;          // PM2.5 (Chỉ số bụi mịn PM2.5)
    temperature: number;   // Nhiệt độ hiện tại (Celsius)
    windSpeed: number;     // Tốc độ gió (m/s)
    country: string;       // Mã quốc gia (Ví dụ: "VN" cho Việt Nam)
    feelsLike: number;     // Nhiệt độ cảm giác (Celsius)
    tempMin: number;       // Nhiệt độ thấp nhất (Celsius)
    tempMax: number;       // Nhiệt độ cao nhất (Celsius)
    pressure: number;      // Áp suất không khí (hPa)
    humidity: number;      // Độ ẩm (%) 
    cloudiness: number;    // Tỷ lệ mây (mưa) (%) 
    visibility: number;    // Tầm nhìn (m) 
    sunrise: number;       // Thời gian mặt trời mọc (Unix timestamp)
    sunset: number;        // Thời gian mặt trời lặn (Unix timestamp)
}