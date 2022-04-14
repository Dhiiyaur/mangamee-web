import { useRouter } from 'next/router';
import MangaDetailSkeleton from '@/components/loading/MangaDetailSkeleton';
import Layout from '@/components/layout/Layout';
import useSWR from 'swr';
import MangameeApi from '@/lib/api';
import { useState } from 'react';
import Bookmark from '@/components/card/Bookmark';
import { Seo } from '@/components/Seo';

export default function MangaPage({meta, id}) {

    const [searchFilter, setSearchFilter] = useState('');
    const [isBookmark, setIsBookmark] = useState(false);
    let router = useRouter()
    const { data, error } = useSWR( id ? {source:id[0], mangaId:id[1]}  : null, MangameeApi.fetchDetail)
    if (error) router.push('/404');
    if (!data)
        return (
            <Layout>
                <Seo cover={meta.Cover} desc={meta.Title}/>
                <MangaDetailSkeleton />
            </Layout>
        );

    return (
        <Layout>
            <Seo cover={meta.Cover} desc={meta.Title}/>
            <div className='flex justify-center sm:mt-10'>
                <div className='sm:w-[40%] w-full h-[500px]'>
                    <img
                        src={data.Cover}
                        // src={data.Cover123}
                        alt=''
                        className='w-full h-[500px] object-cover'
                    />
                </div>
            </div>

            <div className='flex flex-col p-8 space-y-5'>
                <div className='flex justify-between space-x-5'>
                    <span className='text-white opacity-90 text-lg font-medium'>
                        {data.Title}
                    </span>
                    <span
                        onClick={() => setIsBookmark(!isBookmark)}
                        className='mt-1'
                    >
                        <Bookmark isBookmark={isBookmark} />
                    </span>
                </div>
                <span className='text-white opacity-80 text-sm text-left'>
                    {data.Summary}
                </span>
            </div>

            <div className='px-6 mt-5'>
                <input
                    className='outline-none w-full bg-gray-700 p-4 border text-white rounded-lg'
                    placeholder='Search Chapter'
                    onChange={(e) => setSearchFilter(e.target.value)}
                />
            </div>
            <div className='flex flex-col space-y-3.5 p-6'>
                {data?.Chapters?.filter((item) => {
                    if (
                        item.Name.toLowerCase().includes(
                            searchFilter.toLocaleLowerCase()
                        )
                    ) {
                        return item;
                    }
                })?.map((value, index) => (
                    <div
                        className='rounded-lg bg-gray-700 p-4 text-white flex justify-start cursor-pointer'
                        key={index}
                        onClick={() =>
                            router.push(`/r/${id[0]}/${id[1]}/${value.Id}`)
                        }
                    >
                        {value.Name}
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {

    const { id } = context.params
    let fetch = await MangameeApi.fetchMeta({source:id[0], mangaId:id[1]})
    if (fetch.status !== 200) return {redirect: { destination: "/404"}}
    let meta = await fetch.json()
    return {
        props: {meta, id},
    }
}