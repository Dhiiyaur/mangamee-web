import { useRouter } from 'next/router';
// import MangaDetailSkeleton from '@/components/loading/MangaDetailSkeleton';
import Layout from '@/components/layout/Layout';
// import useSWR from 'swr';
import MangameeApi from '@/lib/api';
import { useState, useEffect } from 'react';
import Bookmark from '@/components/card/Bookmark';
import { Seo } from '@/components/Seo';
import BookmarkManager from '@/lib/store';

// export default function MangaPage({ meta, id }) {
export default function MangaPage({ data, id }) {

    let router = useRouter()
    const [searchFilter, setSearchFilter] = useState('');
    const [isBookmark, setIsBookmark] = useState(false);

    const handleSetBookmark = (e) => {
        e.preventDefault()
        BookmarkManager.setBookmark({ isBookmark: isBookmark, setIsBookmark: setIsBookmark, title: data.Title, cover: data.Cover, mangaId: id[1], sourceId: id[0] })
    }

    useEffect(() => {
        setIsBookmark(BookmarkManager.checkBookmark({ mangaId: id[1] }))
    }, [])


    // const { data, error } = useSWR(id ? { source: id[0], mangaId: id[1] } : null, MangameeApi.fetchDetail)
    // if (error) router.push('/404');
    // if (!data)
    //     return (
    //         <Layout>
    //             <Seo cover={meta.Cover} desc={meta.Title} />
    //             <MangaDetailSkeleton />
    //         </Layout>
    //     );


    return (
        <Layout mobile={true}>
            {/* <Seo cover={meta.Cover} desc={meta.Title} /> */}
            <Seo cover={data.Cover} desc={data.Title} />
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

            <div className='flex flex-col p-8 space-y-2.5'>
                <span
                    onClick={(e) => handleSetBookmark(e)}
                    className='flex justify-end'
                >
                    <Bookmark isBookmark={isBookmark} />
                </span>
                {/* <div className='flex justify-between space-x-5'> */}
                <span className='text-white opacity-90 text-lg font-medium'>
                    {data.Title}
                    {/* {data.Title2} */}
                </span>

                {/* </div> */}
                <span className='text-white opacity-80 text-sm text-left'>
                    {data.Summary}
                </span>
            </div>

            <div className='px-6 mt-5'>
                <input
                    className='outline-none w-full bg-gray-700 p-4 border-[1.5px] text-white rounded-xl'
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
                        className='rounded-xl bg-gray-700 p-4 px-6 text-white flex justify-start cursor-pointer'
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
    let fetch = await MangameeApi.fetchDetail({ source: id[0], mangaId: id[1] })
    return {
        props: { data: fetch, id },
    }
}

// export async function getServerSideProps(context) {

//     const { id } = context.params
//     let fetch = await MangameeApi.fetchMeta({ source: id[0], mangaId: id[1] })
//     if (fetch.status !== 200) return { redirect: { destination: "/404" } }
//     let meta = await fetch.json()
//     return {
//         props: { meta, id },
//     }
// }