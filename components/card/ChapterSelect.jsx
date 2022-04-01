import { useRouter } from 'next/router';

export default function ChapterSelect({ setOpenChapter, value, mangaID, chapterName }) {

    let router = useRouter()

    const handleSelectChapter = (id) => {
        setOpenChapter(false)
        router.push(`/r/${mangaID}/${id}`)
    }

    return (
        <div className='fixed inset-0 z-50'>
            <div className='min-h-screen bg-[#121212]'>
                <div className='flex justify-end p-3'>
                    <span className='text-white' onClick={() => setOpenChapter(false)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-9 w-9'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </span>
                </div>
                <div className='flex flex-col space-y-3'>
                    {value.Chapters.map((value, index) => (
                        <div className='flex cursor-pointer' key={index} onClick={() => handleSelectChapter(value.Id)}>
                            <span
                                className={`${chapterName == value.Name && 'bg-green-300'
                                    } w-[1.5%]`}
                            />
                            <span className='text-white px-7'>
                                {value.Name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
