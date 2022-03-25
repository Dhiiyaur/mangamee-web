import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import { data } from '@/contexts/data'

export default function id() {

    return (
        <Layout>
            <div className='bg-gray-500 w-full h-[400px]'>
            </div>

            <div className='flex flex-col p-8 space-y-3'>
                <span className='text-white opacity-90 text-lg'>
                    {data.title}
                </span>
                <span className='text-white opacity-80 text-sm text-left'>
                    {data.desc}
                </span>
            </div>

            <div className='flex flex-col space-y-3 p-8'>
                {data.chapter.map((value, index) => (
                    <div className='rounded-lg bg-gray-700 p-3 text-white flex justify-start' key={index}>
                        Chapter {value.name}
                    </div>
                ))}
            </div>

        </Layout>
    )
}
