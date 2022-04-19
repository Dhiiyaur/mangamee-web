import { useRouter } from 'next/router';

export default function MangaCard({ value, source }) {
    let router = useRouter();

    console.log(value, source)
    return (
        <div
            className='w-full h-60 rounded-lg overflow-hidden cursor-pointer bg-black'
            onClick={() => router.push(`/m/${source}/${value.Id}`)}
        >
            <div>
                <img
                    src={value.Cover}
                    // src={value.Covader}
                    alt=''
                    className='w-full object-cover'
                />
            </div>
            <div className='sticky inset-0 h-full w-full bg-gradient-to-t from-black'>
                <div className='sticky top-[75%]'>
                    <div className='flex flex-col space-y-1.5 p-3 justify-end'>
                        <span className='text-white text-xs capitalize line-clamp-2 font-medium'>
                            {value.Title}
                        </span>

                        {value.LastChapter &&
                            <span className='text-white opacity-80 text-xs lowercase truncate'>
                                last chapter {value.LastChapter}
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

