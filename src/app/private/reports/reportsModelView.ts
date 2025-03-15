import { API } from "@/api/config";
import SecureStoragePersistence from "@/persistence/secureStorage";
import { useEffect, useState } from "react";

type YearReport = {
    final_balance: string,
    month: string,
    income: string,
    outcome: string
}

export function reportsModelView(wallet_id: string | string[]){
    const availableYears = [new Date().getFullYear(), new Date().getFullYear()-1, new Date().getFullYear()-2,new Date().getFullYear()-3,new Date().getFullYear()-4]
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [yearReport, setYearReport] = useState<YearReport[]>([])
    async function getReports(){
        const api = API
        const token = await SecureStoragePersistence.getJWT()
        if(!token){
            return
        }
        api.setTokenAuth(token)

        const response = await api.server.get(`/api/wallet/${wallet_id}/reports/annual`, {
            params: {
                year: yearSelected
            }
        })
        setYearReport(response.data.report)
    }

    function handleSelectYear(year: number){
        setYearSelected(year)
    }

    useEffect(()=>{
        getReports()
    }, [yearSelected])

    const values = {
        yearReport,
        yearSelected,
        availableYears,
        handleSelectYear
    }

    return values
}