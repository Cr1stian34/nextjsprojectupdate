import { apiYoutubeKey } from "@/app/ApiKeys/ApiKeys";
import axios from "axios"


export const animeAPI = {
    getAnime: async()=>{
        const response = await axios.get("https://api.jikan.moe/v4/top/anime")
        return response.data;
    },
    getAnimeOp: async(idanime: number)=>{
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${idanime}`)
        return response.data
    },
    getYoutube: async(query: string)=>{
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiYoutubeKey}&part=snippet&type=video&q=${query}`)
        return response.data; 
    }
}