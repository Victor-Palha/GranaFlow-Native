import { Transaction } from "@/@types/transactions";
import { MONTHS } from "@/constants/MONTHS";
import { TransactionContext } from "@/contexts/transaction/transactionContext";
import { useContext, useEffect, useState } from "react";

export function HomeModelView(){
    const {isTransactionsLoading, transactions} = useContext(TransactionContext)
    const [currentBalance, setCurrentBalance] = useState(0.0)

    function calculateCurrentBalance(transactions: Transaction[]) {
      const currentBalance = transactions.reduce((acc, transaction) => {
        const amount = parseFloat(transaction.amount);
    
        if (transaction.type === "INCOME") {
          return acc + amount;
        } else if (transaction.type === "OUTCOME") {
          return acc - amount;
        }
    
        return acc;
      }, 0);
    
      setCurrentBalance(currentBalance)
    }

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

    useEffect(()=>{
      calculateCurrentBalance(transactions)
    }, [transactions])


    const values = {
        transactions,
        currentBalance,
        isTransactionsLoading,
        groupTransactionsByMonth
    }

    return values
}