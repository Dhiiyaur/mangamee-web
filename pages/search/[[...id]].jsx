import Layout from '@/components/layout/Layout';
import MangaCard from '@/components/card/MangaCard';
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';
import MangaDetailSkeleton from '@/components/loading/MangaDetailSkeleton';
import SourceSelect from '@/components/modal/SourceSelect';

import { FiSliders, FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import MangameeApi from '@/lib/api';


export default function Search({ dataManga, dataSource }) {

    let router = useRouter()

    const [init, setInit] = useState(true)
    const [searchManga, setSearchManga] = useState();
    const [menuOpen, setMenuOpen] = useState(false);

    const [mangaSource, setMangaSource] = useState([])
    const [mangaData, setMangaData] = useState([]);
    const [source, setSource] = useState(1);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleGetManga();
    };

    const handleGetManga = () => {
        router.replace({
            pathname: '/search',
            query: { s: source, title: searchManga }
        })
    }

    useEffect(() => {
        setMangaData(dataManga)
        setMangaSource(dataSource)
        setInit(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!init) {
            setMangaData(dataManga)
            setMangaSource(dataSource)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataManga])


    const MangaPage = (
        <div>
            <div className='px-5 pt-10 flex justify-center'>
                <div className='justify-between space-x-3 flex w-full sm:w-[60%]'>
                    <div className='flex bg-[#2b2b2b] px-3 rounded-lg w-full border-2 border-[#9b9b9b]'>
                        <span className='text-white items-center flex'>
                            <IconContext.Provider value={{ size: 20 }}>
                                <FiSearch />
                            </IconContext.Provider>
                        </span>
                        <input
                            className='outline-none bg-[#2b2b2b] p-3 pl-3  text-white text-sm w-full'
                            placeholder='Search'
                            onChange={(e) => setSearchManga(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    </div>
                    <button
                        className='text-[#2b2b2b] p-3.5 rounded-lg bg-gray-50'
                        onClick={() => setMenuOpen(true)}
                    >
                        <IconContext.Provider value={{ size: 20 }}>
                            <FiSliders />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-5 sm:gap-6 gap-4 px-5 py-2 sm:pt-10 pt-5'>
                {mangaData?.map((value, index) => (
                    <MangaCard value={value} key={index} source={source} />
                ))}
            </div>

            {/* {loading ? (
                <MangaCardSkeleton />
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-5 sm:gap-6 gap-4 px-5 py-2 sm:pt-10'>
                    {mangaStore?.map((value, index) => (
                        <MangaCard value={value} key={index} source={source} />
                    ))}
                </div>
            )} */}

            {menuOpen && (
                <SourceSelect
                    setMenuOpen={setMenuOpen}
                    menuOpen={menuOpen}
                    source={source}
                    setSource={setSource}
                    setMangaSource={setMangaSource}
                    mangaSource={mangaSource}
                />
            )}
        </div>
    )


    return (
        <Layout>
            {MangaPage}
        </Layout>)
}


export async function getServerSideProps(context) {

    const id = context.query
    let fetchDataSource = await MangameeApi.fetchSource()
    let resDataSource = await fetchDataSource.json()

    if (id.s == undefined || id.title == undefined) {
        return {
            props: { dataSource: resDataSource, dataManga: null }
        }
    }

    let fetchDataManga = await MangameeApi.fetchSearch({ source: id.s, search: id.title })
    let resDataManga = await fetchDataManga.json()

    return {
        props: { dataSource: resDataSource, dataManga: resDataManga }
    }

}