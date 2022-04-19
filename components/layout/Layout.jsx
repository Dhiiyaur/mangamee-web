import UpperNavbar from '@/components/layout/UpperNavbar';

export default function Layout({ children, mobile }) {
    return (
        <>
            <UpperNavbar />
            <div className='min-h-screen bg-[#1a1a1a] flex justify-center'>
                <div className={`w-full ${mobile ? 'sm:w-[50%]' : 'sm:w-[85%]'}`}>{children}</div>
            </div>
        </>
    );
}
