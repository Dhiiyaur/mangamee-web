import { useRouter } from 'next/router';

export default function MangaCard({ value }) {
    let router = useRouter();

    return (
        <div
            className='w-full h-60 bg-gray-500 rounded-md overflow-hidden'
            onClick={() => router.push(`/m/${value.Id}`)}
        >
            <div>
                <img
                    src={value.Cover}
                    alt=''
                    className='w-full h-60 object-cover'
                />
            </div>
            <div className='sticky inset-0 bottom-0 z-10 h-[75px] bg-black opacity-80'>
                <div className='flex flex-col space-y-1.5 p-3'>
                        <span className='text-white text-xs capitalize line-clamp-2 font-medium'>
                            {value.Title}
                        </span>
                        <span className='text-white opacity-80 text-xs lowercase truncate'>
                            last chapter {value.LastChapter}
                        </span>
                </div>
            </div>
        </div>
    );
}
