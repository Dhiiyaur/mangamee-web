import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiSearch, FiMenu } from "react-icons/fi";
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
            <div className='flex z-20 space-x-5 text-center justify-end px-5 py-3.5 sticky top-0 bg-[#1d1c1cfc]'>
                <button className='text-white cursor-pointer' onClick={() => router.push('/search')}>
                    <IconContext.Provider value={{ size: 25 }}>
                        <FiSearch />
                    </IconContext.Provider>
                </button>
                <button
                    className='text-white cursor-pointer'
                    onClick={() => setOpenMenu(true)}
                >
                    <IconContext.Provider value={{ size: 25 }}>
                        <FiMenu />
                    </IconContext.Provider>
                </button>
            </div>

            {openMenu && (
                <div className='fixed inset-0 z-20'>
                    <div className='min-h-screen bg-[#1a1a1a]'>
                        <div className='flex justify-end p-3'>
                            <span className='text-white' onClick={() => setOpenMenu(false)}>
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
                        <div className='flex flex-col'>
                            <span className='flex'>
                                <span
                                    className={`${currentRoute == 'home' && 'bg-green-300'
                                        } w-[1.5%]`}
                                />
                                <div
                                    className='px-7 w-full'
                                    onClick={() => router.push('/')}
                                >
                                    <h3 className={`${(currentRoute == 'home') ? "text-green-300 font-semibold" : "text-white opacity-70"} cursor-pointer text-lg border-b-2 py-3 border-[#2e2e2e]`}>
                                        Home
                                    </h3>
                                </div>
                            </span>
                            <span className='flex'>
                                <span
                                    className={`${currentRoute == 'search' &&
                                        'bg-green-300'
                                        } w-[1.5%]`}
                                />
                                <div
                                    className='px-7 w-full'
                                    onClick={() => router.push('/search')}
                                >
                                    <h3 className={`${(currentRoute == 'search') ? "text-green-300 font-semibold" : "text-white opacity-70"} cursor-pointer text-lg border-b-2 py-3 border-[#2e2e2e]`}>
                                        Search
                                    </h3>
                                </div>
                            </span>
                            <span className='flex'>
                                <span
                                    className={`${(currentRoute == 'm' || currentRoute == 'r' || currentRoute == '404') &&
                                        'bg-green-300'
                                        } w-[1.5%]`}
                                />
                                <div
                                    className='px-7 w-full'
                                >
                                    <h3 className={`${(currentRoute == 'm' || currentRoute == 'r') ? "text-green-300 font-semibold" : "text-white opacity-70"} text-lg border-b-2 py-3 border-[#2e2e2e]`}>
                                        Read
                                    </h3>
                                </div>
                            </span>
                            <span className='flex'>
                                <span
                                    className={`${currentRoute == 'bookmark' &&
                                        'bg-green-300'
                                        } w-[1.5%]`}
                                />
                                <div
                                    className='px-7 w-full'
                                    onClick={() => router.push('/bookmark')}
                                >
                                    <h3 className={`${(currentRoute == 'b') ? "text-green-300 font-semibold" : "text-white opacity-70"} cursor-pointer text-lg border-b-2 py-3 border-[#2e2e2e]`}>
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
