import { useRouter } from 'next/router';
import MangaDetailSkeleton from '@/components/loading/MangaDetailSkeleton';
import Layout from '@/components/layout/Layout';
import useSWR from 'swr';
import { fetcher, SERVER_BASE_URL_MANGA } from '@/lib/api';
import { useState } from 'react';
import Bookmark from '@/components/card/Bookmark';
import { SEO } from '@/components/seo/meta';

export default function MangaPage() {
    const router = useRouter();
    const [searchFilter, setSearchFilter] = useState('');
    const [isBookmark, setIsBookmark] = useState(false);
    const { id } = router.query;
    const { data, error } = useSWR(
        id ? `${SERVER_BASE_URL_MANGA}/detail/${id[0]}/${id[1]}` : null,
        fetcher
    );

    if (error) router.push('/404');
    if (!data)
        return (
            <Layout>
                <MangaDetailSkeleton />
            </Layout>
        );

    return (
        <Layout>
            <SEO title={data.Title} image={data.Cover}/>
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
