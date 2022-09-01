import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { FiX } from "react-icons/fi";

export default function ChapterSelect({ setOpenChapters, openChapters, dataChapter, currentIndexChapter, sourceId, mangaId }) {

    let router = useRouter()
    const dropdown = useRef(null);
    const [searchFilter, setSearchFilter] = useState('');

    useEffect(() => {
        if (!openChapters) return;
        function handleClick(e) {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setOpenChapters(false);
            }
        }
        window.addEventListener('click', handleClick);
        return () => window.addEventListener('click', handleClick);
    }, [openChapters, setOpenChapters]);

    return (
        <div ref={dropdown} className='z-[2] fixed w-full bottom-0 inset-x-0 h-[60%] sm:h-[80%] flex justify-center'>
             <div className='w-full rounded-t-xl bg-[#181818] sm:w-[50%]'>
                {/* <div className='flex justify-center mt-5 sm:mt-8'>
                    <span className='w-[20%] border-b-[6px] rounded-lg' />
                </div> */}
                <div className='flex w-full justify-between mt-5 sm:mt-8 px-5'>
                        <div className='text-[#181818] cursor-pointer'>
                            <IconContext.Provider value={{ size: 28 }}>
                                <FiX />
                            </IconContext.Provider>
                        </div>
                        <div className='w-full flex items-center justify-center'>
                            <span className='w-[20%] border-b-[6px] rounded-lg' />
                        </div>
                        <div className='text-white cursor-pointer' onClick={() => setOpenChapters(false)}>
                            <IconContext.Provider value={{ size: 28 }}>
                                <FiX />
                            </IconContext.Provider>
                        </div>
                    </div>
                <div className='px-5 py-3'>
                    <input
                        className='outline-none bg-[#2b2b2b] p-4 text-white text-sm w-full rounded-xl'
                        placeholder='Search Chapter'
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </div>
                <div className='overflow-y-scroll absolute h-full w-full sm:w-[50%] pb-48 px-5 py-5'>
                    <div className='flex flex-col space-y-3.5'>
                        {dataChapter?.filter((item) => {
                            if (
                                item.Name.toLowerCase().includes(
                                    searchFilter.toLocaleLowerCase()
                                )
                            ) {
                                return item;
                            }
                        })?.map((value, index) => (
                            <div
                                className={`${dataChapter[currentIndexChapter].Id == value.Id ? "bg-[#8CBE6D]" : "bg-[#2b2b2b]"} rounded-xl bg-[#2b2b2b] p-4 px-6 text-white flex justify-start cursor-pointer`}
                                key={index}
                                onClick={() => {
                                    router.push(
                                        `/r/${sourceId}/${mangaId}/${value.Id}`
                                    );
                                    setOpenChapters(false);
                                }}
                            >
                                Chapter {value.Name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
