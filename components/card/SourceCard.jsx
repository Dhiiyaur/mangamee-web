export default function SourceCard({source, setSource, name, sourceId}) {
    return (
        <button className={`${sourceId == source ? "bg-white text-gray-800 rounded-xl" : "text-white opacity-60 hover:bg-white hover:rounded-xl hover:text-gray-800 hover:opacity-50"} text-sm  py-2 px-3 opacity-90 `} onClick={() => setSource(sourceId)}>
            {name}
        </button>
    )
}
