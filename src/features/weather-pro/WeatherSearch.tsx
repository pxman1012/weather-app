'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './WeatherSearch.module.css'
import { fetchWeatherData } from './WeatherService'
import { getText } from '@/utils/translations'
import { useLanguage } from '@/context/LanguageContext'
import AddressCard from '@/components/address-card/AddressCard'
import { AddressWeather } from '@/types/address-weather-types'

const QUERY_KEY = 's'

const WeatherSearch: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { language } = useLanguage()

    const [addressName, setAddressName] = useState('')
    const [addressWeather, setAddressWeather] = useState<AddressWeather | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    /* =========================
       1. LẤY SEARCH KEY TỪ URL
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
       2. SEARCH + UPDATE URL
       ========================= */
    const handleSearch = async (value?: string) => {
        const keyword = (value ?? addressName).trim()
        if (!keyword) return

        setLoading(true)
        setError(null)

        try {
            // Update URL (không reload)
            router.replace(`/?${QUERY_KEY}=${encodeURIComponent(keyword)}`)

            const weather = await fetchWeatherData(keyword)

            if (weather) {
                setAddressWeather(weather)
            } else {
                setError(getText(language, 'addressNotFound'))
                setAddressWeather(null)
            }
        } catch (e) {
            console.log(e)
            setError(getText(language, 'addressNotFound'))
            setAddressWeather(null)
        } finally {
            setLoading(false)
        }
    }

    /* =========================
       3. ENTER TO SEARCH
       ========================= */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.weatherSearch} ${error ? styles.errorState : ''
                    }`}
            >
                <input
                    type="text"
                    value={addressName}
                    onChange={(e) => setAddressName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={getText(language, 'placeHoderAddressSearch')}
                    className={styles.input}
                />

                <button
                    onClick={() => handleSearch()}
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? '...' : getText(language, 'search')}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {addressWeather && <AddressCard address={addressWeather} />}
        </div>
    )
}

export default WeatherSearch
