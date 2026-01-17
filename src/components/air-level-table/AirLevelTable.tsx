import { AIR_LEVEL_TEXT_KEY, AirLevelType } from '@/utils/airLevel';
import { getText } from '@/utils/translations';
import styles from './AirLevelTable.module.css';

type Props = {
    levels: readonly { level: AirLevelType; min: number; max: number }[];
    currentLevel: any;
    language: 'vi' | 'en';
};

const LEVEL_COLORS: Record<any, string> = {
    good: '#22c55e',
    medium: '#eab308',
    warning: '#f97316',
    danger: '#ef4444',
};

export default function AirLevelTable({
    levels,
    currentLevel,
    language,
}: Props) {
    return (
        <div className={styles.table}>
            {levels.map((l) => {
                const isActive = l.level === currentLevel;

                return (
                    <div
                        key={l.level}
                        className={`${styles.row} ${isActive ? styles.rowActive : ''
                            }`}
                        style={{ color: LEVEL_COLORS[l.level] }}
                    >
                        <span className={styles.label}>
                            <span
                                className={styles.dot}
                                style={{ backgroundColor: LEVEL_COLORS[l.level] }}
                            />
                            {getText(language, AIR_LEVEL_TEXT_KEY[l.level])}
                        </span>

                        <span className={styles.range}>
                            {l.max === Infinity
                                ? `> ${l.min}`
                                : `${l.min} – ${l.max}`}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
