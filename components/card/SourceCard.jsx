export default function SourceCard({source, setSource, name, sourceId}) {
    return (
        <button className={`${sourceId == source ? "bg-gray-200 text-gray-800 rounded-lg" : "text-gray-100"} text-sm  py-2 px-3 `} onClick={() => setSource(sourceId)}>
            {name}
        </button>
    )
}
