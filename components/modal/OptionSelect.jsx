import { useRef, useEffect, useState } from 'react';
import { SuccessNotification } from '@/lib/notification';
import { Toaster } from 'react-hot-toast';
import { BookmarkManager } from '@/lib/store';
import MangameeApi from '@/lib/api';
import { IconContext } from "react-icons";
import { FiX } from "react-icons/fi";

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

    const handleShare = async (e) => {
        e.stopPropagation()

        let url = `https://mangamee.space/r/${sourceId}/${mangaId}/${chapterId}`
        let fetch = await MangameeApi.fetchGetShortUrl(url)
        if (fetch.status == 200) {
            let res = await fetch.json()
            navigator.clipboard.writeText(`*${meta.Title}* https://mangamee.space/link/${res.data}`)
            SuccessNotification("Link copied")
        }
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
    }, [])

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
                    <div className='flex justify-center mt-5 sm:mt-8 px-5'>
                        <div className='text-[#181818] cursor-pointer'>
                            <IconContext.Provider value={{ size: 28 }}>
                                <FiX />
                            </IconContext.Provider>
                        </div>
                        <div className='w-full flex items-center justify-center'>
                            <span className='w-[20%] border-b-[6px] rounded-lg' />
                        </div>
                        <div className='text-white cursor-pointer' onClick={() => setMenuOpen(false)}>
                            <IconContext.Provider value={{ size: 28 }}>
                                <FiX />
                            </IconContext.Provider>
                        </div>
                    </div>
                    <div className='sm:p-10 p-8 flex flex-col space-y-6'>
                        <button
                            className='w-[45%] flex justify-start'
                            onClick={(e) => handleShare(e)}
                        >
                            <p className='text-white font-semibold'>
                                Share this manga
                            </p>
                        </button>
                        <button
                            className='w-full flex justify-start'
                            onClick={(e) => handleBookmark(e)}
                        >
                            <p className='text-white font-semibold'>
                                {isBookmark ? `I don't like it, remove bookmark` : `I like it, Bookmark`}
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}