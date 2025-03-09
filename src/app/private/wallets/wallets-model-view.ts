import { API } from "@/api/config"
import SecureStoragePersistence from "@/persistence/secureStorage"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

export function walletsModelView(){
    const [isLoadingWallets, setIsLoadingWallets] = useState(false)
    const [wallets, setWallets] = useState<any[]>([])

    async function loadWallets(){
        const token = await SecureStoragePersistence.getJWT()
        if(!token){
            return
        }
        setIsLoadingWallets(true)
        try {
            const api = API
            api.setTokenAuth(token)
            const response = await api.server.get("/api/wallet")
            console.log(response)
            setWallets(response.data.wallets)
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error.response?.data)
                if(error.status == 404){
                    setWallets([])
                }else{
                    Alert.alert("Erro", error.response?.data.message)
                }
            }
        } finally {
            setIsLoadingWallets(false)
        }
    }

    useEffect(()=>{
        loadWallets()
    }, [])


    const values = {
        wallets,
        isLoadingWallets,
        loadWallets
    }

    return values
}