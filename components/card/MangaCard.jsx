import { useRouter } from 'next/router';

export default function MangaCard({ value, source }) {
    let router = useRouter();
    return (
        <div className='h-60 sm:h-72 rounded-xl overflow-hidden cursor-pointer'
            onClick={() => router.push(`/m/${source}/${value.Id}`)}
        >
            <img src={value.Cover} className='h-60 sm:h-72 object-fill w-full rounded-xl'></img>
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

                        {value.Chapter &&
                            <span className='text-white opacity-80 text-xs lowercase truncate'>
                                last read : {value.Chapter}
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

