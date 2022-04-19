import Layout from '@/components/layout/Layout';
import MangaCard from '@/components/card/MangaCard';
import { useState, useEffect } from 'react';
import BookmarkManager from '@/lib/store';

export default function BookmarkPage() {
    const [mangaData, setMangaData] = useState([]);
    const [noData, setNoData] = useState(false)

    const initPage = () => {
        let mangaData = BookmarkManager.loadBookmark()
        if (mangaData == null) {
            setNoData(true)
        }
        setMangaData(mangaData)
    };

    useEffect(() => {
        initPage()
    }, []);

    return (
        <Layout>
            <div className='grid grid-cols-2 sm:grid-cols-5 sm:gap-6 gap-4 px-5 py-2 mt-5'>
                {mangaData?.map((value, index) => (
                    <MangaCard value={value} source={value.Source} key={index} />
                ))}
            </div>
        </Layout>
    )
}
