import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';


export default function ChapterSelect({ chapters, openChapters, setOpenChapters, chapterName, mangaId, sourceId }) {

    let router = useRouter()
    const [searchFilter, setSearchFilter] = useState('')
    const dropdown = useRef(null)

    useEffect(() => {

        if (!openChapters) return
        function handleClick(e) {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setOpenChapters(false)
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.addEventListener("click", handleClick);

    }, [openChapters, setOpenChapters])


    return (
        <div ref={dropdown}>
            <div className='fixed inset-x-0 bottom-0 h-2/3 bg-[#1a1a1a] rounded-t-2xl' >
                <div className='flex justify-center mt-5'>
                    <span className='w-[20%] border-b-[3px] rounded-lg'>

                    </span>
                </div>

                <div className='px-6 mt-6'>
                    <input className='outline-none w-full bg-[#2b2b2b] p-3 text-white rounded-lg text-sm' placeholder='Search Chapter' onChange={(e) => setSearchFilter(e.target.value)} />
                </div>

                {/* scroll nih */}

                <div className="overflow-y-scroll absolute h-full w-full mt-4 pb-28">
                    {chapters.filter((item) => {
                        if (item.Name
                            .toLowerCase()
                            .includes(searchFilter.toLocaleLowerCase())
                        ) {
                            return item
                        }
                    })
                        ?.map((value, index) => (
                            <div key={index} className="flex cursor-pointer" onClick={() => {
                                router.push(`/r/${sourceId}/${mangaId}/${value.Id}`)
                                setOpenChapters(false)
                            }}>
                                <span className={`${chapterName == value.Name && "bg-green-500"} w-[1.5%]`} />
                                <span className="text-white px-7 py-2.5">
                                    {value.Name}
                                </span>
                            </div>
                        ))
                    }
                    {/* <span className="p-10" /> */}
                </div>
            </div>
        </div>
    )
}
