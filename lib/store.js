const modifyBookmark = (params) => {
    let arr = loadBookmark()
    if ( arr !== null ) {
        let index = arr.findIndex(i => i.UID == params.sourceId+ "/" +params.mangaId)
        if (index !== -1) {
            arr[index].Chapter = params.chapterId
            localStorage.setItem("bookmark", JSON.stringify(arr))
        }
    }
}

const removeBookmark = (params) => {
    let arr = loadBookmark()
    if (arr.length == 1) {
        localStorage.removeItem("bookmark")
    } else {
        let index = arr.findIndex(i => i.Id == params.mangaId)
        arr.splice(index, 1)
        localStorage.setItem("bookmark", JSON.stringify(arr))
    }
}

const addBookmark = (params) => {

    let setManga = {
        UID : params.sourceId+ "/" +params.mangaId,
        Id: params.mangaId,
        Source: params.sourceId,
        Title: params.title,
        Cover: params.cover,
        Chapter: null
    }

    let arr = loadBookmark()
    if (arr == null) {
        localStorage.setItem("bookmark", JSON.stringify([setManga]))
    } else {
        arr.push(setManga)
        localStorage.setItem("bookmark", JSON.stringify(arr))
    }
}

const setBookmark = (params) => {
    if (params.isBookmark) {
        removeBookmark(params)
        params.setIsBookmark(false)
    } else {
        addBookmark(params)
        params.setIsBookmark(true)
    }
}

const checkBookmark = (params) => {

    let arr = loadBookmark()
    if (arr == null) {
        return false
    } else {
        let filter = arr.filter(i => i.Id == params.mangaId)
        if (filter.length > 0) {
            return true
        } return false
    }
}


const loadBookmark = () => {
    return JSON.parse(localStorage.getItem("bookmark"))
}

const BookmarkManager = {
    checkBookmark,
    setBookmark,
    loadBookmark,
    modifyBookmark
}


export default BookmarkManager