const SERVER = `${process.env.NEXT_PUBLIC_SERVER}`
const LOCAL = `${process.env.NEXT_PUBLIC_LOCAL}`

const LOCAL_BASE_URL_MANGA = LOCAL + '/manga'
const SERVER_BASE_URL_MANGA = SERVER + '/manga'
const SERVER_BASE_URL_LINK = LOCAL + '/link'
const SERVER_BASE_URL_BOOKMARK = SERVER + '/bookmark'
const LOCAL_BASE_URL_BOOKMARK = LOCAL + '/bookmark'


const fetchIndexServer = async(sourceId, page) => {
    let url = `${LOCAL_BASE_URL_MANGA}/index/${sourceId}/${page}`
    return await fetch(url)
}

const fetchSourceServer = async() => {
    let url = `${LOCAL_BASE_URL_MANGA}/source`
    return await fetch(url)
}

const fetchDetailServer = async(sourceId, mangaId) => {
    let url = `${LOCAL_BASE_URL_MANGA}/detail/${sourceId}/${mangaId}`
    return await fetch(url)
}

const fetchMetaServer = async(sourceId, mangaId) => {
    let url = `${LOCAL_BASE_URL_MANGA}/meta/${sourceId}/${mangaId}`
    return await fetch(url)
}

const fetchGetLongUrl = async(shortUrl) => {
    let url = `${LOCAL_BASE_URL_MANGA}/${shortUrl}`
    return await fetch(url)
}

const fetchGetShortUrl = async(longUrl) => {
    let url = `${LOCAL_BASE_URL_MANGA}/${longUrl}`
    return await fetch(url, {
        method: 'POST'
    })
}

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

const fetchGetBookmarkCode = async(data) => {
    let url = `${SERVER_BASE_URL_BOOKMARK}/`
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

const fetchGetBookmark = async(id) => {
    let url = `${SERVER_BASE_URL_BOOKMARK}/${id}`
    return await fetch(url)
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
    fetchGetShortUrl,
    fetchGetBookmarkCode,
    fetchGetBookmark,

    fetchDetailServer,
    fetchIndexServer,
    fetchMetaServer,
    fetchSourceServer
}

export default MangameeApi


