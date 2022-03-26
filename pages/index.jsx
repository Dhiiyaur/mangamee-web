import MangaCard from '@/components/card/MangaCard';
import Layout from '@/components/layout/Layout';

export default function index() {

    let tempData = [
        {
            name: 'hello1',
        },
        {
            name: 'hello2',
        },
        {
            name: 'hello3',
        },
        {
            name: 'hello4',
        },
        {
            name: 'hello5',
        },
        {
            name: 'hello6',
        },
        {
            name: 'hello7',
        },
        {
            name: 'hello8',
        },
        {
            name: 'hello9',
        },
        {
            name: 'hel54lo',
        },
        {
            name: '65',
        },
        {
            name: 'hel20lo',
        },
        {
            name: 'hello29',
        },
    ];


    return (
        <Layout>
            <div className='grid grid-cols-2 gap-3 p-5'>
                {tempData.map((value, index) => (
                    <MangaCard value={value} key={index}/>
                ))}
            </div>
        </Layout>
    );
}
