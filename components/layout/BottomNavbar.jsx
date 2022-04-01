import { FindChapter } from "@/lib/helper"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';

import ChapterSelect from "@/components/card/ChapterSelect"

export default function BottomNavbar({ dataChapter, currentChapter, mangaID }) {

    const [chapterName, setChapterName] = useState()
    const [openChapter, setOpenChapter] = useState(false)

    useEffect(() => {
        if (dataChapter && currentChapter) {
            console.log(FindChapter(dataChapter.Chapters, currentChapter))
            setChapterName(FindChapter(dataChapter.Chapters, currentChapter))
        }

    }, [dataChapter, currentChapter])

    return (
        <div className='sticky bottom-0 p-3 bg-[#121212] opacity-70'>
            <div className='flex justify-center'>
                <div className='flex justify-between w-[80%] items-center'>
                    <span className='text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span className="text-white text-sm font-semibold cursor-pointer" onClick={() => setOpenChapter(true)}>
                        {chapterName}
                    </span>
                    <span className='text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            {openChapter && <ChapterSelect setOpenChapter={setOpenChapter} value={dataChapter} mangaID={mangaID} chapterName={chapterName} />}
        </div>


        // {openChapter &&
        //     <div className='fixed inset-0 z-50'>
        //         <div className='min-h-screen bg-[#121212]'>
        //             <div className='flex justify-end p-3'>
        //                 <span className='text-white' onClick={() => setOpenChapter(false)}>
        //                     <svg
        //                         xmlns='http://www.w3.org/2000/svg'
        //                         className='h-9 w-9'
        //                         fill='none'
        //                         viewBox='0 0 24 24'
        //                         stroke='currentColor'
        //                         strokeWidth={2}
        //                     >
        //                         <path
        //                             strokeLinecap='round'
        //                             strokeLinejoin='round'
        //                             d='M6 18L18 6M6 6l12 12'
        //                         />
        //                     </svg>
        //                 </span>
        //             </div>
        //             <div className='flex flex-col space-y-3'>
        //                 {value.Chapters.map((value, index) => (
        //                     <div className='flex cursor-pointer' key={index} onClick={() => handleSelectChapter(value.Id)}>
        //                         <span
        //                             className={`${chapterName == value.Name && 'bg-green-300'
        //                                 } w-[1.5%]`}
        //                         />
        //                         <span className='text-white px-7'>
        //                             {value.Name}
        //                         </span>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // }
    )
}
