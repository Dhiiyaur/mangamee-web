import UpperNavbar from '@/components/layout/UpperNavbar'

export default function Layout({ children }) {

    return (
        <>
            <UpperNavbar />
            <div className='min-h-screen bg-[#1a1a1a]'>
                {children}
            </div>
        </>
    )
}
