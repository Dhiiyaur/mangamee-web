import Layout from '@/components/layout/Layout';
import MangaCard from '@/components/card/MangaCard';
import { useState, useEffect } from 'react';
import { BookmarkManager } from '@/lib/store';
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';

export default function BookmarkPage() {

    const [mangaData, setMangaData] = useState([]);
    const [noData, setNoData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initPage = () => {
            let data = BookmarkManager.loadBookmark()
            if (data) {
                setMangaData(data)
            }
        };
        initPage()
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <div className='flex justify-center sm:mt-16 mt-5'>
                {loading ? (
                    <div className='w-full sm:w-[80%]'>
                        <MangaCardSkeleton />
                    </div>
                ) :
                    <>
                        {noData ? <></> :
                            <div className='grid grid-cols-2 sm:grid-cols-5 pb-[68px] gap-5 px-5 pt-3 w-full sm:w-[80%]'
                            >
                                {mangaData.map((value, index) => (
                                    <MangaCard
                                        key={index}
                                        value={value}
                                    />
                                ))}
                            </div>
                        }
                    </>

                }
            </div>
        </Layout>
    )
}
