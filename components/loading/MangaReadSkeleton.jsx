export default function MangaReadSkeleton() {
    return (
        <div className="flex flex-col space-y-4 justify-center items-center pt-10">
            {Array(6).fill().map((_, index) => (

                <div className='bg-gray-700 h-[450px] animate-pulse text-white flex justify-center items-center w-[80%] rounded-md' key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            ))}
        </div>
    )
}
