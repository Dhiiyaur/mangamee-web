// export const SERVER_BASE_URL_MANGA = `${process.env.NEXT_PUBLIC_URL}/manga`

// const SERVER_BASE_URL_MANGA = `https://mangamee-api.herokuapp.com/manga`
const SERVER_BASE_URL_MANGA = `https://api.mangamee.space/manga`

const fetchIndex = async(sourceId, page) => {
    let url = `${SERVER_BASE_URL_MANGA}/index/${sourceId}/${page}`
    return await fetch(url)
}

const fetchDetail = async(sourceId, mangaId) => {
    let url = `${SERVER_BASE_URL_MANGA}/detail/${sourceId}/${mangaId}`
    return await fetch(url)
}

const fetchImage = async(sourceId, mangaId, chapterId) => {
    let url = `${SERVER_BASE_URL_MANGA}/read/${sourceId}/${mangaId}/${chapterId}`
    return await fetch(url)
}

const fetchChapter = async(sourceId, mangaId) => {
    let url = `${SERVER_BASE_URL_MANGA}/chapter/${sourceId}/${mangaId}`
    return await fetch(url)
}

const fetchMeta = async(sourceId, mangaId) => {
    let url = `${SERVER_BASE_URL_MANGA}/meta/${sourceId}/${mangaId}`
    return await fetch(url)
}

const fetchSearch = async(sourceId, search) => {
    let url = `${SERVER_BASE_URL_MANGA}/search/${sourceId}?title=${search}`
    return await fetch(url)
}

const fetchSource = async() => {
    let url = `${SERVER_BASE_URL_MANGA}/source`
    return await fetch(url)
}

const MangameeApi = {
    fetchDetail,
    fetchIndex,
    fetchImage,
    fetchChapter,
    fetchMeta,
    fetchSearch,
    fetchSource
}

export default MangameeApi


