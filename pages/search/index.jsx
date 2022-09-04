import Layout from '@/components/layout/Layout'
import { IconContext } from 'react-icons';
import { useState, useEffect } from 'react';
import MangameeApi from '@/lib/api';
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import SourceSelect from '@/components/modal/SourceSelect';
import MangaCard from '@/components/card/MangaCard';


export default function Search() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [mangaData, setMangaData] = useState([]);
    const [mangaSource, setMangaSource] = useState([]);
    const [mangaSourceSelected, setMangaSourceSelected] = useState(1);
    const [searchTitle, setSearchTitle] = useState()
    const [notFound, setNotFound] = useState(false)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleGetManga();
    };

    const handleGetManga = async () => {

        let fetch = await MangameeApi.fetchSearch(mangaSourceSelected, searchTitle)
        if (fetch.status == 200) {
            let res = await fetch.json()
            if (res.data !== null) {
                setNotFound(false)
                setMangaData(res.data);
            } else {
                setNotFound(true)
            }
        }
    };

    useEffect(() => {
        const fetchMangaSource = async () => {
            let fetch = await MangameeApi.fetchSource()
            let res = await fetch.json()
            setMangaSource(res.data)
        }
        fetchMangaSource()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const SearchSection = (
        <div className='w-full flex justify-center mt-10 sm:mt-20'>
            <div className='flex w-[90%] sm:w-[50%] justify-between'>
                <div className='flex w-full'>
                    <input className='outline-none bg-[#2b2b2b] p-3  text-white text-sm w-full rounded-l-xl'
                        placeholder='Search'
                        onChange={(e) => setSearchTitle(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <span className='text-white items-center flex py-3 px-5 bg-[#2b2b2b] rounded-r-xl cursor-pointer'
                        onClick={handleGetManga}>
                        <IconContext.Provider value={{ size: 20 }}>
                            <FiSearch />
                        </IconContext.Provider>
                    </span>
                </div>
                <div className='text-white w-[10%] flex justify-end text-center cursor-pointer'
                    onClick={() => setMenuOpen(true)}
                >
                    <IconContext.Provider value={{ size: 50 }}>
                        <FiMoreVertical />
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )

    const MangaSection = (
        <div className='flex justify-center sm:pt-10 mt-4'>
            {notFound ?
                <div className='pt-12'>
                    <p className='text-white text-lg font-light'>
                        Opps, Not Found
                    </p>
                </div>

                :
                <div className='grid grid-cols-2 sm:grid-cols-5 pb-[68px] gap-5 px-5 pt-3 w-full sm:w-[80%]'>
                    {mangaData?.map((value, index) => (
                        <MangaCard key={index} value={value} source={mangaSourceSelected} />
                    ))}
                </div>
            }
        </div>
    )
    return (
        <Layout>
            {SearchSection}
            {MangaSection}

            {menuOpen && (
                <SourceSelect
                    setMenuOpen={setMenuOpen}
                    menuOpen={menuOpen}
                    mangaSourceSelected={mangaSourceSelected}
                    setMangaSourceSelected={setMangaSourceSelected}
                    mangaSource={mangaSource}
                    setMangaData={setMangaData}
                />
            )}
        </Layout>
    )
}