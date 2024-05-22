import { ICovid } from "@/app/interfaces/ICovid"
import axios from "axios"


export const covid19API = {
    getCovid19: async()=>{
        const headers = {
            "X-RapidAPI-Key": "284c220145mshe599a8e13a6edffp178b2cjsnb6a999022ebe",
            "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        }
        const response = await axios.get("https://covid-193.p.rapidapi.com/statistics", {headers})
        return response.data.response as ICovid[]
    }
}