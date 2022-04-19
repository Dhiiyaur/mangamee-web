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
        Title: params.title,
        Cover: params.cover,
        Id: params.mangaId,
        Source: params.sourceId
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
    loadBookmark
}


export default BookmarkManager