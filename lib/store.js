const modifyBookmark = (sourceId, mangaId, chapterId) => {

    let load = loadBookmark()
    if (load) {
        let index = load.findIndex(i => i.UID == sourceId + "/" + mangaId)
        if (index !== -1) {
            load[index].Chapter = chapterId
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
            let index = load.findIndex(i => i.Id == mangaId)
            load.splice(index, 1)
            localStorage.setItem("bookmark", JSON.stringify(load))
        }
    }
}

const addBookmark = (sourceId, mangaId, title, cover, chapter = null) => {

    let addManga = {
        UID: sourceId + "/" + mangaId,
        Id: mangaId,
        Source: sourceId,
        Title: title,
        Cover: cover,
        Chapter: chapter
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
        let filter = load.filter(i => i.Id == mangaId)
        if (filter.length > 0) {
            return true
        } return false
    } else {
        return false
    }
}

const BookmarkManager = {

    checkBookmark,
    addBookmark,
    removeBookmark,
    modifyBookmark,
    loadBookmark
    // checkBookmark,
    // setBookmark,
    // loadBookmark,
    // modifyBookmark,
    // checkBookmarkMangaCard
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