import type { Metadata } from "next";
import HomeClient from "./_components/HomeClient";
import { Suspense } from "react";

type Props = {
    searchParams: { s?: string; lang?: string };
};

const SEO_TEXT = {
    vi: {
        searchTitle: (q: string) => q,
        searchDesc: (q: string) => `Dự báo thời tiết ${q}`,
        defaultDesc: "Dự báo thời tiết hàng ngày",
    },
    en: {
        searchTitle: (q: string) => q,
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
        ].filter((v): v is string => Boolean(v)),
    };
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <HomeClient />
        </Suspense>
    );
}
