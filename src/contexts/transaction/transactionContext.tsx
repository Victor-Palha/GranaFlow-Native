import { Transaction } from "@/@types/transactions";
import { useAPI } from "@/hooks/useApi";
import { createContext, useEffect, useState } from "react";

interface TransactionContextProps {
    transactions: Transaction[];
    isTransactionsLoading: boolean;
    refetchTransactions: () => void;
    setWalletToProvider: (wallet_id: number) => void;
}

export const TransactionContext = createContext<TransactionContextProps>({} as TransactionContextProps)

export function TransactionContextProvider({children}: {children: React.ReactNode}){
    const [isTransactionsLoading, setIsTransactionsLoading] = useState<boolean>(false)
    const [isNeedToRefetch, setIsNeedToRefetch] = useState<number>(0) //Is our observer
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [walletId, setWalletId] = useState<number | null>(null)

    async function fetchTransactions() {
        const api = await useAPI();
        if (!api || !walletId) {
            return;
        }
        setIsTransactionsLoading(true)
        try {
            const response = await api.server.get("/api/transaction", {
                params: {
                    wallet_id: walletId,
                    limit: null,
                    is_until_today: true
                }
            });
            const {transactions} = response.data;
            setTransactions(transactions)
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            throw error;
        } finally {
            setIsTransactionsLoading(false)
        }
    }

    function refetchTransactions(){
        const valueToObserver = Math.floor(Math.random() * 1000) 
        setIsNeedToRefetch(valueToObserver)
    }

    function setWalletToProvider(wallet_id: number){
        setWalletId(wallet_id)
    }

    useEffect(() => {
        fetchTransactions()
    }, [isNeedToRefetch, walletId])


    const values = {
        transactions,
        isTransactionsLoading,
        refetchTransactions,
        setWalletToProvider
    }

    return (
        <TransactionContext.Provider value={values}>
            {children}
        </TransactionContext.Provider>
    )
}