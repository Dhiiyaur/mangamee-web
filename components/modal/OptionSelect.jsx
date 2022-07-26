import { useRef, useEffect, useState } from 'react';
import { LinkNotification } from '@/lib/notification';
import { Toaster } from 'react-hot-toast';
import { BookmarkManager } from '@/lib/store';

export default function OptionSelect({
    setMenuOpen,
    menuOpen,
    meta,
    mangaId,
    sourceId,
    chapterId,
}) {

    const dropdown = useRef(null);
    const [isBookmark, setIsBookmark] = useState(false);

    const handleShare = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(`*${meta.Title}* https://mangamee.space/r/${sourceId}/${mangaId}/${chapterId}`)
        LinkNotification()
    }

    const handleBookmark = (e) => {
        e.stopPropagation()
        if (isBookmark) {
            BookmarkManager.removeBookmark(mangaId)
            setIsBookmark(false)
        } else {
            BookmarkManager.addBookmark(sourceId, mangaId, meta.Title, meta.Cover, chapterId)
            setIsBookmark(true)
        }
    }

    useEffect(() => {
        setIsBookmark(BookmarkManager.checkBookmark(mangaId))
    },[])

    useEffect(() => {
        if (!menuOpen) return;
        function handleClick(e) {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        window.addEventListener('click', handleClick);
        return () => window.addEventListener('click', handleClick);
    }, [menuOpen, setMenuOpen]);

    return (
        <>
            <Toaster />
            <div ref={dropdown} className='fixed bottom-0 inset-x-0 h-[40%] sm:h-[45%] w-full flex justify-center z-[2]'>
                <div className='w-full rounded-t-xl bg-[#181818] sm:w-[50%]'>
                    <div className='flex justify-center mt-5 sm:mt-8'>
                        <span className='w-[20%] border-b-[6px] rounded-lg' />
                    </div>
                    <div className='sm:p-10 p-8 flex flex-col space-y-6'>
                        <p className='text-white font-semibold'
                            onClick={(e) => handleShare(e)}
                        >
                            Share this manga
                        </p>
                        <p className='text-white font-semibold'
                            onClick={(e) => handleBookmark(e)}
                        >
                            {isBookmark ? `I dont like it, remove bookmark` : `Ok, I like it, Bookmark`}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}