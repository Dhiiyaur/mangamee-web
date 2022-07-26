import Layout from '@/components/layout/Layout'
import { IconContext } from 'react-icons';
import { useRouter } from 'next/router';
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleGetManga();
    };

    const handleGetManga = async () => {

        let fetch = await MangameeApi.fetchSearch(mangaSourceSelected, searchTitle)
        if (fetch.status == 200) {

            let res = await fetch.json()
            console.log(res)
            setMangaData(res.data);
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
                <div className='flex bg-[#2b2b2b] px-3 rounded-xl w-full'>
                    <span className='text-white items-center flex'>
                        <IconContext.Provider value={{ size: 20 }}>
                            <FiSearch />
                        </IconContext.Provider>
                    </span>
                    <input
                        className='outline-none bg-[#2b2b2b] p-3 pl-3  text-white text-sm w-full'
                        placeholder='Search'
                        onChange={(e) => setSearchTitle(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                <div className='text-white w-[10%] flex justify-end text-center'
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
        <div className='flex justify-center sm:pt-10'>
            <div className='grid grid-cols-2 sm:grid-cols-5 pb-[68px] gap-5 px-5 pt-3 w-full sm:w-[80%]'>
                {mangaData?.map((value, index) => (
                    <MangaCard key={index} value={value} source={mangaSourceSelected}/>
                ))}
            </div>
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