export const LocationIcon = ({ size = 34 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 3 24 22"   // 👈 dịch lên 1px, cắt đáy
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 21.2c-1.9-2.2-4.8-6-4.8-9.4a4.8 4.8 0 1 1 9.6 0c0 3.4-2.9 7.2-4.8 9.4z" />
        <circle cx="12" cy="11.5" r="1.9" />
    </svg>
)
