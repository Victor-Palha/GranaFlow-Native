import { Transaction } from "@/@types/transactions"
import { API } from "@/api/config"
import SecureStoragePersistence from "@/persistence/secureStorage"
import { router } from "expo-router"
import { useEffect, useState } from "react"

export enum Methods {
    ALL = "",
    INCOME = "INCOME",
    OUTCOME = "OUTCOME"
}
export function paymentsModelView(wallet_id: string | string[]){
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
    const [trackTransactions, setTrackTransactions] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
    const [paymentsMethods, setPaymentsMethods] = useState<Methods>(Methods.ALL)
    const [totalAmount, setTotalAmount] = useState<number>(0.00)

    function handlePaymentsMethods(method: Methods){
        setPaymentsMethods(method)
    }

    function handleModal(){
        setIsModalOpen(!isModalOpen)
    }

    function handleBackToHome(){
        router.back()
    }

    async function getAllTransactionsBasedOnMethod(){
        const api = API;
        const token = await SecureStoragePersistence.getJWT();
        if (!token) {
            return;
        }
        api.setTokenAuth(token);
        setIsLoadingTransactions(true)
        try {
            const response = await api.server.get("/api/transaction", {
                params: {
                    wallet_id,
                    is_until_today: true,
                    type_transaction: paymentsMethods
                }
            });
        
            const {transactions} = response.data;
            setAllTransactions(transactions)
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            throw error;
        } finally {
            setIsLoadingTransactions(false)
        }
    }

    useEffect(()=>{
        getAllTransactionsBasedOnMethod()
    }, [paymentsMethods])

    const values = {
        totalAmount,
        paymentsMethods,
        isModalOpen,
        allTransactions,
        isLoadingTransactions,
        setTrackTransactions,
        handlePaymentsMethods,
        handleModal,
        handleBackToHome
    }

    return values
}