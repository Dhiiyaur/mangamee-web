import { useRouter } from 'next/router';


export default function ChapterSelect({ chapters, setOpenChapters, chapterName, mangaId }) {

    let router = useRouter()

    return (
        <div className='fixed inset-x-0 bottom-0 h-2/3 bg-[#1b1b1b] rounded-t-lg'>
            <div className='flex justify-end p-3'>
                <span className='text-white' onClick={() => setOpenChapters(false)}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7'
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

            {/* scroll nih */}
            <div className="overflow-y-scroll absolute h-full w-full">
                {chapters.map((value, index) => (
                    <div key={index} className="flex cursor-pointer" onClick={() => {
                        router.push(`/r/${mangaId}/${value.Id}`)
                        setOpenChapters(false)
                    }}>
                        <span className={`${chapterName == value.Name && "bg-green-500"} w-[1.5%]`} />
                        <span className="text-white px-7 py-2.5">
                            {value.Name}
                        </span>
                    </div>
                ))}
                <span className="p-8"/>
            </div>
        </div>
    )
}
