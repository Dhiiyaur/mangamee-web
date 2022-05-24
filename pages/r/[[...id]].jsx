import Layout from '@/components/layout/Layout'
import BottomNavbar from '@/components/layout/BottomNavbar'
import { useRouter } from 'next/router'
import MangaReadSkeleton from '@/components/loading/MangaReadSkeleton'
import useSWR from 'swr'
import MangameeApi from '@/lib/api'
import { Seo } from '@/components/Seo';
import { useEffect, useRef, useMemo, createRef } from 'react'
import BookmarkManager from '@/lib/store'
import { useInView } from 'react-intersection-observer';

export default function MangaRead({ meta, id, data,  dataChapter}) {

    const router = useRouter()
    // const { ref, inView, entry } = useInView();
    // const { data, error } = useSWR(id ? { source: id[0], mangaId: id[1], chapterId: id[2] } : null, MangameeApi.fetchImage)
    // const { data: dataChapter, error: errorChapter } = useSWR(id ? { source: id[0], mangaId: id[1] } : null, MangameeApi.fetchChapter)

    // const lineRef = useRef([])
    // lineRef.current = data.map((_, i) => lineRef.current[i] ?? createRef());

    // if (error && errorChapter) router.push('/404')
    // if (!data && !dataChapter) return (
    //     <Layout>
    //         <Seo cover={meta.Cover} desc={meta.Title} />
    //         <MangaReadSkeleton />
    //     </Layout>
    // )

    useEffect(() => {
        BookmarkManager.modifyBookmark({ chapterId: id[2], mangaId: id[1], sourceId: id[0] })
    }, [id[2]])

    return (
        <Layout mobile={true}>
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
        </Layout>
    )
}

export async function getServerSideProps(context) {

    // const { id } = context.params
    // let fetch = await MangameeApi.fetchMeta({source:id[0], mangaId:id[1]})
    // if (fetch.status !== 200) return {redirect: { destination: "/404"}}
    // let meta = await fetch.json()
    // return {
    //     props: {meta, id},
    // }

    const { id } = context.params
    let fetchMeta = await MangameeApi.fetchMeta({ source: id[0], mangaId: id[1] })
    let fetchMangaImage = await MangameeApi.fetchImage({ source: id[0], mangaId: id[1], chapterId: id[2] })
    let fetchChapter = await MangameeApi.fetchChapter({ source: id[0], mangaId: id[1] })

    // if (fetchMeta.status !== 200) return { redirect: { destination: "/404" } }
    // if (fetchMangaImage.status !== 200) return { redirect: { destination: "/404" } }
    // if (fetchChapter.status !== 200) return { redirect: { destination: "/404" } }

    let resMeta = await fetchMeta.json()

    return {
        props: { meta: resMeta, id: id, data: fetchMangaImage, dataChapter: fetchChapter },
    }

}