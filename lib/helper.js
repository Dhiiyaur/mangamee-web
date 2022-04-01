export const FindChapter = (data, current) => {

    let temp = data.findIndex(item => item.Id == current)
    return data[temp]["Name"]
}
