import { useRouter } from 'next/router'
import MangaDetailSkeleton from '@/components/loading/MangaDetailSkeleton'
import Layout from '@/components/layout/Layout'
import useSWR from 'swr'
import { fetcher, SERVER_BASE_URL_MANGA } from '@/lib/api'
import { useState } from 'react'

export default function MangaPage() {

    const router = useRouter()
    const [searchFilter, setSearchFilter] = useState('')
    const { id } = router.query
    const { data, error } = useSWR(id ? `${SERVER_BASE_URL_MANGA}/detail/1/${id}` : null, fetcher)

    if (error) router.push('/404')
    if (!data) return (
        <Layout>
            <MangaDetailSkeleton />
        </Layout>
    )

    return (
        <Layout>
            <div className='bg-gray-500 w-full h-[500px]'>
                <img
                    src={data.Cover}
                    // src={data.Cover123}
                    alt=''
                    className='w-full h-[500px] object-cover'
                />
            </div>

            <div className='flex flex-col p-8 space-y-5'>
                <span className='text-white opacity-90 text-lg font-medium'>
                    {data.Title}
                </span>
                <span className='text-white opacity-80 text-sm text-left'>
                    {data.Summary}
                </span>
            </div>

            <div className='px-6 mt-5'>
                <input className='outline-none w-full bg-gray-700 p-4 border text-white rounded-lg' placeholder='Search Chapter' onChange={(e) => setSearchFilter(e.target.value)} />
            </div>
            <div className='flex flex-col space-y-3.5 p-6'>
                {data
                    ?.Chapters?.filter((item) => {
                        if (item.Name
                            .toLowerCase()
                            .includes(searchFilter.toLocaleLowerCase())
                        ) {
                            return item
                        }
                    })
                    ?.map((value, index) => (
                        <div className='rounded-lg bg-gray-700 p-4 text-white flex justify-start cursor-pointer' key={index} onClick={() => router.push(`/r/${id}/${value.Id}`)}>
                            {value.Name}
                        </div>
                    ))}
            </div>
        </Layout>
    )
}