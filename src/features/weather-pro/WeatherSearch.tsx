'use client'

import React, { useEffect, useRef, useState, } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './WeatherSearch.module.css'
import { fetchWeatherData } from './WeatherService'
import { getText } from '@/utils/translations'
import { useLanguage } from '@/context/LanguageContext'
import AddressCard from '@/components/address-card/AddressCard'
import { AddressWeather } from '@/types/address-weather-types'

import { useDebounce } from '@/hooks/useDebounce'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import SearchSuggestion from '@/components/search-suggestion/SearchSuggestion'
const QUERY_KEY = 's'

const WeatherSearch: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { language } = useLanguage()

    const inputRef = useRef<HTMLInputElement>(null)

    const [addressName, setAddressName] = useState('')
    const [addressWeather, setAddressWeather] =
        useState<AddressWeather | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isFocused, setIsFocused] = useState(false)

    const debouncedValue = useDebounce(addressName, 2000)

    const {
        history,
        saveHistory,
        getRecent,
        filterHistory,
        removeHistory
    } = useSearchHistory()

    /* =========================
       1. INIT SEARCH FROM URL
       ========================= */
    useEffect(() => {
        const searchKey = searchParams.get(QUERY_KEY)
        if (searchKey) {
            setAddressName(searchKey)
            handleSearch(searchKey)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* =========================
       2. DEBOUNCE FILTER (CHỈ KHI FOCUS)
       ========================= */
    useEffect(() => {
        if (!isFocused) return

        const keyword = debouncedValue.trim()

        // 🔥 rỗng → show 5 recent
        if (!keyword) {
            setSuggestions(getRecent())
            return
        }

        // 🔥 có text → filter
        setSuggestions(filterHistory(keyword))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, isFocused, history])

    /* =========================
       3. SEARCH
       ========================= */
    const handleSearch = async (value?: string) => {
        const keyword = (value ?? addressName).trim()
        if (!keyword) return

        setLoading(true)
        setError(null)
        setSuggestions([])
        setIsFocused(false)

        // blur input khi search
        inputRef.current?.blur()

        try {
            router.replace(
                `/?${QUERY_KEY}=${encodeURIComponent(keyword)}`
            )

            const weather = await fetchWeatherData(keyword)

            if (weather) {
                setAddressWeather(weather)
                saveHistory(keyword)
            } else {
                setError(
                    getText(language, 'addressNotFound')
                )
                setAddressWeather(null)
            }
        } catch (e) {
            console.error(e)
            setError(getText(language, 'addressNotFound'))
            setAddressWeather(null)
        } finally {
            setLoading(false)
        }
    }

    /* =========================
       4. EVENTS
       ========================= */
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleFocus = () => {
        setIsFocused(true)
        setSuggestions(getRecent())
    }

    const handleBlur = () => {
        // delay để click suggestion vẫn hoạt động
        setTimeout(() => {
            setIsFocused(false)
            setSuggestions([])
        }, 150)
    }

    const handleSelectSuggestion = (value: string) => {
        setAddressName(value)
        setSuggestions([])
        setIsFocused(false)
        handleSearch(value)
    }

    const handleRemoveSuggestion = (value: string) => {
        removeHistory(value)

        // // refresh suggestions đang hiển thị
        // const keyword = addressName.trim()
        // if (!keyword) {
        //     setSuggestions(getRecent())
        // } else {
        //     setSuggestions(filterHistory(keyword))
        // }
    }


    /* =========================
       5. RENDER
       ========================= */
    return (
        <div className={styles.container}>
            <div
                className={`${styles.weatherSearch} ${error ? styles.errorState : ''
                    }`}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={addressName}
                    onChange={(e) =>
                        setAddressName(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={getText(
                        language,
                        'placeHoderAddressSearch'
                    )}
                    className={styles.input}
                />

                <button
                    onClick={() => handleSearch()}
                    className={styles.button}
                    disabled={loading}
                >
                    {loading
                        ? '...'
                        : getText(language, 'search')}
                </button>

                {isFocused && (
                    <SearchSuggestion
                        suggestions={suggestions}
                        onSelect={handleSelectSuggestion}
                        onRemove={handleRemoveSuggestion}
                    />
                )}
            </div>

            {error && (
                <p className={styles.error}>{error}</p>
            )}

            {addressWeather && (
                <AddressCard address={addressWeather} />
            )}
        </div>
    )
}

export default WeatherSearch
