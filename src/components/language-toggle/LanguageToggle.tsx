"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageToggle.module.css";

const LanguageToggle: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { language, toggleLanguage } = useLanguage();

    const handleChangeLang = (lang: "vi" | "en") => {
        if (lang === language) return;

        // Clone current query params
        const params = new URLSearchParams(searchParams.toString());
        params.set("lang", lang);

        // Update URL (no full reload)
        router.push(`${pathname}?${params.toString()}`);

        // Sync context
        toggleLanguage(lang);
    };

    return (
        <div className={styles.languageToggle}>
            <div
                className={`${styles.tab} ${language === "vi" ? styles.active : ""}`}
                onClick={() => handleChangeLang("vi")}
            >
                VI
            </div>

            <div
                className={`${styles.tab} ${language === "en" ? styles.active : ""}`}
                onClick={() => handleChangeLang("en")}
            >
                EN
            </div>
        </div>
    );
};

export default LanguageToggle;
