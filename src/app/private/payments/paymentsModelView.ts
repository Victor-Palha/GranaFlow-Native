import { Transaction } from "@/@types/transactions"
import { TransactionContext } from "@/contexts/transaction/transactionContext"
import { router } from "expo-router"
import { useContext, useEffect, useState } from "react"

export enum Methods {
    ALL = "",
    INCOME = "INCOME",
    OUTCOME = "OUTCOME"
}
export function paymentsModelView(){
    const {isTransactionsLoading, transactions} = useContext(TransactionContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [paymentsMethods, setPaymentsMethods] = useState<Methods>(Methods.ALL)
    const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>(transactions);

    function handlePaymentsMethods(method: Methods){
        setPaymentsMethods(method)
    }

    function handleModal(){
        setIsModalOpen(!isModalOpen)
    }

    function handleBackToHome(){
        router.back()
    }

    function filterTransactionsByType(transactions: Transaction[]) {
        if(paymentsMethods == ""){
            setSelectedTransactions(transactions)
            return
        }
        const filteredTransactions = transactions.filter(transaction => transaction.type === paymentsMethods);
        setSelectedTransactions(filteredTransactions);
    }

    useEffect(()=>{
        filterTransactionsByType(transactions)
    }, [paymentsMethods, transactions])

    const values = {
        paymentsMethods,
        isModalOpen,
        selectedTransactions,
        isTransactionsLoading,
        handlePaymentsMethods,
        handleModal,
        handleBackToHome
    }

    return values
}