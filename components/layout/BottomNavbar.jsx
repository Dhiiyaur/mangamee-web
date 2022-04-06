import { FindChapter } from "@/lib/helper"
import { useEffect, useState } from "react"
import ChapterSelect from "@/components/layout/ChapterSelect"


export default function BottomNavbar({ dataChapter, currentChapter, mangaId, sourceId }) {

    const [chapterName, setChapterName] = useState()
    const [openChapters, setOpenChapters] = useState(false)

    useEffect(() => {
        if (dataChapter && currentChapter) {
            setChapterName(FindChapter(dataChapter.Chapters, currentChapter))
        }

    }, [dataChapter, currentChapter])

    return (
        <div>
            <div className='fixed inset-x-0 bottom-0 p-2 bg-[#121212] opacity-70'>
                <div className='flex justify-center'>
                    <div className='flex justify-between w-[80%] items-center'>
                        <span className='text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span className="text-white text-sm font-semibold cursor-pointer" onClick={() => setOpenChapters(true)}>
                            {chapterName}
                        </span>
                        <span className='text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            {openChapters && <ChapterSelect chapters={dataChapter.Chapters} openChapters={openChapters} setOpenChapters={setOpenChapters} chapterName={chapterName} mangaId={mangaId} sourceId={sourceId}/>}
        </div>

    )
}
