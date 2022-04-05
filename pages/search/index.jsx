import Layout from '@/components/layout/Layout'
import MangaCard from '@/components/card/MangaCard';
import { useState } from 'react'
import { fetcherSearchManga, SERVER_BASE_URL_MANGA } from '@/lib/api';
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';

export default function SearchPage() {

    const [loading, setLoading] = useState(false)
    const [searchManga, setSearchManga] = useState()
    const [mangaStore, setMangaStore] = useState([])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') getManga();
    }

    const getManga = async () => {

        setLoading(true)
        let res = await fetcherSearchManga(`${SERVER_BASE_URL_MANGA}/search/1`, searchManga)
        setMangaStore(res)
        setLoading(false)
    }



    return (
        <Layout>
            <div>
                <div className='px-8 pt-10'>
                    <input className='outline-none w-full bg-[#2b2b2b] p-3 text-white rounded-xl text-sm' placeholder='Search' onChange={(e) => setSearchManga(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                </div>
            </div>
            {loading ? <MangaCardSkeleton /> :
                <div className='grid grid-cols-2 gap-8 p-8'>
                    {mangaStore?.map((value, index) => (
                        <MangaCard value={value} key={index} />
                    ))}
                </div>
            }
        </Layout>
    )
}
