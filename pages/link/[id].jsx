import React, { useEffect } from 'react'
import MangameeApi from '@/lib/api';
import { useRouter } from 'next/router';
import { Seo } from '@/components/Seo';

export default function LinkShortener({ data, meta }) {

    let router = useRouter()
    useEffect(() => {
        router.push(data)
    }, [])
    
    return (
        <>
        <Seo cover={meta.Cover} desc={meta.Title} />
        </>
    )
}

export async function getServerSideProps(context) {

    const { id } = context.params
    let fetch = await MangameeApi.fetchGetLongUrl(id)
    if (fetch.status !== 200) {
        return {
            redirect: {
                destination: "/404",
            },
        }
    } else {
        let res = await fetch.json()
        let split = res.data.split("/")
        let fetchMeta = await MangameeApi.fetchDetail(split[4], split[5])
        let resMeta = await fetchMeta.json()
        
        return {
            props: { data: res.data, meta :resMeta.data },
        }
    }
}