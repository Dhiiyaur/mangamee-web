import MangameeApi from '@/lib/api'
import { useEffect, useState, useCallback } from 'react'

export default function CustomFetch(sourceId, page, initData) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [init, setInit] = useState(true)

    const getQuery = useCallback(async () => {
        try {
            setError(false)
            let fetch = await MangameeApi.fetchIndex(sourceId, page)
            let res = await fetch.json()
            setData((prev) => [...prev, ...res.data])
        } catch (error) {
            setError(true)
        }
    }, [sourceId, page])

    useEffect(() => {
        setData(initData)
        setLoading(false)
        setInit(false)
    }, [])

    useEffect(() => {
        if (!init) {
            console.log('buka ini')

            getQuery()
        }
    }, [page])

    useEffect(() => {
        if (!init) {
            console.log('masuk ini')
            setLoading(true)
            setData([])
            window.scrollTo(0, 0)
            getQuery()
            setLoading(false)
        }
    }, [sourceId])

return { loading, error, data }
}
