import React from 'react'
import MangaCard from '@/components/card/MangaCard';
import Layout from '@/components/layout/Layout';
import SourceCard from '@/components/card/SourceCard';

import MangameeApi from '@/lib/api';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Index({ dataSource, dataManga, query }) {

    const router = useRouter()

    const [scrollY, setScrollY] = useState(0);

    const [page, setPage] = useState(1);
    const [source, setSource] = useState(1);

    const [mangaSource, setMangaSource] = useState([])
    const [mangaData, setMangaData] = useState([]);

    const [init, setInit] = useState(true)

    const MangaPage = (
        <>
            <div className='flex px-5 py-5 space-x-3'>
                {mangaSource.map((value, index) => (
                    <SourceCard
                        key={index}
                        name={value.name}
                        source={source}
                        setSource={setSource}
                        sourceId={value.id}
                        setMangaData={setMangaData}
                        setPage={setPage}
                    />
                ))}
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-5 sm:gap-6 gap-4 px-5 py-2'>
                {mangaData?.map((value, index) => (
                    <MangaCard value={value} source={source} key={index} />
                ))}
            </div>
            <div className='flex justify-center items-center py-3'>
                <button className='bg-white px-5 py-2 rounded-xl opacity-80' onClick={() => setPage(page + 1)}>
                    <span className='text-gray-900 text-sm'>
                        More
                    </span>
                </button>
            </div>
        </>
    )


    const getMangaData = () => {
        if (mangaData.length == 0) {
            setMangaData(dataManga)
        } else {
            setMangaData((prev) => [...prev, ...dataManga])
        }
    }

    // -----------------------

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setMangaData(dataManga)
        setMangaSource(dataSource)
        setInit(false)
    }, [])

    useEffect(() => {
        if (!init) {
            window.scrollTo(0, scrollY)
            getMangaData()
        }
    }, [dataManga])

    useEffect(() => {
        if (!init) {
            router.replace({
                pathname: '/',
                query: { s: source, p: page }
            })
        }
    }, [page, source])


    return (
        <Layout>
            <div>{MangaPage}</div>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const id = context.query
    if (id.p == undefined || id.s == undefined) {
        let fetchDataManga = await MangameeApi.fetchIndex({ source: 1, page: 1 })
        let resDataManga = await fetchDataManga.json()


        let fetchDataSource = await MangameeApi.fetchSource()
        let resDataSource = await fetchDataSource.json()

        return {
            props: { dataSource: resDataSource, dataManga: resDataManga, query: id },
        }
    }

    let fetchDataManga = await MangameeApi.fetchIndex({ source: id.s, page: id.p })
    let resDataManga = await fetchDataManga.json()

    let fetchDataSource = await MangameeApi.fetchSource()
    let resDataSource = await fetchDataSource.json()

    return {
        props: { dataSource: resDataSource, dataManga: resDataManga, query: id },
    }

}