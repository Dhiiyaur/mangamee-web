import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import MangameeApi from '@/lib/api'
import { Seo } from '@/components/Seo';
import { useCallback, useEffect, useState } from 'react'
import {BookmarkManager} from '@/lib/store'
import MangaReadSkeleton from '@/components/loading/MangaReadSkeleton';
import MediaBar from '@/components/layout/MediaBar';
import { FindIndex } from '@/lib/helper';


export default function ReadPage({ meta, id }) {

    const router = useRouter()
    const [currentIndexChapter, setCurrentIndexChapter] = useState()
    const [dataImage, setDataImage] = useState([])
    const [dataChapter, setDataChapter] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [lastScroll, setLastScroll] = useState()
    const [openMediaBar, setOpenMediaBar] = useState(true)

    const MangaSection = (
        <>
        <div className='pb-[100px] sm:pb-0 flex justify-center'>
            <div className='sm:w-[50%] flex flex-col'>
                {dataImage?.Images?.map((value, index) => (
                    <img
                        key={index}
                        src={value.Imagea}
                        alt=''
                        loading="lazy"
                    />
                ))}
            </div>
        </div>
            {openMediaBar &&
                <MediaBar
                    dataChapter={dataChapter}
                    currentIndexChapter={currentIndexChapter}
                    sourceId={id[0]}
                    mangaId={id[1]}
                    chapterId={id[2]}
                    setDataImage={setDataImage}
                    meta={meta}
                />
            }
        </>
    )

    const controlMediaBar = useCallback(() => {
        if (window.scrollY > lastScroll) {
            setOpenMediaBar(false)
        } else {
            setOpenMediaBar(true)
        }
        setLastScroll(window.scrollY)
    }, [lastScroll])

    useEffect(() => {
        window.addEventListener("scroll", controlMediaBar)
        return () => {
            window.removeEventListener("scroll", controlMediaBar)
        }
    }, [controlMediaBar])

    useEffect(() => {
        BookmarkManager.modifyBookmark(id[0], id[1], id[2])
    }, [id])

    useEffect(() => {

        setIsLoading(true)
        setDataImage([])

        const fetchImage = async () => {
            let fetch = await MangameeApi.fetchImage(id[0],id[1],id[2])
            if (fetch.status !== 200) {
                router.push("/404")
            }
            let res = await fetch.json()
            setDataImage(res.data)
        }

        const fetchChapter = async () => {
            let fetch = await MangameeApi.fetchChapter(id[0], id[1])
            if (fetch.status !== 200) {
                router.push("/404")
            }
            let res = await fetch.json()
            setDataChapter(res.data.Chapters)
            setCurrentIndexChapter(FindIndex(res.data.Chapters, id[2]))
        }

        fetchImage()
        fetchChapter()
        setIsLoading(false)

    }, [id])

    return (
        <Layout>
            <Seo cover={meta.Cover} desc={meta.Title} />
            {isLoading ? <MangaReadSkeleton /> : <>{MangaSection}</>}
        </Layout>
    )
}


export async function getServerSideProps(context) {

    const { id } = context.params
    let fetchMeta = await MangameeApi.fetchMeta(id[0], id[1])
    let resMeta = await fetchMeta.json()

    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=120'
    )
    return {
        props: { meta: resMeta.data, id: id },
    }

}
