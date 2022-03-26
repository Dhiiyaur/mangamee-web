import Layout from '@/components/layout/Layout'
import BottomNavbar from '@/components/layout/BottomNavbar'
import { image } from '@/contexts/data'

export default function MangaRead() {
    return (
        <Layout>
            <div>
                {image.map((value, index) => (
                    <div className='bg-gray-700 h-[450px]' key={index}>
                        {value.link}
                    </div>
                ))}
            </div>
            <BottomNavbar />
        </Layout>
    )
}
