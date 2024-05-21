import { animeAPI } from "@/app/api/rti/photosAPI"
// import { IPhotos } from "@/app/interfaces/IPhotos"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"


export const useAnime = ()=>{
    return useQuery<any, AxiosError>({queryKey: ['anime'], queryFn: animeAPI.getAnime})
}

export const useAnimeOp = (idanime: number)=>{
    return useQuery<any, AxiosError>({queryKey: ["animeop", idanime], queryFn: ()=> animeAPI.getAnimeOp(idanime)})
}

export const useYoutube = (query: string)=>{
    return useQuery<any, AxiosError>({queryKey: ["youtube", query],queryFn: ()=> animeAPI.getYoutube(query)})
}