import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import MangameeApi from '@/lib/api';
import { useState, useEffect } from 'react';
import Bookmark from '@/components/card/Bookmark';
import { Seo } from '@/components/Seo';
import { BookmarkManager } from '@/lib/store';

import { IconContext } from 'react-icons';
import { FiShare2 } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { SuccessNotification } from '@/lib/notification';

export default function MangaPage({ data, id }) {

    let router = useRouter()
    const [isBookmark, setIsBookmark] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const handleBookmark = (e) => {
        e.stopPropagation()
        if (isBookmark) {
            BookmarkManager.removeBookmark(id[1])
            setIsBookmark(false)
        } else {
            BookmarkManager.addBookmark(id[0], id[1], data.title, data.cover)
            setIsBookmark(true)
        }
    }

    const handleShare = async (e) => {
        e.stopPropagation()
        let url = `https://mangamee.space/m/${id[0]}/${id[1]}`
        let fetch = await MangameeApi.fetchGetShortUrl(url)
        if (fetch.status == 200) {
            let res = await fetch.json()
            navigator.clipboard.writeText(`*${data.title}* https://mangamee.space/link/${res.data}`)
            SuccessNotification("Link copied")
        }
    }

    useEffect(() => {
        setIsBookmark(BookmarkManager.checkBookmark(id[1]))
    }, [isBookmark, id])

    return (
        <Layout>
            <Toaster />
            <Seo cover={data.cover} desc={data.title} />
            <div>
                <div className='flex justify-center'>
                    <div className='sm:w-[45%] sm:pt-10 w-full h-[500px] sm:h-full'>
                        <img
                            src={data.cover}
                            alt=''
                            className='w-full h-[500px] sm:h-full object-cover'
                        />
                    </div>
                </div>

                <div className='flex justify-center sm:pt-10'>
                    <div className='p-5 flex flex-col space-y-8 sm:w-[55%]'>
                        <div className='flex justify-between space-x-3'>
                            <div>
                                <p className='text-white font-medium'>
                                    {data.title}
                                </p>
                            </div>
                            <div className='flex space-x-5 pt-2'>
                                <div className='text-white cursor-pointer'
                                    onClick={(e) => handleShare(e)}
                                >
                                    <IconContext.Provider value={{ size: 25 }}>
                                        <FiShare2 />
                                    </IconContext.Provider>
                                </div>

                                <div
                                    onClick={(e) => handleBookmark(e)}
                                >
                                    <Bookmark isBookmark={isBookmark} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p className='text-white text-sm'>Summary</p>
                            <p className='text-white text-sm font-light'>{data.summary}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center sticky top-0 sm:top-12 bg-[#1E1E1E]'>
                    <div className='flex flex-col pt-2 w-full sm:w-[55%]'>
                        <div className='px-5 py-2.5'>
                            <input
                                className='outline-none bg-[#2b2b2b] p-4 text-white text-sm w-full rounded-xl'
                                placeholder='Search Chapter'
                                onChange={(e) => setSearchFilter(e.target.value)}
                            />
                            <div className='flex justify-center pt-4'>
                                <span className='w-[20%] border-b-[5px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='px-5 py-3 flex flex-col pb-[68px] sm:w-[55%] w-full'>
                        <div className='flex flex-col space-y-3.5'>
                            {data?.chapters?.filter((item) => {
                                if (
                                    item.name.toLowerCase().includes(
                                        searchFilter.toLocaleLowerCase()
                                    )
                                ) {
                                    return item;
                                }
                            })?.map((value, index) => (
                                <div
                                    className='rounded-xl bg-[#2b2b2b] p-4 px-6 text-white flex justify-start cursor-pointer'
                                    key={index}
                                    onClick={() =>
                                        router.push(`/r/${id[0]}/${id[1]}/${value.id}`)
                                    }
                                >
                                    {value.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context) {

    const { id } = context.params
    let fetch = await MangameeApi.fetchDetail(id[0], id[1])
    if (fetch.status !== 200) {
        return {
            redirect: {
                destination: '/404',
            },
        }
    }
    let res = await fetch.json()
    return {
        props: { data: res.data, id },
    }
}