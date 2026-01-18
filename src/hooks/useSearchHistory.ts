import { useEffect, useState } from 'react'

const STORAGE_KEY = 'pwa_search_history'
const MAX_HISTORY = 50

export const useSearchHistory = () => {
    const [history, setHistory] = useState<string[]>([])

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            setHistory(JSON.parse(raw))
        }
    }, [])

    const syncStorage = (data: string[]) => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        )
    }

    const saveHistory = (keyword: string) => {
        setHistory((prev) => {
            const next = [
                keyword,
                ...prev.filter((k) => k !== keyword),
            ].slice(0, MAX_HISTORY)

            syncStorage(next)
            return next
        })
    }

    const removeHistory = (keyword: string) => {
        setHistory((prev) => {
            const next = prev.filter((k) => k !== keyword)
            syncStorage(next)
            return next
        })
    }

    const getRecent = (limit = 5) => history.slice(0, limit)

    const filterHistory = (
        value: string,
        limit = 5
    ) =>
        history
            .filter((k) =>
                k
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
            .slice(0, limit)

    return {
        history,
        saveHistory,
        removeHistory, // 👈 mới
        getRecent,
        filterHistory,
    }
}
