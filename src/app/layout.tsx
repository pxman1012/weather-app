import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import GoogleAnalytics from "./google-analytics";
import AdSense from "@/components/AdSense";
import type { Metadata } from "next";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        default: "Pxman Weather",
        template: "%s | Pxman Weather",
    },
    description: "Cung cấp thông tin thời tiết mọi nơi hàng ngày",
    keywords: ["Pxman Weather", "pxman", "weather"],
    referrer: "origin-when-cross-origin",
    verification: {
        google: "1bnjDunz3YqNb_w_wruOxg7AL-0KCoC4_tKPdNGNtO4",
    },
    openGraph: {
        title: "Pxman Weather",
        description: "Xem thời tiết hàng ngày",
        images: [
            "https://gitlab.com/public-store/share-asset/-/raw/main/weather-icon.jpg",
        ],
        type: "website",
        siteName: "Pxman Weather",
    },
    themeColor: "#000000",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <head>
                <AdSense pId={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID} />
            </head>
            <GoogleAnalytics
                GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
            />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <LanguageProvider>{children}</LanguageProvider>
            </body>
        </html>
    );
}
