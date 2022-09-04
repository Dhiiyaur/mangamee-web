import Layout from '@/components/layout/Layout';
import MangaCard from '@/components/card/MangaCard';
import { useState, useEffect } from 'react';
import { BookmarkManager } from '@/lib/store';
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';
import { IconContext } from "react-icons";
import { FiSettings } from "react-icons/fi";
import BookmarkOption from '@/components/modal/BookmarkOption';
import Image from 'next/image';

export default function BookmarkPage() {

    const [mangaData, setMangaData] = useState([]);
    const [noData, setNoData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const initPage = () => {
            let data = BookmarkManager.loadBookmark()
            if (data) {
                setMangaData(data)
            } else {
                setNoData(true)
            }
        };
        initPage()
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>

            <div className='sticky top-0 sm:top-12 w-full flex z-10 bg-[#1E1E1E]'>
                <div className='flex justify-center w-full'>
                    <div className='flex justify-between sm:justify-end sm:space-x-10 w-full sm:w-[80%] p-5 mt-2'>
                        <p className='text-white text-lg font-medium'>
                            Bookmark
                        </p>
                        <div className='text-white cursor-pointer' onClick={() => setMenuOpen(true)}>
                            <IconContext.Provider value={{ size: 28 }}>
                                <FiSettings />
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center sm:mt-16 mt-5'>
                {loading ? (
                    <div className='w-full sm:w-[80%]'>
                        <MangaCardSkeleton />
                    </div>
                ) :
                    <>
                        {noData ?
                            <div className='flex flex-col items-center justify-center space-y-5 pt-10'>
                                <Image
                                    src="/icons/box.png"
                                    width={220}
                                    height={110}
                                />
                                <div className='flex flex-col items-center space-y-1'>
                                    <p className='text-white'>
                                        Sorry, your bookmark is empty
                                    </p>
                                    <p className='text-white'>
                                        Try to love something
                                    </p>
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-2 sm:grid-cols-5 pb-[68px] gap-5 px-5 pt-3 w-full sm:w-[80%]'
                            >
                                {mangaData.map((value, index) => (
                                    <MangaCard
                                        key={index}
                                        value={value}
                                        bookmarkMode={true}
                                    />
                                ))}
                            </div>
                        }
                    </>

                }
            </div>

            {menuOpen && <BookmarkOption
                setMenuOpen={setMenuOpen}
                menuOpen={menuOpen}
                mangaData={mangaData}
            />}
        </Layout>
    )
}
