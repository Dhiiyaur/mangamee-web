import { useRouter } from "next/router"

export default function MangaCard({ value }) {

  let router = useRouter()

  return (
    <div className='w-full h-60 bg-gray-500 rounded-md overflow-hidden' onClick={() => router.push(`/m/${value.name}`)}>
      <span>
        <img
          src={value.MangaCover}
          alt=""
          className="w-full h-60 object-cover"
        />
      </span>
    </div>
  )
}
