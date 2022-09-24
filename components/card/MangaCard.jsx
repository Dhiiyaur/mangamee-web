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
            BookmarkManager.removeBookmark(value.id)
            setIsBookmark(false)
            if (!source) {
                router.reload()
            }
        } else {
            BookmarkManager.addBookmark(source, value.id, value.title, value.cover)
            setIsBookmark(true)
        }
    }

    useEffect(() => {
        if (bookmarkMode && isBookmark) {
            setBookmarkValue(BookmarkManager.getSingleBookmarkId(value.id))
        }
    }, [bookmarkMode, isBookmark])

    useEffect(() => {
        setIsBookmark(BookmarkManager.checkBookmark(value.id))
    }, [isBookmark, value.id])

    return (
        <div className='flex flex-col space-y-2 cursor-pointer'
            onClick={() => {
                if (isBookmark && bookmarkMode && bookmarkData.chapter) {
                    router.push(`/r/${bookmarkData.source}/${bookmarkData.id}/${bookmarkData.chapter}`)
                } else {
                    router.push(`/m/${source ? source : value.source}/${value.id}`)
                }
            }}
        >
            <div className='relative h-56 sm:h-72'>
                <div className='h-56 sm:h-72 absolute inset-0 rounded-xl'>
                    <div className='absolute right-0 bottom-2 px-5 py-3'
                        onClick={(e) => handleBookmark(e)}
                    >
                        <Bookmark isBookmark={isBookmark} />
                    </div>
                </div>
                <img src={value.cover} className='rounded-xl h-56 sm:h-72 w-full' alt='' />
            </div>

            <div className='flex flex-col space-y-1'>
                <p className='text-white text-xs capitalize line-clamp-2 font-semibold'>{value.title}</p>
                {value.last_chapter &&
                    <p className='text-white opacity-80 text-xs font-thin sm:font-normal truncate'>
                        Last chapter {value.last_chapter}
                    </p>
                }
                {value.chapter &&
                    <p className='text-white opacity-80 text-xs font-thin sm:font-normal truncate'>
                        Last read : {value.chapter_name}
                    </p>
                }

            </div>
        </div>
    )
}