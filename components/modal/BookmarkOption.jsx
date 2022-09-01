import { useRef, useEffect, useState } from 'react';
import { SuccessNotification } from '@/lib/notification';
import { Toaster } from 'react-hot-toast';
import MangameeApi from '@/lib/api';
import { IconContext } from "react-icons";
import { FiX } from "react-icons/fi";

export default function BookmarkOption({
    setMenuOpen,
    menuOpen,
    mangaData
}) {

    const [bookmarkCode, setBookmarkCode] = useState("")
    const dropdown = useRef(null);

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


    const handleGetBookmark = async () => {
        let fetch = await MangameeApi.fetchGetBookmark(bookmarkCode)
        if (fetch.status == 200) {
            console.log('a')
        }
    }

    const handleShare = async () => {

        let fetch = await MangameeApi.fetchGetBookmarkCode(mangaData)
        if (fetch.status == 200) {
            let res = await fetch.json()
            navigator.clipboard.writeText(`${res.data}`)
            SuccessNotification("Secret Code copied")
        }
    }

    return (
        <>
            <Toaster />
            <div ref={dropdown} className='fixed bottom-0 inset-x-0 h-[40%] sm:h-[45%] w-full flex justify-center z-[2]'>
                <div className='w-full rounded-t-xl bg-[#181818] sm:w-[50%]'>
                    <div className='flex w-full justify-between px-6 py-3'>
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
                    {/* <div className='flex w-full justify-end py-3'>
                        <div className='w-[60%] flex justify-between px-6'>
                            <div className='flex items-center w-full'>
                                <span className='w-[20%] border-b-[6px] rounded-lg' />
                            </div>
                            <div className='text-white cursor-pointer' onClick={() => setMenuOpen(false)}>
                                <IconContext.Provider value={{ size: 28 }}>
                                    <FiX />
                                </IconContext.Provider>
                            </div>
                        </div>
                    </div> */}
                    <div className='sm:p-10 p-8 flex flex-col space-y-6'>
                        <p className='text-white font-semibold cursor-pointer'
                            onClick={(e) => handleShare(e)}
                        >
                            Share my bookmark
                        </p>
                        <p className='border-b'></p>
                        <p className='text-white font-semibold cursor-pointer'
                        >
                            Import bookmark
                        </p>
                        <div className='w-full flex'>
                            <input className='w-full border p-3 rounded-l-md text-gray-600 text-sm outline-none'
                                placeholder='input your secret code'
                                onChange={(e) => setBookmarkCode(e.target.value)}
                            />
                            <button className='p-2 bg-white border rounded-r-md'>
                                <p className='text-sm font-medium text-gray-600'>
                                    Import
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
