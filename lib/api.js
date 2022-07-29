export const SERVER_BASE_URL = `${process.env.NEXT_PUBLIC_URL_LOCAL}`

const SERVER_BASE_URL_MANGA = SERVER_BASE_URL + '/manga'
const SERVER_BASE_URL_LINK = SERVER_BASE_URL + '/link'

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

const fetchGetLongUrl = async(shortUrl) => {
    let url = `${SERVER_BASE_URL_LINK}/${shortUrl}`
    return await fetch(url)
}

const fetchGetShortUrl = async(longUrl) => {
    let url = `${SERVER_BASE_URL_LINK}/${longUrl}`
    return await fetch(url, {
        method: 'POST'
    })
}

const MangameeApi = {
    fetchDetail,
    fetchIndex,
    fetchImage,
    fetchChapter,
    fetchMeta,
    fetchSearch,
    fetchSource,
    fetchGetLongUrl,
    fetchGetShortUrl
}

export default MangameeApi


