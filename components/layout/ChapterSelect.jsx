import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';

export default function ChapterSelect({
    chapters,
    openChapters,
    setOpenChapters,
    chapterName,
    mangaId,
    sourceId,
}) {
    let router = useRouter();
    const [searchFilter, setSearchFilter] = useState('');
    const dropdown = useRef(null);

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
        <div ref={dropdown}>
            <div className='fixed z-30 w-full sm:w-[50%] h-2/3 bottom-0 inset-x-0 sm:left-[25%] rounded-t-2xl bg-[#2b2b2b]'>
                <div className='flex justify-center mt-5'>
                    <span className='w-[20%] border-b-[3px] rounded-lg' />
                </div>

                <div className='px-6 mt-6 pb-5'>
                    <input
                        className='outline-none w-full bg-[#2b2b2b] p-3 text-white rounded-xl text-sm border-white border-[1.5px]'
                        placeholder='Search Chapter'
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </div>

                {/* scroll nih */}

                <div className='overflow-y-scroll absolute h-full w-full mt- pb-28'>
                    {chapters
                        .filter((item) => {
                            if (
                                item.Name.toLowerCase().includes(
                                    searchFilter.toLocaleLowerCase()
                                )
                            ) {
                                return item;
                            }
                        })
                        ?.map((value, index) => (
                            <div
                                key={index}
                                className='flex cursor-pointer'
                                onClick={() => {
                                    router.push(
                                        `/r/${sourceId}/${mangaId}/${value.Id}`
                                    );
                                    setOpenChapters(false);
                                }}
                            >
                                <span
                                    className={`${chapterName == value.Name &&
                                        'bg-green-500'
                                        } w-[1.5%] sm:w-[0.5%]`}
                                />
                                <span className='text-white px-7 py-3'>
                                    {value.Name}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>

    );
}
