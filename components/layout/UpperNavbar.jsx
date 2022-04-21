import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { FiSearch, FiMenu, FiGrid } from "react-icons/fi";
import { RiLayoutGridFill, RiSearchLine, RiHome2Line, RiBookMarkLine, RiBookOpenLine, RiFunctionLine, RiCloseLine } from "react-icons/ri";
import { IconContext } from "react-icons";

export default function UpperNavbar() {

    let router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    const [currentRoute, setCurrentRoute] = useState()

    useEffect(() => {
        const getRoute = () => {
            let route = router.asPath;
            if (route !== '/') {
                setCurrentRoute(route.split('/')[1])
            } else {
                setCurrentRoute("home")
            }
        }
        getRoute()
    }, [router])

    return (
        <>
            {/* <div className='flex z-20 space-x-5 text-center justify-end px-5 py-3.5 sticky top-0 bg-[#1d1c1cfc]'> */}
            <div className='flex z-20 space-x-5 text-center justify-between px-5 py-3.5 sticky top-0 bg-[#333335]'>
                {/* <button className='text-white cursor-pointer' onClick={() => router.push('/search')}>
                    <IconContext.Provider value={{ size: 25 }}>
                        <FiSearch />
                    </IconContext.Provider>
                </button> */}
                <button
                    className='text-white cursor-pointer'
                    onClick={() => setOpenMenu(true)}
                >
                    <IconContext.Provider value={{ size: 28 }}>
                        {/* <FiMenu /> */}
                        <RiFunctionLine />
                    </IconContext.Provider>
                </button>
                <button className='text-white cursor-pointer' onClick={() => router.push('/search')}>
                    <IconContext.Provider value={{ size: 28 }}>
                        <RiSearchLine />
                    </IconContext.Provider>
                </button>
            </div>

            {openMenu && (
                <div className='fixed inset-0 z-20'>
                    {/* <div className='min-h-screen bg-[#1a1a1a]'> */}
                    <div className='min-h-screen bg-[#2b2b2b]'>
                        <div className='flex justify-end p-3'>
                            <span className='text-white cursor-pointer' onClick={() => setOpenMenu(false)}>
                                {/* <svg
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
                                </svg> */}
                                <IconContext.Provider value={{ size: 32 }}>
                                    <RiCloseLine />
                                </IconContext.Provider>
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='flex space-x-5'>
                                <span
                                    className={`${currentRoute == 'home' && 'bg-green-200'
                                        } w-[1.5%]`}
                                />
                                <span className={`${currentRoute == 'home' ? "text-green-200" : "text-white"} flex items-center`}>
                                    <IconContext.Provider value={{ size: 32 }}>
                                        <RiHome2Line />
                                    </IconContext.Provider>
                                </span>
                                <div
                                    className='w-full'
                                    onClick={() => router.push('/')}
                                >
                                    <h3 className={`${(currentRoute == 'home') ? "text-green-200 font-semibold" : "text-white"} cursor-pointer text-lg py-3`}>
                                        Home
                                    </h3>
                                </div>
                            </span>
                            <span className='flex space-x-5'>
                                <span
                                    className={`${currentRoute == 'search' &&
                                        'bg-green-200'
                                        } w-[1.5%]`}
                                />
                                <span className={`${currentRoute == 'search' ? "text-green-200" : "text-white"} flex items-center`}>
                                    <IconContext.Provider value={{ size: 32 }}>
                                        <RiSearchLine />
                                    </IconContext.Provider>
                                </span>
                                <div
                                    className='w-full'
                                    onClick={() => router.push('/search')}
                                >
                                    <h3 className={`${(currentRoute == 'search') ? "text-green-200 font-semibold" : "text-white"} cursor-pointer text-lg py-3`}>
                                        Search
                                    </h3>
                                </div>
                            </span>
                            <span className='flex space-x-5'>
                                <span
                                    className={`${(currentRoute == 'm' || currentRoute == 'r' || currentRoute == '404') &&
                                        'bg-green-200'
                                        } w-[1.5%]`}
                                />
                                <span className={`${(currentRoute == 'm' || currentRoute == 'r' || currentRoute == '404') ? "text-green-200" : "text-white"} flex items-center`}>
                                    <IconContext.Provider value={{ size: 32 }}>
                                        <RiBookOpenLine />
                                    </IconContext.Provider>
                                </span>
                                <div
                                    className='w-full'
                                >
                                    <h3 className={`${(currentRoute == 'm' || currentRoute == 'r') ? "text-green-200 font-semibold" : "text-white"} text-lg py-3`}>
                                        Read
                                    </h3>
                                </div>
                            </span>
                            <span className='flex space-x-5'>

                                <span
                                    className={`${currentRoute == 'bookmark' &&
                                        'bg-green-200'
                                        } w-[1.5%]`}
                                />
                                <span className={`${currentRoute == 'bookmark' ? "text-green-200" : "text-white"} flex items-center`}>
                                    <IconContext.Provider value={{ size: 32 }}>
                                        <RiBookMarkLine />
                                    </IconContext.Provider>
                                </span>
                                <div
                                    className='w-full'
                                    onClick={() => router.push('/bookmark')}
                                >
                                    <h3 className={`${(currentRoute == 'b') ? "text-green-200 font-semibold" : "text-white"} cursor-pointer text-lg py-3`}>
                                        Bookmark
                                    </h3>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
