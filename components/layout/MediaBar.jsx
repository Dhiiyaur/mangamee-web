import { useRouter } from 'next/router';
import { FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useState } from 'react';
import ChapterSelect from '../modal/ChapterSelect';
import OptionSelect from '../modal/OptionSelect';

export default function MediaBar({ dataChapter, chapterName, currentIndexChapter, mangaId, sourceId, meta, chapterId }) {

    let router = useRouter()

    const [openChapters, setOpenChapters] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNextChapter = () => {
        if (currentIndexChapter > 0) {
            let nextChapter = dataChapter[currentIndexChapter - 1]['id'];
            router.push(`/r/${sourceId}/${mangaId}/${nextChapter}`);
        }
    };

    const handlePrevChapter = () => {
        if (currentIndexChapter < (dataChapter.length - 1)) {
            let prevChapter = dataChapter[currentIndexChapter + 1]['id'];
            router.push(`/r/${sourceId}/${mangaId}/${prevChapter}`);
        }
    };

    return (
        <>
            <div className='flex flex-col space-y-2 bottom-[45px] fixed inset-x-0 sm:bottom-0'>
                <div className='flex justify-end px-5'>
                    <div className='w-[30px] h-[30px] rounded-full bg-[#D9D9D9] flex justify-center items-center cursor-pointer'
                    onClick={() => setMenuOpen(true)}
                    >
                        <IconContext.Provider value={{ size: 20 }}>
                            <FiSettings />
                        </IconContext.Provider>
                    </div>
                </div>
                <div className='flex w-full bg-[#D9D9D9] justify-center'>
                    <div className='flex justify-between py-3 px-5 items-center w-full sm:w-[40%]'>
                        <div className={`${currentIndexChapter < (dataChapter.length - 1) == 0 ? "text-[#D9D9D9]" : "cursor-pointer"}`}
                            onClick={() => handlePrevChapter()}
                        >
                            <IconContext.Provider value={{ size: 20 }}>
                                <FiChevronLeft />
                            </IconContext.Provider>
                        </div>
                        <div className='text-sm font-medium cursor-pointer'
                            onClick={() => setOpenChapters(true)}
                        >
                            Chapter {dataChapter[currentIndexChapter]?.name}
                        </div>
                        <div className={`${currentIndexChapter == 0 ? "text-[#D9D9D9]" : "cursor-pointer"}`}
                            onClick={() => handleNextChapter()}
                        >
                            <IconContext.Provider value={{ size: 20 }}>
                                <FiChevronRight />
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
            {menuOpen && <OptionSelect
                setMenuOpen={setMenuOpen}
                menuOpen={menuOpen}
                meta={meta}
                mangaId={mangaId}
                sourceId={sourceId}
                chapterId={chapterId}
                chapterName={chapterName}
            />}

            {openChapters && <ChapterSelect
                dataChapter={dataChapter}
                setOpenChapters={setOpenChapters}
                openChapters={openChapters}
                currentIndexChapter={currentIndexChapter}
                mangaId={mangaId}
                sourceId={sourceId}
            />}
        </>
    )
}
