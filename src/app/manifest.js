export default function manifest() {
    return {
        name: "Pxman Weather Lite",
        short_name: "Pxman Weather",
        description:
            "Cập nhật tình hình thời tiết tại Pxman Weather",
        icons: [
            {
                src: "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
                // src: "/img/weather-icon.jpg",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
                // src: "/img/weather-icon.jpg",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
        theme_color: "#c1c1c1",
        background_color: "#c1c1c1",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        related_applications: [
            {
                platform: "play",
                url: "https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid",
                // url: "/img/weather-icon.jpg",
                id: "vn.tiki.app.tikiandroid",
            },
            {
                platform: "itunes",
                url: "https://apps.apple.com/vn/app/tiki-shopping-fast-shipping/id958100553",
                // url: "/img/weather-icon.jpg",
            },
            {
                platform: "webapp",
                url: "https://pxman-weather-app.vercel.app/manifest.json",
            },
        ],
        scope: "/",
    };
}
