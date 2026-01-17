import Tooltip from '@/components/tooltip/Tooltip';
import AirLevelTable from '@/components/air-level-table/AirLevelTable';

import {
    getAqiVNLevel,
    getWhoLevel,
    AQI_VN_LEVELS,
    WHO_LEVELS,
    AirLevel,
} from '@/utils/airLevel';
import styles from './AirQualityItem.module.css';

type Props = {
    label: string;
    value: number;
    language: 'vi' | 'en';
};

export default function AirQualityItem({ label, value, language }: Props) {
    const isVI = language === 'vi';

    const primaryLevel: AirLevel = isVI
        ? getAqiVNLevel(value)
        : getWhoLevel(value);
    // console.log({value, primaryLevel});

    const secondaryLevels = !isVI ? WHO_LEVELS : AQI_VN_LEVELS;

    const secondaryLevel = !isVI
        ? getWhoLevel(value)
        : getAqiVNLevel(value);

    return (
        <div className={`${styles.pmItem} ${styles[primaryLevel]}`}>
            🌫 {label}: {value}

            <Tooltip
                content={
                    <>
                        <strong>{!isVI ? 'WHO guideline' : 'AQI Việt Nam'}</strong>

                        <AirLevelTable
                            levels={secondaryLevels}
                            currentLevel={secondaryLevel}
                            language={language}
                        />
                    </>
                }
            />
        </div>
    );
}
