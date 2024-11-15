// components/LanguageToggle.tsx

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageToggle.module.css"; // Import CSS module for styling

const LanguageToggle: React.FC = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className={styles.languageToggle}>
            <div
                className={`${styles.tab} ${language === "vi" ? styles.active : ""
                    }`}
                onClick={() => language !== "vi" && toggleLanguage()}
            >
                VI
            </div>
            {/* <span className={styles.separator}>|</span> */}
            <div
                className={`${styles.tab} ${language === "en" ? styles.active : ""
                    }`}
                onClick={() => language !== "en" && toggleLanguage()}
            >
                EN
            </div>
        </div>
    );
};

export default LanguageToggle;
