import Layout from '@/components/layout/Layout'
import BottomNavbar from '@/components/layout/BottomNavbar'
import { useRouter } from 'next/router'
import MangameeApi from '@/lib/api'
import { Seo } from '@/components/Seo';
import { useEffect, useState } from 'react'
import BookmarkManager from '@/lib/store'
import MangaReadSkeleton from '@/components/loading/MangaReadSkeleton';


export default function MangaRead({ meta, id, dataManga, dataChapter }) {

    const [data, setData] = useState([])
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const MangaPage = (
        <>
            <Seo cover={meta.Cover} desc={meta.Title} />
            <div className='pb-12 flex flex-col justify-center'>
                {data?.Images?.map((value, index) => (
                    <img
                        key={index}
                        src={value.Image}
                        // src={value.Cover}
                        alt=''
                        loading="lazy"
                    />
                ))}
            </div>
            <BottomNavbar dataChapter={dataChapter} currentChapter={id[2]} mangaId={id[1]} sourceId={id[0]} />
        </>
    )
    const handleSkeletonLoading = () => {
        setIsLoading(true)
        setData([])
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        setIsLoading(false)
        setData(dataManga)

    }, [dataManga])

    useEffect(() => {
        BookmarkManager.modifyBookmark({ chapterId: id[2], mangaId: id[1], sourceId: id[0] })
    }, [id[2]])

    useEffect(() => {
        router.events.on("routeChangeStart", handleSkeletonLoading)
    }, [router.events])


    return (
        <Layout mobile={true}>
            {isLoading ? <MangaReadSkeleton /> : <>{MangaPage}</>}
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const { id } = context.params
    let fetchMeta = await MangameeApi.fetchMeta({ source: id[0], mangaId: id[1] })
    let fetchMangaImage = await MangameeApi.fetchImage({ source: id[0], mangaId: id[1], chapterId: id[2] })
    let fetchChapter = await MangameeApi.fetchChapter({ source: id[0], mangaId: id[1] })

    let resMeta = await fetchMeta.json()

    return {
        props: { meta: resMeta, id: id, dataManga: fetchMangaImage, dataChapter: fetchChapter },
    }

}