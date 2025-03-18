import { Transaction } from "@/@types/transactions";
import { MONTHS } from "@/constants/MONTHS";
import { TransactionContext } from "@/contexts/transaction/transactionContext";
import { useAPI } from "@/hooks/useApi";
import { useContext, useEffect, useState } from "react";

export function HomeModelView(wallet_id: string | string[]){
    const {isTransactionsLoading, transactions} = useContext(TransactionContext)
    // const [isLoadingLatestTransactions, setIsLoadingLatestTransactions] = useState(false)
    const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([])
    const [currentBalance, setCurrentBalance] = useState(0.0)

    // async function fetchTransactions(wallet_id: string | string[]) {
    //     const api = await useAPI();
    //     if (!api) {
    //         return;
    //     }
    //     setIsLoadingLatestTransactions(true)
    //     try {
    //         const response = await api.server.get("/api/transaction", {
    //             params: {
    //                 wallet_id,
    //                 limit: null,
    //                 is_until_today: true
    //             }
    //         });

    //         const currentBalanceResponse = await api.server.get("/api/transaction/balance", {
    //             params: {
    //                 wallet_id
    //             }
    //         })
    //         const {current_balance} = currentBalanceResponse.data
    //         const {transactions} = response.data;
    //         setLatestTransactions(transactions)
    //         setCurrentBalance(current_balance)
    //     } catch (error) {
    //         console.error("Erro ao buscar transações:", error);
    //         throw error;
    //     } finally {
    //         setIsLoadingLatestTransactions(false)
    //     }
    // }

    function groupTransactionsByMonth(transactions: Transaction[]) {
        return transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
          const date = new Date(transaction.transaction_date);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const label = `${MONTHS[month]} ${year}`;
      
          if (!acc[label]) {
            acc[label] = [];
          }
      
          acc[label].push(transaction);
          return acc;
        }, {});
    }
      

    // useEffect(()=>{
    //     fetchTransactions(wallet_id)
    // }, [wallet_id])

    const values = {
        transactions,
        currentBalance,
        isTransactionsLoading,
        groupTransactionsByMonth
    }

    return values
}