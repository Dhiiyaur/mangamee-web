import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/store';

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
    }, [])

    return (
        <>
            <div className='flex justify-end p-3 sticky top-0 bg-[#121212]'>
                <div
                    className='text-white'
                    onClick={() => setOpenMenu(true)}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-9 w-9'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4 6h16M4 12h16m-7 6h7'
                        />
                    </svg>
                </div>
            </div>

            {openMenu && (
                <div className='fixed inset-0 z-50'>
                    <div className='min-h-screen bg-[#121212]'>
                        <div className='flex justify-end p-3'>
                            <span className='text-white' onClick={() => setOpenMenu(false)}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-9 w-9'
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
                                    className={`${
                                        currentRoute == 'home' && 'bg-green-300'
                                    } w-[1.5%]`}
                                />
                                <div
                                    className='px-7 w-full'
                                    onClick={() => router.push('/')}
                                >
                                    <h3 className='text-white text-lg border-b-2 py-3 border-[#2e2e2e]'>
                                        Home
                                    </h3>
                                </div>
                            </span>
                            <span className='flex'>
                                <span
                                    className={`${
                                        currentRoute == 'browse' &&
                                        'bg-green-300'
                                    } w-[1.5%]`}
                                />
                                <div
                                    className='px-7 w-full'
                                    onClick={() => router.push('/browse')}
                                >
                                    <h3 className='text-white text-lg border-b-2 py-3 border-[#2e2e2e]'>
                                        Browse
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
