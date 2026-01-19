'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './WeatherSearch.module.css'
import { fetchWeatherByCoords, fetchWeatherData } from './WeatherService'
import { getText } from '@/utils/translations'
import { useLanguage } from '@/context/LanguageContext'
import AddressCard from '@/components/address-card/AddressCard'
import { AddressWeather } from '@/types/address-weather-types'

import { useDebounce } from '@/hooks/useDebounce'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import SearchSuggestion from '@/components/search-suggestion/SearchSuggestion'
import { LocationIcon } from '@/components/icon/LocationIcon'
import { SearchIcon } from '@/components/icon/SearchIcon'

/* =========================
   CONSTANTS
   ========================= */
const QUERY_KEY = 's'
const MY_LOCATION_KEY = 'my-location'

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

    const debouncedValue = useDebounce(addressName, 300)

    const {
        history,
        saveHistory,
        getRecent,
        filterHistory,
        removeHistory
    } = useSearchHistory()

    /* =========================
       1. INIT FROM URL
       ========================= */
    useEffect(() => {
        const searchKey = searchParams.get(QUERY_KEY)
        if (!searchKey) return

        if (searchKey === MY_LOCATION_KEY) {
            handleGetCurrentLocation()
            return
        }

        setAddressName(searchKey)
        handleSearch(searchKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* =========================
       2. DEBOUNCE FILTER
       ========================= */
    useEffect(() => {
        if (!isFocused) return

        const keyword = debouncedValue.trim()

        if (!keyword) {
            setSuggestions(getRecent())
            return
        }

        setSuggestions(filterHistory(keyword))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, isFocused, history])

    /* =========================
       3. SEARCH BY KEYWORD
       ========================= */
    const handleSearch = async (value?: string) => {
        const keyword = (value ?? addressName).trim()

        // ⛔ chặn search my-location
        if (!keyword || keyword === MY_LOCATION_KEY) return

        setLoading(true)
        setError(null)
        setSuggestions([])
        setIsFocused(false)

        inputRef.current?.blur()

        try {
            const params = new URLSearchParams(searchParams.toString())
            params.set(QUERY_KEY, keyword)
            router.replace(`/?${params.toString()}`)

            const weather = await fetchWeatherData(keyword)

            if (weather) {
                setAddressWeather(weather)
                saveHistory(keyword)
            } else {
                setError(getText(language, 'addressNotFound'))
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
       4. GET CURRENT LOCATION
       ========================= */
    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError(getText(language, 'geolocationNotSupported'))
            return
        }

        setLoading(true)
        setError(null)
        setSuggestions([])
        setIsFocused(false)
        inputRef.current?.blur()

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords

                    const params = new URLSearchParams(searchParams.toString())
                    params.set(QUERY_KEY, MY_LOCATION_KEY)
                    router.replace(`/?${params.toString()}`)

                    const weather = await fetchWeatherByCoords(latitude, longitude)

                    if (weather) {
                        setAddressWeather(weather)
                        setAddressName('')
                    } else {
                        setError(getText(language, 'addressNotFound'))
                        setAddressWeather(null)
                    }
                } catch (err) {
                    console.error(err)
                    setError(getText(language, 'locationFetchFailed'))
                    setAddressWeather(null)
                } finally {
                    setLoading(false)
                }
            },
            (geoError) => {
                console.error(geoError)

                switch (geoError.code) {
                    case geoError.PERMISSION_DENIED:
                        setError(getText(language, 'locationPermissionDenied'))
                        break
                    case geoError.POSITION_UNAVAILABLE:
                        setError(getText(language, 'locationUnavailable'))
                        break
                    case geoError.TIMEOUT:
                        setError(getText(language, 'locationTimeout'))
                        break
                    default:
                        setError(getText(language, 'locationFetchFailed'))
                }

                setLoading(false)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )
    }

    /* =========================
       5. INPUT EVENTS
       ========================= */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleFocus = () => {
        setIsFocused(true)
        setSuggestions(getRecent())
    }

    const handleBlur = () => {
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
    }

    /* =========================
       6. RENDER
       ========================= */
    return (
        <div className={styles.container}>
            <div
                className={`${styles.weatherSearch} ${
                    error ? styles.errorState : ''
                }`}
            >
                <div className={styles.inputWrapper}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={addressName}
                        onChange={(e) => setAddressName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={getText(language, 'placeHoderAddressSearch')}
                        className={styles.input}
                    />

                    {addressName && (
                        <button
                            type="button"
                            className={styles.clearButton}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setAddressName('')
                                setSuggestions(getRecent())
                                inputRef.current?.focus()
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.iconButton}
                    onClick={handleGetCurrentLocation}
                    title={getText(language, 'useMyLocation')}
                    disabled={loading}
                >
                    <LocationIcon />
                </button>

                <button
                    onClick={() => handleSearch()}
                    className={styles.button}
                    disabled={loading}
                    title={getText(language, 'search')}
                >
                    {loading ? '…' : <SearchIcon />}
                </button>

                {isFocused && (
                    <SearchSuggestion
                        suggestions={suggestions}
                        onSelect={handleSelectSuggestion}
                        onRemove={handleRemoveSuggestion}
                    />
                )}
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {addressWeather && <AddressCard address={addressWeather} />}
        </div>
    )
}

export default WeatherSearch
