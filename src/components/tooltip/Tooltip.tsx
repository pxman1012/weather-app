// components/Tooltip.tsx
'use client';

import React, { useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
    content: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, position = 'top' }) => {
    const [open, setOpen] = useState(false);

    return (
        <span
            className={styles.wrapper}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => setOpen(!open)}
        >
            <span className={styles.icon}>ℹ️</span>
            {open && (
                <span className={`${styles.tooltip} ${styles[position]}`}>
                    {content}
                </span>
            )}
        </span>
    );
};


export default Tooltip;