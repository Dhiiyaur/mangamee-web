import { useRef, useEffect } from 'react';

export default function SourceSelect({
    setMenuOpen,
    menuOpen,
    source,
    setSource,
    setMangaSource,
    mangaSource
}) {
    const dropdown = useRef(null);

    const HandleSelectSource = (sourceId) => {
        setSource(sourceId);
        setMangaSource([]);
        setMenuOpen(false);
    };

    useEffect(() => {
        if (!menuOpen) return;
        function handleClick(e) {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        window.addEventListener('click', handleClick);
        return () => window.addEventListener('click', handleClick);
    }, [menuOpen, setMenuOpen]);

    return (
        <div ref={dropdown}>
            <div className='fixed z-30 w-full sm:w-[50%] h-2/3 bottom-0 inset-x-0 sm:left-[25%] rounded-t-2xl bg-[#2b2b2b]'>
                <div className='flex justify-center mt-5 sm:mt-8'>
                    <span className='w-[20%] border-b-[3px] rounded-lg'></span>
                </div>
                <div className='sm:p-10 p-8 mt-3'>
                    <span className='text-white text-lg'>
                        Source select
                    </span>
                    <div className='flex flex-col mt-5 space-y-3'>
                        {mangaSource.map((value, index) => (

                            <div className='flex space-x-5 cursor-pointer hover:bg-[#464646]' 
                                onClick={() => HandleSelectSource(value.id)}
                                key={index}    
                            >
                                <span className={`${source == value.id ? 'bg-green-300' : ''} w-[0.5%] py-2.5`}></span>
                                <span className={`${source == value.id ? '' : 'opacity-70' } py-2.5 text-white`}>
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
