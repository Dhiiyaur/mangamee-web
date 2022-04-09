import UpperNavbar from '@/components/layout/UpperNavbar';

export default function Layout({ children }) {
    return (
        <>
            <UpperNavbar />
            <div className='min-h-screen bg-[#1a1a1a] flex justify-center'>
                <div className='w-full sm:w-[65%]'>{children}</div>
            </div>
        </>
    );
}
