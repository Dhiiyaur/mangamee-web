const modifyBookmark = (sourceId, mangaId, chapterId, chapterName) => {

    let load = loadBookmark()
    if (load) {
        let index = load.findIndex(i => i.uid == sourceId + "/" + mangaId)
        if (index !== -1) {
            load[index].chapter = chapterId
            load[index].chapter_name = chapterName
            localStorage.setItem("bookmark", JSON.stringify(load))
        }
    }
}

const removeBookmark = (mangaId) => {

    let load = loadBookmark()
    if (load) {
        if (load.length == 1) {
            localStorage.removeItem("bookmark")
        } else {
            let index = load.findIndex(i => i.id == mangaId)
            load.splice(index, 1)
            localStorage.setItem("bookmark", JSON.stringify(load))
        }
    }
}

const addBookmark = (sourceId, mangaId, title, cover, chapter = null, chapter_name = null) => {

    let addManga = {
        uid: sourceId + "/" + mangaId,
        id: mangaId,
        source: sourceId,
        title: title,
        cover: cover,
        chapter: chapter,
        chapter_name : chapter_name
    }

    let load = loadBookmark()
    if (load) {
        load.push(addManga)
        localStorage.setItem("bookmark", JSON.stringify(load))
    } else {
        localStorage.setItem("bookmark", JSON.stringify([addManga]))
    }
}

const loadBookmark = () => {
    return JSON.parse(localStorage.getItem("bookmark"))
}

const checkBookmark = (mangaId) => {

    let load = loadBookmark()
    if (load) {
        let filter = load.filter(i => i.id == mangaId)
        if (filter.length > 0) {
            return true
        } return false
    } else {
        return false
    }
}

const getSingleBookmarkId = (mangaId) => {
    let load = loadBookmark()
    if (load) {
        let filter = load.filter(i => i.id == mangaId)
        if (filter.length > 0) {
            return filter[0]
        }   return null
    }
}

const BookmarkManager = {

    checkBookmark,
    addBookmark,
    removeBookmark,
    modifyBookmark,
    loadBookmark,
    getSingleBookmarkId

}

const getPosition = () => {
    return sessionStorage.getItem("Position", window.pageYOffset)
}

const setPosition = () => {
    sessionStorage.setItem("Position", window.pageYOffset)
}

const removePosition = () => {
    sessionStorage.removeItem("Position", window.pageYOffset)
}



const PositionHelper = {
    getPosition,
    setPosition,
    removePosition
}

export { BookmarkManager, PositionHelper }