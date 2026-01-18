import React from 'react'
import styles from './SearchSuggestion.module.css'

interface Props {
    suggestions: string[]
    onSelect: (value: string) => void
    onRemove: (value: string) => void
}

const SearchSuggestion: React.FC<Props> = ({
    suggestions,
    onSelect,
    onRemove,
}) => {
    if (!suggestions.length) return null

    return (
        <ul className={styles.suggestionList}>
            {suggestions.map((item) => (
                <li
                    key={item}
                    className={styles.suggestionItem}
                >
                    <span
                        className={styles.suggestionText}
                        onMouseDown={() => onSelect(item)}
                    >
                        {item}
                    </span>

                    <button
                        className={styles.removeBtn}
                        onMouseDown={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onRemove(item)
                        }}
                        aria-label="Remove"
                    >
                        ❌
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default SearchSuggestion
