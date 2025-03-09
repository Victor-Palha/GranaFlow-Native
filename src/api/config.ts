import { URLS } from "@/constants/URLS"
import axios from "axios"

export class API{
    static server = axios.create({
        baseURL: URLS.api
    })

    static setTokenAuth(token: string){
        this.server.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

