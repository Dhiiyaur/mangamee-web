import Layout from '@/components/layout/Layout'
import BottomNavbar from '@/components/layout/BottomNavbar'
import { useRouter } from 'next/router'
import MangaReadSkeleton from '@/components/loading/MangaReadSkeleton'
import useSWR from 'swr'
import MangameeApi from '@/lib/api'


export default function MangaRead() {

    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id ? {source:id[0], mangaId:id[1], chapterId:id[2]} : null, MangameeApi.fetchImage)
    const { data: dataChapter, error: errorChapter } = useSWR(id ? {source:id[0], mangaId:id[1]} : null, MangameeApi.fetchChapter)

    if (error && errorChapter) router.push('/404')
    if (!data && !dataChapter) return (
        <Layout>
            <MangaReadSkeleton />
        </Layout>
    )

    return (
        <Layout>
            <div className='pb-12 flex flex-col justify-center'>
                {data?.Images?.map((value, index) => (
                    <img
                        key={index}
                        src={value.Image}
                        // src={value.Cover}
                        alt=''
                    />
                ))}
            </div>
            <BottomNavbar dataChapter={dataChapter} currentChapter={id[2]} mangaId={id[1]} sourceId={id[0]}/>
        </Layout>
    )
}