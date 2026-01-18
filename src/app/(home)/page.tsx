import type { Metadata } from "next";
import HomeClient from "./_components/HomeClient";

type Props = {
    searchParams: { s?: string; lang?: string };
};

// Translation SEO (SERVER-SIDE)
const SEO_TEXT = {
    vi: {
        searchTitle: (q: string) => `${q} | Dự báo thời tiết`,
        searchDesc: (q: string) => `Dự báo thời tiết ${q}`,
        defaultDesc: "Dự báo thời tiết hàng ngày",
    },
    en: {
        searchTitle: (q: string) => `${q} | Weather forecast`,
        searchDesc: (q: string) => `Weather forecast for ${q}`,
        defaultDesc: "Daily weather forecast",
    },
};

export async function generateMetadata(
    { searchParams }: Props
): Promise<Metadata> {
    const keyword = searchParams?.s?.trim();
    const lang = searchParams?.lang === "en" ? "en" : "vi";
    const t = SEO_TEXT[lang];

    return {
        title: keyword ? t.searchTitle(keyword) : undefined,
        description: keyword
            ? t.searchDesc(keyword)
            : t.defaultDesc,
        keywords: [
            "Pxman Weather",
            "weather forecast",
            keyword,
        ].filter(Boolean),
    };
}

export default function Page() {
    return <HomeClient />;
}
