import MangaCard from '@/components/card/MangaCard';
import Layout from '@/components/layout/Layout';
import { useEffect, useState} from 'react'
import axios from 'axios';


export default function Home() {

    const [mangaReadData, setMangaReadData] = useState([])

    useEffect(() => {

        const fetchData = async() => {
            let {data:res} = await axios.get('https://go-mangamee-2.herokuapp.com/browse?pageNumber=1')
            console.log(res)
            setMangaReadData(res.MangaData)
        }

        fetchData()
    }, [])


    return (
        <Layout>
            <div className='grid grid-cols-2 gap-3 p-5'>
                {mangaReadData?.map((value, index) => (
                    <MangaCard value={value} key={index}/>
                ))}
            </div>
        </Layout>
    );
}
