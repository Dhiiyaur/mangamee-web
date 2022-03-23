import UpperNavbar from '@/components/layout/UpperNavbar'

export default function Layout({ children }) {
    return (
        <>
            <div className='min-h-screen bg-[#121212]'>
                <UpperNavbar />
                {children}
            </div>
        </>
    )
}
