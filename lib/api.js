// export const SERVER_BASE_URL_MANGA = `${process.env.NEXT_PUBLIC_URL_LOCAL}/manga`
const SERVER_BASE_URL_MANGA = `https://mangamee-api.herokuapp.com/manga`

const fetchIndex = async(params) => {
    let url = `${SERVER_BASE_URL_MANGA}/index/${params.source}/${params.page}`
    return await fetch(url)
}

const fetchDetail = async(params) => {
    let url = `${SERVER_BASE_URL_MANGA}/detail/${params.source}/${params.mangaId}`
    return await fetch(url)
}

const fetchImage = async(params) => {
    let url = `${SERVER_BASE_URL_MANGA}/read/${params.source}/${params.mangaId}/${params.chapterId}`
    let res = await fetch(url)
    return await res.json()
}

const fetchChapter = async(params) => {
    let url = `${SERVER_BASE_URL_MANGA}/read-chapter/${params.source}/${params.mangaId}`
    let res = await fetch(url)
    return await res.json()
}
const MangameeApi = {
    fetchDetail,
    fetchIndex,
    fetchImage,
    fetchChapter
}

export default MangameeApi


