import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import GoogleAnalytics from './google-analytics'
import AdSense from '@/components/AdSense'

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

export const metadata = {
    // robots: { index: false, follow: false },
    title: 'Pxman Weather',
    // description: 'Providing weather infomation in the world every day',
    description: 'Cung cấp thông tin thời tiết mọi nơi hàng ngày',
    referrer: 'origin-when-cross-origin',
    keywords: ['Pxman Weather', 'pxman weather', 'pxman weather', 'pxman', 'weather'],
    // verification: { google: "KwBfMRUHLxoVSRgslxDNpA6i5Or_MQuECQVzYNJKDsE", },
    verification: { google: "1bnjDunz3YqNb_w_wruOxg7AL-0KCoC4_tKPdNGNtO4", },
    openGraph: {
        title: "Pxman Weather",
        description:
            "Xem thời tiết hàng ngày",
        // images: [`https://gitlab.com/public-store/share-asset/-/raw/main/weather-logo.png`],
        images: [`https://gitlab.com/public-store/share-asset/-/raw/main/weather-icon.jpg`],
        type: "website",
        siteName: "Pxman Weather", // Thêm thuộc tính site_name vào openGraph
    },
    themeColor: "#000000"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Google AdSense */}
                {/* <Script
                    async
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
                    crossorigin="anonymous"
                    // strategy="afterInteractive"
                    strategy="lazyOnload"
                /> */}
                <AdSense pId={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}/>
                {/* <AdSense pId="ca-pub-1234567890123456"/> */}
            </head>
            <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}
