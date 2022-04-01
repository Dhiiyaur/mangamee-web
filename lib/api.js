import axios from "axios";


export const SERVER_BASE_URL_MANGA = `${process.env.NEXT_PUBLIC_URL_LOCAL}/manga`
// export const SERVER_BASE_URL_MANGA = `https://mangamee-api.herokuapp.com/manga`

export const fetcher = async(url) => await axios.get(url).then(res => res.data)