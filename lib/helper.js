export const FindIndex = (data, current) => {
    return data.findIndex(item => item.Id == current)
}

export const MangaSource = [
    { name: 'Mangaread', id: 1 },
    { name: 'Mangatown', id: 2 },
    { name: 'Maidmy', id: 3 }
];