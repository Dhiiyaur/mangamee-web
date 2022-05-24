import Layout from '@/components/layout/Layout';
import MangaCard from '@/components/card/MangaCard';
import { useState, useEffect } from 'react';
import BookmarkManager from '@/lib/store';
import MangaDetailSkeleton from '@/components/loading/MangaDetailSkeleton';
import { useRouter } from 'next/router';


export default function BookmarkPage() {

    let router = useRouter()

    const [mangaData, setMangaData] = useState([]);
    const [noData, setNoData] = useState(false)
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(false)

    const handleSkeletonLoading = () => {
        window.scrollTo(0, 0);
        setIsSkeletonLoading(true)
    }

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

    useEffect(() => {
        router.events.on("routeChangeStart", () => handleSkeletonLoading())
    }, [router.events])

    return (
        <Layout>
            {isSkeletonLoading ? <MangaDetailSkeleton /> : (
                <div className='grid grid-cols-2 sm:grid-cols-5 sm:gap-6 gap-4 px-5 py-2 mt-5'>
                    {mangaData?.map((value, index) => (
                        <MangaCard value={value} source={value.Source} key={index} />
                    ))}
                </div>
            )}
        </Layout>
    )
}
