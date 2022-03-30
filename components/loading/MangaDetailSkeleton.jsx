export default function MangaDetailSkeleton() {
    return (
        <div className="flex flex-col items-center animate-pulse justify-center pt-10">
            <div className='bg-gray-500 w-[80%] h-[470px] flex items-center justify-center text-white rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>

            <div className="w-[80%] mt-5">
                <div className="flex flex-col space-y-3">
                    <span className="bg-gray-500 w-[50%] py-5 rounded-md" />
                    <span className="bg-gray-500 w-[100%] py-10 rounded-md" />
                </div>
            </div>
        </div>
    )
}
