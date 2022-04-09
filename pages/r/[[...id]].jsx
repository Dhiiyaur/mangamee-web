import Layout from '@/components/layout/Layout'
import BottomNavbar from '@/components/layout/BottomNavbar'
import { useRouter } from 'next/router'
import MangaReadSkeleton from '@/components/loading/MangaReadSkeleton'
import useSWR from 'swr'
import { fetcher, SERVER_BASE_URL_MANGA } from '@/lib/api'


export default function MangaRead() {

    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id ? `${SERVER_BASE_URL_MANGA}/read/${id[0]}/${id[1]}/${id[2]}` : null, fetcher)
    const { data: dataChapter, error: errorChapter } = useSWR(id ? `${SERVER_BASE_URL_MANGA}/read-chapter/${id[0]}/${id[1]}` : null, fetcher)

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