export default function SourceCard({setPage, setSource, source, value}) {
    return (
        <button className='flex flex-col space-y-0.5' onClick={() => {
            setPage(1)
            setSource(value.id)
        }}>
            <p className='text-white text-xs font-medium'>{value.name}</p>
            <p className={`${source == value.id ? "w-full bg-white h-1 rounded-xl" : "block"}`} />

        </button>
    )
}
