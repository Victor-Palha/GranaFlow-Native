import { API } from "@/api/config"
import { useAPI } from "@/hooks/useApi"
import SecureStoragePersistence from "@/persistence/secureStorage"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
// {\"wallets\":[{\"id\":11,\"name\":\"Banana Wallet\",\"type\":\"PERSONAL\",\"inserted_at\":\"2025-03-10T02:05:03Z\",\"updated_at\":\"2025-03-10T02:05:03Z\",\"user_id\":6}]}

export function walletsModelView(){
    const [trackWallets, setTrackWallets] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoadingWallets, setIsLoadingWallets] = useState(false)
    const [wallets, setWallets] = useState<any[]>([])

    async function loadWallets(){
        const token = await SecureStoragePersistence.getJWT()
        if(!token){
            return
        }
        setIsLoadingWallets(true)
        try {
            const api = await useAPI()
            if(!api){
                return;
            }
            const response = await api.server.get("/api/wallet")
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

    function handleModal(){
        setIsModalOpen(!isModalOpen)
    }

    useEffect(()=>{
        loadWallets()
    }, [trackWallets])


    const values = {
        wallets,
        isLoadingWallets,
        isModalOpen,
        loadWallets,
        handleModal,
        setTrackWallets
    }

    return values
}