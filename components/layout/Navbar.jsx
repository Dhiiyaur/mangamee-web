import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiHome, FiSearch, FiBookmark } from "react-icons/fi";

import { IconContext } from "react-icons";

export default function Navbar() {

    let router = useRouter();
    const [currentRoute, setCurrentRoute] = useState()
    const [width, setWidth] = useState();

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

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

    const mobileView = (
        <div className='w-full flex justify-center fixed inset-x-0 bottom-0 bg-[#1E1E1E] z-10'>
            <div className='flex w-[68%] justify-between p-3'>
                <button className={`${currentRoute == 'home' ? 'text-[#92EBFF]' : 'text-white'}`}
                    onClick={() => router.push('/')}
                >
                    <IconContext.Provider value={{ size: 25 }}>
                        <FiHome />
                    </IconContext.Provider>

                </button>
                <button className={`${currentRoute == 'search' ? 'text-[#92EBFF]' : 'text-white'}`}
                    onClick={() => router.push('/search')}
                >
                    <IconContext.Provider value={{ size: 25 }}>
                        <FiSearch />
                    </IconContext.Provider>
                </button>
                <button className={`${currentRoute == 'bookmark' ? 'text-[#92EBFF]' : 'text-white'}`}
                    onClick={() => router.push('/bookmark')}>
                    <IconContext.Provider value={{ size: 25 }}>
                        <FiBookmark />
                    </IconContext.Provider>
                </button>
            </div>

        </div>
    )

    const desktopView = (
        <div className='fixed inset-x-0 top-0 z-10 p-3 bg-[#181818]'>
            <div className='flex justify-between px-10'>
                <div>
                    <p className='text-white font-semibold'>
                        Mangamee
                    </p>
                </div>
                <div className='flex justify-between space-x-7'>
                    <button className='text-white font-light'
                        onClick={() => router.push('/')}
                    >
                        Home
                    </button>
                    <button className='text-white font-light'
                        onClick={() => router.push('/search')}
                    >
                        Search
                    </button>
                    <button className='text-white font-light'
                        onClick={() => router.push('/bookmark')}
                    >
                        Bookmark
                    </button>
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        setWidth(window.innerWidth)
    }, []);

    return (
        <>
            {width <= 768 ?
                <>
                    {mobileView}
                </>
                :
                <>
                    {desktopView}
                </>
            }
        </>)
    // }

}