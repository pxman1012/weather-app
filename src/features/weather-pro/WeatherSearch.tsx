'use client'

import React, { useMemo } from 'react'
import styles from './WeatherSearch.module.css'

import { useLanguage } from '@/context/LanguageContext'
import { getText } from '@/utils/translations'

import WeatherSearchInput from './WeatherSearchInput'
import AddressCard from '@/components/address-card/AddressCard'
import { LocationIcon } from '@/components/icon/LocationIcon'
import { SearchIcon } from '@/components/icon/SearchIcon'
import { useWeatherSearchController } from '@/hooks/useWeatherSearchController'

const WeatherSearch: React.FC = () => {
    const { language } = useLanguage()
    const c = useWeatherSearchController()

    /* =========================
       ERROR TEXT (i18n)
       ========================= */
    const errorMessage = useMemo(() => {
        if (!c.errorCode) return null

        switch (c.errorCode) {
            case 'ADDRESS_NOT_FOUND':
                return getText(language, 'addressNotFound')
            case 'LOCATION_PERMISSION_DENIED':
                return getText(language, 'locationPermissionDenied')
            case 'LOCATION_UNAVAILABLE':
                return getText(language, 'locationUnavailable')
            case 'LOCATION_TIMEOUT':
                return getText(language, 'locationTimeout')
            default:
                return getText(language, 'locationFetchFailed')
        }
    }, [c.errorCode, language])

    return (
        <div className={styles.container}>
            <div
                className={`${styles.weatherSearch} ${errorMessage ? styles.errorState : ''
                    }`}
            >
                <WeatherSearchInput
                    inputRef={c.inputRef}
                    value={c.addressName}
                    placeholder={getText(language, c.placeholderKey)}
                    suggestions={c.suggestions}
                    isFocused={c.isFocused}
                    onChange={(v) => c.handleTyping(v)}
                    onSearch={() => c.handleSearch()}
                    onFocus={c.handleFocus}
                    onBlur={c.handleBlur}
                    onClear={c.handleClearInput}
                    onSelectSuggestion={c.handleSearch}
                    onRemoveSuggestion={c.removeHistory}
                />

                <button
                    type="button"
                    className={styles.iconButton}
                    onClick={c.handleGetCurrentLocation}
                    disabled={c.loading}
                    title={getText(language, 'useMyLocation')}
                >
                    <LocationIcon />
                </button>

                <button
                    type="button"
                    className={styles.button}
                    onClick={() => c.handleSearch()}
                    disabled={c.loading}
                    title={getText(language, 'search')}
                >
                    {c.loading ? '…' : <SearchIcon />}
                </button>
            </div>

            {errorMessage && (
                <p className={styles.error}>{errorMessage}</p>
            )}

            {c.weather && <AddressCard address={c.weather} />}
        </div>
    )
}

export default WeatherSearch
