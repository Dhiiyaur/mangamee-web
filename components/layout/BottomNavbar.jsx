import { FindIndex } from '@/lib/helper';
import { useEffect, useState } from 'react';
import ChapterSelect from '@/components/layout/ChapterSelect';
import { useRouter } from 'next/router';

export default function BottomNavbar({
    dataChapter,
    currentChapter,
    mangaId,
    sourceId,
}) {
    let router = useRouter();

    const [chapterName, setChapterName] = useState();
    const [chapterIndex, setChapterIndex] = useState();
    const [openChapters, setOpenChapters] = useState(false);

    const HandleNextChapter = () => {
        if (chapterIndex > 0) {
            let nexChapter = dataChapter.Chapters[chapterIndex - 1]['Id'];
            router.push(`/r/${sourceId}/${mangaId}/${nexChapter}`);
        }
    };

    const HandlePrevChapter = () => {
        if (chapterIndex < (dataChapter.Chapters.length - 1)) {
            let prevChapter = dataChapter.Chapters[chapterIndex + 1]['Id'];
            router.push(`/r/${sourceId}/${mangaId}/${prevChapter}`);
        }
    };

    useEffect(() => {
        if (dataChapter && currentChapter) {


            console.log(dataChapter, currentChapter, mangaId, sourceId)
            let index = FindIndex(dataChapter.Chapters, currentChapter);
            setChapterIndex(index);
            setChapterName(dataChapter.Chapters[index]['Name']);

        }
    }, [dataChapter, currentChapter]);

    return (
        <div>
            <div className='fixed inset-x-0 bottom-0 p-2 bg-[#121212] opacity-70'>
                <div className='flex justify-center'>
                    <div className='flex justify-between w-[80%] items-center'>
                        <button
                            className='text-white'
                            onClick={() => HandlePrevChapter()}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-7 w-7'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                        <span
                            className='text-white text-sm font-semibold cursor-pointer'
                            onClick={() => setOpenChapters(true)}
                        >
                            {chapterName}
                        </span>
                        <button
                            className='text-white'
                            onClick={() => HandleNextChapter()}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-7 w-7'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {openChapters && (
                <ChapterSelect
                    chapters={dataChapter.Chapters}
                    openChapters={openChapters}
                    setOpenChapters={setOpenChapters}
                    chapterName={chapterName}
                    mangaId={mangaId}
                    sourceId={sourceId}
                />
            )}
        </div>
    );
}
