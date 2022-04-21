export default function SourceCard({source, setSource, name, sourceId}) {
    return (
        <button className={`${sourceId == source ? "bg-white text-gray-800 rounded-xl" : "text-white"} text-sm  py-2 px-3 opacity-90`} onClick={() => setSource(sourceId)}>
            {name}
        </button>
    )
}
