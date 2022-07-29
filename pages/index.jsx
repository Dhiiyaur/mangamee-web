import MangaCard from '@/components/card/MangaCard';
import Layout from '@/components/layout/Layout';
import SourceCard from '@/components/card/SourceCard';
import MangaCardSkeleton from '@/components/loading/MangaCardSkeleton';

import { useEffect, useState } from 'react';

import MangameeApi from '@/lib/api';
import CustomFetch from '@/components/hook/CustomFetch';

export default function Home({ initData, sourceData }) {

    const [page, setPage] = useState(1);
    const [source, setSource] = useState(1);
    const { loading, error, data } = CustomFetch(source, page, initData)

    const SourceSection = (
        <>
            <div className='sticky top-0 sm:top-12 w-full flex justify-center py-4 z-10 bg-[#1E1E1E]'>
                <div className='flex justify-between w-[68%] sm:w-[25%]'>
                    {sourceData.map((value, index) => (
                        <SourceCard
                            key={index}
                            setPage={setPage}
                            setSource={setSource}
                            source={source}
                            value={value}

                        />
                    ))}
                </div>
            </div>
        </>
    )

    const MangaSection = (
        <div className='flex justify-center sm:mt-12'>
            {loading ? (
                <div className='w-full sm:w-[80%]'>
                    <MangaCardSkeleton />
                </div>
            ) :
                <div className='grid grid-cols-2 sm:grid-cols-5 pb-[68px] gap-5 px-5 pt-3 w-full sm:w-[80%]'
                >
                    {data.map((value, index) => (
                        <MangaCard
                            key={index}
                            value={value}
                            source={source}
                        />
                    ))}
                </div>
            }
        </div>
    )

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
          passive: true
        });
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom) {
            setPage((prev) => prev + 1)
        }
    }

    return (
        <Layout>
            {SourceSection}
            {MangaSection}
        </Layout>
    )
}

export async function getServerSideProps(context) {

    let fetchMangaData = await MangameeApi.fetchIndex(1, 1)
    let resFetchMangaData = await fetchMangaData.json()

    let fetchSourceData = await MangameeApi.fetchSource()
    let resFetchSourceData = await fetchSourceData.json()

    return {
        props: { initData: resFetchMangaData.data, sourceData: resFetchSourceData.data },
    }

}
