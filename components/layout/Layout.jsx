import Navbar from './Navbar';

export default function Layout({ children, mobile }) {
    return (
        <>
            <Navbar />
            <div className='min-h-screen bg-[#1E1E1E] flex justify-center'>
                <div className='w-full'>{children}</div>
            </div>
        </>
    );
}
