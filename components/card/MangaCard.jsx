import { useRouter } from 'next/router';

export default function MangaCard({ value }) {
    let router = useRouter();

    return (
        <div
            className='w-full h-60 bg-gray-500 rounded-md overflow-hidden'
            onClick={() => router.push(`/m/${value.name}`)}
        >
            <div>
                <img
                    src={value.MangaCover}
                    alt=''
                    className='w-full h-60 object-cover'
                />
            </div>
            <div className='sticky inset-0 bottom-0 z-10 h-14 bg-black opacity-80'>
                <div className='flex flex-col p-2 space-y-1'>
                    <span className='text-white text-sm lowercase truncate'>
                        {value.MangaTitle}
                    </span>
                    <span className='text-white opacity-80 text-xs lowercase truncate'>
                        Ch. 1
                    </span>
                </div>
            </div>
        </div>
    );
}
