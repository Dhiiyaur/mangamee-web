import Layout from '@/components/layout/Layout'
import MangaCard from '@/components/card/MangaCard';
import { useState } from 'react'
import { fetcherSearchManga, SERVER_BASE_URL_MANGA } from '@/lib/api';
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';
import { FiSliders, FiSearch } from "react-icons/fi";
import { IconContext } from "react-icons";

export default function SearchPage() {

    const [loading, setLoading] = useState(false)
    const [source, setSource] = useState(1)
    const [searchManga, setSearchManga] = useState()
    const [mangaStore, setMangaStore] = useState([])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') getManga();
    }

    const getManga = async () => {

        setLoading(true)
        let res = await fetcherSearchManga(`${SERVER_BASE_URL_MANGA}/search/${source}`, searchManga)
        setMangaStore(res)
        setLoading(false)
    }



    return (
        <Layout>
            <div>
                <div className='px-5 pt-10 flex justify-between space-x-5'>
                    <div className='flex bg-[#2b2b2b] px-4 rounded-xl'>
                        <span className='text-white items-center flex'>
                            <IconContext.Provider value={{ size: 20 }}>
                                <FiSearch />
                            </IconContext.Provider>
                        </span>
                        <input className='outline-none bg-[#2b2b2b] p-2.5 px-5 text-white text-sm' placeholder='Search' onChange={(e) => setSearchManga(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                    </div>
                    <button className='text-[#2b2b2b] p-2.5 rounded-xl bg-gray-50 opacity-80'>
                        <IconContext.Provider value={{ size: 25 }}>
                            <FiSliders />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
            {loading ? <MangaCardSkeleton /> :
                <div className='grid grid-cols-2 gap-4 px-5 py-4 mt-3'>
                    {mangaStore?.map((value, index) => (
                        <MangaCard value={value} key={index} source={source} />
                    ))}
                </div>
            }
        </Layout>
    )
}
