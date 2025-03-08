import { URLS } from "@/constants/URLS"
import axios from "axios"

class API{
    static server = axios.create({
        url: URLS.api
    })

    static setTokenAuth(token: string){
        this.server.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

