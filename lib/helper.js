export const FindChapter = (data, current) => {

    let temp = data.findIndex(item => item.Id == current)
    return data[temp]["Name"]
}

export const MangaSource = [
    { name: 'Mangaread', id: 1 },
    { name: 'Mangatown', id: 2 },
    { name: 'Maidmy', id: 3 }
];