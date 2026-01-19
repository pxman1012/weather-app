'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useDebounce } from '@/hooks/useDebounce'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { useWeatherSearch } from '@/hooks/useWeatherSearch'
import { useCurrentLocation } from '@/hooks/useCurrentLocation'

const QUERY_KEY = 's'
const MY_LOCATION_KEY = 'my-location'

type PlaceholderKey =
    | 'myLocation'
    | 'placeHoderAddressSearch'

export const useWeatherSearchController = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const inputRef = useRef<HTMLInputElement>(null)

    /* =========================
       STATE
       ========================= */
    const [addressName, setAddressName] = useState('')
    const [isMyLocation, setIsMyLocation] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isFocused, setIsFocused] = useState(false)

    const debouncedValue = useDebounce(addressName, 300)

    /* =========================
       DOMAIN HOOKS
       ========================= */
    const historyApi = useSearchHistory()
    const weatherApi = useWeatherSearch()
    const locationApi = useCurrentLocation()

    const {
        history,
        saveHistory,
        getRecent,
        filterHistory,
        removeHistory
    } = historyApi

    const {
        weather,
        loading,
        errorCode,
        searchByKeyword,
        clearError,
        setWeatherManually
    } = weatherApi

    const { getCurrentWeather } = locationApi

    /* =========================
       INIT FROM URL
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
       DEBOUNCE SUGGESTIONS
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
       ACTIONS
       ========================= */
    const syncUrl = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(QUERY_KEY, value)
        router.replace(`/?${params.toString()}`)
    }

    /* =========================
      HANDLERS – TYPING (NO SEARCH)
      ========================= */
    const handleTyping = (value: string) => {
        setIsMyLocation(false)
        setAddressName(value)
    }

    /* =========================
       HANDLERS – SEARCH (EXPLICIT)
       ========================= */
    const handleSearch = async (value?: string) => {
        const keyword = (value ?? addressName).trim()
        if (!keyword || keyword === MY_LOCATION_KEY) return

        setIsMyLocation(false)
        setAddressName(keyword)

        clearError()
        setSuggestions([])
        setIsFocused(false)
        inputRef.current?.blur()

        syncUrl(keyword)
        await searchByKeyword(keyword)
        saveHistory(keyword)
    }

    const handleGetCurrentLocation = async () => {
        clearError()
        setSuggestions([])
        setIsFocused(false)
        inputRef.current?.blur()

        try {
            syncUrl(MY_LOCATION_KEY)

            setIsMyLocation(true)
            setAddressName('')

            const weather = await getCurrentWeather()
            setWeatherManually(weather)
        } catch {
            // errorCode đã được set trong hook
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

    const handleClearInput = () => {
        setAddressName('')
        setSuggestions(getRecent())
        inputRef.current?.focus()
    }

    /* =========================
       DERIVED
       ========================= */
    const placeholderKey: PlaceholderKey = useMemo(
        () => (isMyLocation ? 'myLocation' : 'placeHoderAddressSearch'),
        [isMyLocation]
    )

    /* =========================
       PUBLIC API
       ========================= */
    return {
        // state
        addressName,
        isMyLocation,
        suggestions,
        isFocused,

        // weather
        weather,
        loading,
        errorCode,

        // refs
        inputRef,

        // ui
        placeholderKey,

        // actions
        handleTyping,              // 👈 typing only
        handleSearch,              // 👈 submit only
        handleGetCurrentLocation,
        handleFocus,
        handleBlur,
        handleClearInput,
        removeHistory
    }
}
