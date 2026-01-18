// utils/airLevel.ts
export type AirLevelType = "good" | "medium" | "warning" | "danger";

export type AirLevelTextKey =
  | "air_good"
  | "air_medium"
  | "air_warning"
  | "air_danger";

export const AIR_LEVEL_TEXT_KEY: Record<AirLevelType, AirLevelTextKey> = {
  good: "air_good",
  medium: "air_medium",
  warning: "air_warning",
  danger: "air_danger",
};

// export const AIR_LEVEL_TEXT_KEY = {
//   good: 'air_good',
//   medium: 'air_medium',
//   warning: 'air_warning',
//   danger: 'air_danger',
// } as const;

export const WHO_PM25_LEVELS = [
  { level: "good", min: 0, max: 15 },
  { level: "medium", min: 16, max: 35 },
  { level: "warning", min: 36, max: 55 },
  { level: "danger", min: 56, max: Infinity },
];

export const AQI_VN_PM25_LEVELS = [
  { level: "good", min: 0, max: 25 },
  { level: "medium", min: 26, max: 50 },
  { level: "warning", min: 51, max: 100 },
  { level: "danger", min: 101, max: Infinity },
];

export type AirLevel = "good" | "medium" | "warning" | "danger";

/* ================= WHO ================= */
/* WHO 2021 – PM2.5 24h guideline (µg/m³) */
/* PM10 dùng gần tương đương để so sánh UX */

export const WHO_LEVELS = [
  { level: "good", min: 0, max: 15 },
  { level: "medium", min: 16, max: 35 },
  { level: "warning", min: 36, max: 55 },
  { level: "danger", min: 56, max: Infinity },
] as const;

export function getWhoLevel(value: number): AirLevel {
  if (value <= 15) return "good";
  if (value <= 35) return "medium";
  if (value <= 55) return "warning";
  return "danger";
}

/* ================= AQI VIỆT NAM ================= */
/* Quy chuẩn VN (QCVN 05:2013/BTNMT + AQI) */

export const AQI_VN_LEVELS = [
  { level: "good", min: 0, max: 50 },
  { level: "medium", min: 51, max: 100 },
  { level: "warning", min: 101, max: 150 },
  { level: "danger", min: 151, max: Infinity },
] as const;

export function getAqiVNLevel(value: number): AirLevel {
  if (value <= 50) return "good";
  if (value <= 100) return "medium";
  if (value <= 150) return "warning";
  return "danger";
}
