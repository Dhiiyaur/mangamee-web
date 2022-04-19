export default function MangaCardSkeleton() {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-5 sm:gap-6 gap-4 px-5 py-2'>
        {Array(12)
                .fill()
                .map((_, index) => (
                    <div
                        className='w-full h-60 bg-gray-700 rounded-md overflow-hidden animate-pulse text-white flex flex-col items-center justify-center space-y-12 mt-2'
                        key={index}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-16 w-16'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                        </svg>

                        <div className='flex flex-col w-full items-center space-y-3'>
                            <span className='bg-gray-600 p-3 w-[85%] rounded-md' />
                            <span className='bg-gray-600 p-2 w-[60%] rounded-md' />
                        </div>
                    </div>
                ))}
        </div>
    );
}
