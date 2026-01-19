import { fetchWeatherByCoords } from '@/features/weather-pro/WeatherService'
import { AddressWeather } from '@/types/address-weather-types'

export const useCurrentLocation = () => {
    const getCurrentWeather = async (): Promise<AddressWeather> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('NOT_SUPPORTED')
                return
            }

            navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                    try {
                        const weather = await fetchWeatherByCoords(
                            coords.latitude,
                            coords.longitude
                        )

                        if (!weather) {
                            reject('ADDRESS_NOT_FOUND')
                            return
                        }

                        resolve(weather)
                    } catch {
                        reject('FETCH_FAILED')
                    }
                },
                (err) => reject(err.code)
            )
        })
    }

    return { getCurrentWeather }
}
