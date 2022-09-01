import { useRouter } from 'next/router';
import { BookmarkManager } from '@/lib/store';
import { useEffect, useState } from 'react';
import Bookmark from './Bookmark';

export default function MangaCard({ value, source, bookmarkMode = null }) {

    let router = useRouter();
    const [isBookmark, setIsBookmark] = useState(false)
    const [bookmarkData, setBookmarkValue] = useState()

    const handleBookmark = (e) => {
        e.stopPropagation()
        if (isBookmark) {
            BookmarkManager.removeBookmark(value.Id)
            setIsBookmark(false)
            if (!source){
                router.reload()
            }
        } else {
            BookmarkManager.addBookmark(source, value.Id, value.Title, value.Cover)
            setIsBookmark(true)
        }
    }

    useEffect(() => {
        if(bookmarkMode && isBookmark) {
            setBookmarkValue(BookmarkManager.getSingleBookmarkId(value.Id))
        }
    },[bookmarkMode, isBookmark])

    useEffect(() => {
        setIsBookmark(BookmarkManager.checkBookmark(value.Id))
    }, [isBookmark, value.Id])

    return (
        <div className='flex flex-col space-y-2 cursor-pointer'
            onClick={() => {
                if (isBookmark && bookmarkMode && bookmarkData.Chapter) {
                    router.push(`/r/${bookmarkData.Source}/${bookmarkData.Id}/${bookmarkData.Chapter}`)
                } else {
                    router.push(`/m/${source ? source : value.Source}/${value.Id}`)
                }
            }}
        >
            <div className='relative h-56 sm:h-72'>
                <div className='h-56 sm:h-72 absolute inset-0 bg-gradient-to-t from-black bg-opacity-40 rounded-xl'>
                    <div className='absolute right-0 bottom-2 px-5 py-3'
                        onClick={(e) => handleBookmark(e)}
                    >
                        <Bookmark isBookmark={isBookmark} />
                    </div>
                </div>
                <img src={value.Cover} className='rounded-xl h-56 sm:h-72 w-full' alt=''/>
            </div>
            <div className='flex flex-col space-y-1'>
                <p className='text-white text-xs capitalize line-clamp-2 font-semibold'>{value.Title}</p>
                {value.LastChapter &&
                    <p className='text-white opacity-80 text-xs font-thin sm:font-normal truncate'>
                        Last chapter {value.LastChapter}
                    </p>
                }
                {value.Chapter &&
                    <p className='text-white opacity-80 text-xs font-thin sm:font-normal truncate'>
                        Last read : {value.Chapter}
                    </p>
                }

            </div>
        </div>
    )
}