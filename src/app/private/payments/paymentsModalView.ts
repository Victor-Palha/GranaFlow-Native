import { useState } from "react"

export enum Methods {
    ALL = "",
    INCOME = "INCOME",
    OUTCOME = "OUTCOME"
}
export function paymentsModelView(){
    const [trackTransactions, setTrackTransactions] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [paymentsMethods, setPaymentsMethods] = useState<Methods>(Methods.ALL)
    const [totalAmount, setTotalAmount] = useState<number>(0.00)

    function handlePaymentsMethods(method: Methods){
        setPaymentsMethods(method)
    }

    function handleModal(){
        setIsModalOpen(!isModalOpen)
    }

    const values = {
        totalAmount,
        paymentsMethods,
        isModalOpen,
        setTrackTransactions,
        handlePaymentsMethods,
        handleModal
    }

    return values
}