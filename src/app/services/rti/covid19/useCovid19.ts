import { covid19API } from "@/app/api/covid19/covid19API"
import { ICovid } from "@/app/interfaces/ICovid"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"


export const useCovid19 =()=>{
    return useQuery<ICovid[], AxiosError>({queryKey: ['covid19'], queryFn: covid19API.getCovid19})
}