import { useState } from 'react'
import { AddressWeather } from '@/types/address-weather-types'
import { fetchWeatherData } from '@/features/weather-pro/WeatherService'

/* =========================
   ERROR CODES
   ========================= */
export type WeatherSearchErrorCode =
    | 'ADDRESS_NOT_FOUND'
    | 'LOCATION_PERMISSION_DENIED'
    | 'LOCATION_UNAVAILABLE'
    | 'LOCATION_TIMEOUT'
    | 'NETWORK_ERROR'
    | null

export const useWeatherSearch = () => {
    const [weather, setWeather] = useState<AddressWeather | null>(null)
    const [loading, setLoading] = useState(false)
    const [errorCode, setErrorCode] =
        useState<WeatherSearchErrorCode>(null)

    const setWeatherManually = (data: AddressWeather) => {
        setWeather(data)
        setErrorCode(null)
    }

    /* =========================
       ACTIONS
       ========================= */
    const searchByKeyword = async (keyword: string) => {
        if (!keyword) return

        setLoading(true)
        setErrorCode(null)

        try {
            const result = await fetchWeatherData(keyword)

            if (!result) {
                setWeather(null)
                setErrorCode('ADDRESS_NOT_FOUND')
                return
            }

            setWeather(result)
        } catch (error) {
            console.error(error)
            setWeather(null)
            setErrorCode('NETWORK_ERROR')
        } finally {
            setLoading(false)
        }
    }

    const clearError = () => {
        setErrorCode(null)
    }

    return {
        weather,
        loading,
        errorCode,
        searchByKeyword,
        clearError,
        setWeatherManually
    }
}
