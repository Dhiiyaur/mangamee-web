import { useRef, useEffect } from 'react';
import { FiCheck } from "react-icons/fi";
import { IconContext } from "react-icons";


export default function SourceSelect({
    setMenuOpen,
    menuOpen,
    mangaSourceSelected,
    setMangaSourceSelected,
    mangaSource,
    setMangaData

}) {
    const dropdown = useRef(null);

    const handleSelectSource = (sourceId) => {
        setMangaSourceSelected(sourceId);
        setMangaData([])
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
        <div ref={dropdown} className='fixed bottom-0 inset-x-0 h-[40%] sm:h-[45%] w-full flex justify-center z-[2]'>
            <div className='w-full rounded-t-xl bg-[#181818] sm:w-[50%]'>
                <div className='flex justify-center mt-5 sm:mt-8'>
                    <span className='w-[20%] border-b-[6px] rounded-lg' />
                </div>
                <div className='sm:p-10 p-8 flex flex-col space-y-5'>
                    <p className='text-white font-light'>
                        Select your manga source
                    </p>

                    {mangaSource.map((value, index) => (

                        <div className='flex justify-between' key={index}
                            onClick={() => handleSelectSource(value.id)}
                        >
                            <p className='text-white text-lg font-semibold'>{value.name}</p>
                            <div className={`${mangaSourceSelected == value.id ? "text-white" : "hidden"}`}>
                                <IconContext.Provider value={{ size: 25 }}>
                                    <FiCheck />
                                </IconContext.Provider>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
