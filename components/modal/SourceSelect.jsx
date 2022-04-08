import { useRef, useEffect } from 'react';
import { MangaSource } from '@/lib/helper';

export default function SourceSelect({setMenuOpen, menuOpen, source, setSource, setMangaStore}) {
    const dropdown = useRef(null);

    const HandleSelectSource = (sourceId) => {

        setSource(sourceId)
        setMangaStore([])
        setMenuOpen(false)
    }

    useEffect(() => {

        if (!menuOpen) return
        function handleClick(e) {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.addEventListener("click", handleClick);

    }, [menuOpen, setMenuOpen])

    return (
        <div ref={dropdown}>
            <div className='fixed z-30 inset-x-0 bottom-0 h-2/3 bg-[#2b2b2b] rounded-t-2xl'>
                <div className='flex justify-center mt-5'>
                    <span className='w-[20%] border-b-[3px] rounded-lg'></span>
                </div>
                <div className='p-5 mt-3'>
                    <span className='text-white text-lg'>
                        Source select
                    </span>

                    <div className='flex flex-col mt-5'>
                        {MangaSource.map((value, index) => (
                            <div key={index} className='flex py-2.5 items-center space-x-7 cursor-pointer' onClick={() => HandleSelectSource(value.id)}>
                                <span className={`h-5 w-5 rounded-full border-2 ${source == value.id ? "bg-[#5f85db]" : "bg-white"}`}/>
                                <span className='text-white'>
                                    {value.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
