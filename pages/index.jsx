import MangaCard from '@/components/card/MangaCard';
import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react'
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';
import { SERVER_BASE_URL_MANGA, fetcher } from '@/lib/api'

export default function Home() {

    const [page, setPage] = useState(1)
    const [source, setSource] = useState(1)
    const [mangaData, setMangaData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initPage = async() => {
            let res = await fetcher(`${SERVER_BASE_URL_MANGA}/index/${source}/${page}`)
            if (page == 1) {
                setMangaData(res)
            } else {
                setMangaData(prev => [...prev, ...res])
            }
            setLoading(false)
        }

        initPage()
    },[page, source])

    if (loading) return (
        <Layout>
            <MangaCardSkeleton />
        </Layout>
    )

    return (
        <Layout>
            <div className='flex px-8 py-5 space-x-3'>
                <button className='text-sm text-white p-2 border rounded-lg' onClick={() => setSource(1)}> Mangaread</button>
                <button className='text-sm text-white p-2 border rounded-lg' onClick={() => setSource(2)}> Mangatown</button>
            </div>
            <div className='grid grid-cols-2 gap-6 px-8 py-4'>
                {mangaData?.map((value, index) => (
                    <MangaCard value={value} source={source} key={index} />
                ))}
            </div>
            <div className='flex justify-center cursor-pointer items-center py-3 hover:bg-[#1a1a1a]' onClick={() => setPage(page + 1)}>
                <span className='text-white text-sm'>
                    More
                </span>
            </div>
        </Layout>
    )
}
