import React, { RefObject } from 'react'
import styles from './WeatherSearch.module.css'
import SearchSuggestion from '@/components/search-suggestion/SearchSuggestion'

interface Props {
    inputRef: RefObject<HTMLInputElement>
    value: string
    placeholder: string
    suggestions: string[]
    isFocused: boolean
    onChange: (v: string) => void
    onSearch: () => void
    onFocus: () => void
    onBlur: () => void
    onClear: () => void
    onSelectSuggestion: (v: string) => void
    onRemoveSuggestion: (v: string) => void
}

const WeatherSearchInput: React.FC<Props> = ({
    inputRef,
    value,
    placeholder,
    suggestions,
    isFocused,
    onChange,
    onSearch,
    onFocus,
    onBlur,
    onClear,
    onSelectSuggestion,
    onRemoveSuggestion
}) => {
    return (
        <div className={styles.inputWrapper}>
            <input
                ref={inputRef}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                onFocus={onFocus}
                onBlur={onBlur}
                className={styles.input}
            />

            {value && (
                <button
                    type="button"
                    className={styles.clearButton}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onClear}
                    aria-label="Clear input"
                >
                    ✕
                </button>
            )}

            {isFocused && (
                <SearchSuggestion
                    suggestions={suggestions}
                    onSelect={onSelectSuggestion}
                    onRemove={onRemoveSuggestion}
                />
            )}
        </div>
    )
}

export default WeatherSearchInput
