import Layout from '@/components/layout/Layout'
import BottomNavbar from '@/components/layout/BottomNavbar'
import { useRouter } from 'next/router'
import MangaReadSkeleton from '@/components/loading/MangaReadSkeleton'
import useSWR from 'swr'
import { fetcher, SERVER_BASE_URL_MANGA } from '@/lib/api'
import { useState } from 'react'


export default function MangaRead() {

    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id ? `${SERVER_BASE_URL_MANGA}/read/1/${id[0]}/${id[1]}` : null, fetcher)
    const { data: dataChapter, error: errorChapter } = useSWR(id ? `${SERVER_BASE_URL_MANGA}/read-chapter/1/${id[0]}` : null, fetcher)

    if (error && errorChapter) router.push('/404')
    if (!data && !dataChapter) return (
        <Layout>
            <MangaReadSkeleton />
        </Layout>
    )

    return (
        <Layout>
            <div>
                {data?.Images?.map((value, index) => (
                    <img
                        key={index}
                        src={value.Image}
                        // src={value.Cover}
                        alt=''
                    />
                ))}
            </div>
            <BottomNavbar dataChapter={dataChapter} currentChapter={id[1]} mangaId={id[0]}/>
        </Layout>
    )
}