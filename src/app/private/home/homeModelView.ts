import { Transaction } from "@/@types/transactions";
import { API } from "@/api/config";
import SecureStoragePersistence from "@/persistence/secureStorage";
import { useEffect, useState } from "react";

export function HomeModelView(wallet_id: string | string[]){
    const [isLoadingLatestTransactions, setIsLoadingLatestTransactions] = useState(false)
    const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([])
    const [currentBalance, setCurrentBalance] = useState(0.0)

    async function fetchTransactions(wallet_id: string | string[]) {
        const api = API;
        const token = await SecureStoragePersistence.getJWT();
        if (!token) {
            return;
        }
        api.setTokenAuth(token);
        setIsLoadingLatestTransactions(true)
        try {
            const response = await api.server.get("/api/transaction", {
                params: {
                    wallet_id,
                    limit: 5,
                    is_until_today: true
                }
            });

            const currentBalanceResponse = await api.server.get("/api/transaction/balance", {
                params: {
                    wallet_id
                }
            })
            const {current_balance} = currentBalanceResponse.data
            const {transactions} = response.data;
            setLatestTransactions(transactions)
            setCurrentBalance(current_balance)
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            throw error;
        } finally {
            setIsLoadingLatestTransactions(false)
        }
    }

    useEffect(()=>{
        fetchTransactions(wallet_id)
    }, [wallet_id])

    const values = {
        latestTransactions,
        currentBalance,
        isLoadingLatestTransactions
    }

    return values
}