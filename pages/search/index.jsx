import Layout from '@/components/layout/Layout';
import MangaCard from '@/components/card/MangaCard';
import { useState } from 'react';
import MangameeApi from '@/lib/api';
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';
import { FiSliders, FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import SourceSelect from '@/components/modal/SourceSelect';

export default function SearchPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState(1);
    const [searchManga, setSearchManga] = useState();
    const [mangaStore, setMangaStore] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') getManga();
    };

    const getManga = async () => {
        setLoading(true);
        let fetch = await MangameeApi.fetchSearch({source:source, search:searchManga})
        if (fetch.status == 200) {
            let res = await fetch.json()
            setMangaStore(res);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div>
                <div className='px-5 pt-10 flex justify-between space-x-3'>
                    <div className='flex bg-[#2b2b2b] px-3 rounded-lg w-full border-2 border-[#9b9b9b]'>
                        <span className='text-white items-center flex opacity-80'>
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
                        className='text-[#2b2b2b] p-3.5 rounded-lg bg-gray-50 opacity-80'
                        onClick={() => setMenuOpen(true)}
                    >
                        <IconContext.Provider value={{ size: 20 }}>
                            <FiSliders />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
            {loading ? (
                <MangaCardSkeleton />
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 px-5 py-2 mt-8'>
                    {mangaStore?.map((value, index) => (
                        <MangaCard value={value} key={index} source={source} />
                    ))}
                </div>
            )}

            {menuOpen && (
                <SourceSelect
                    setMenuOpen={setMenuOpen}
                    menuOpen={menuOpen}
                    source={source}
                    setSource={setSource}
                    setMangaStore={setMangaStore}
                />
            )}
        </Layout>
    );
}
