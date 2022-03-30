import Layout from '@/components/layout/Layout'


export default function PageNotFound() {
    return (
        <Layout>
            <div className='w-full min-h-screen justify-center items-center flex'>
                <div className='flex flex-col mb-32'>
                    <span className='text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </span>
                    <span className='text-white text-xl text-center'>
                        Not Found
                    </span>
                </div>
            </div>

        </Layout>
    )
}
