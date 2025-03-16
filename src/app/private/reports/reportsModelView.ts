import { API } from "@/api/config";
import { DropdownData } from "@/components/Dropdown";
import { useAPI } from "@/hooks/useApi";
import SecureStoragePersistence from "@/persistence/secureStorage";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";

type YearReport = {
    final_balance: string,
    month: string,
    income: string,
    outcome: string
}

export function reportsModelView(wallet_id: string | string[]) {
    const availableYears = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3, new Date().getFullYear() - 4]
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [yearReport, setYearReport] = useState<YearReport[]>([])
    async function getReports() {
        const api = await useAPI();
        if (!api) {
            return;
        }
        const response = await api.server.get(`/api/wallet/${wallet_id}/reports/annual`, {
            params: {
                year: yearSelected
            }
        })
        setYearReport(response.data.report)
    }

    function handleSelectYear(year: number) {
        setYearSelected(year)
    }

    function handleBackToHome() {
        router.back();
    }

    useEffect(() => {
        getReports()
    }, [yearSelected])

    const dropdownData = useMemo<DropdownData[]>(() => {
        return availableYears.map((year) => ({
            label: year.toString(),
            value: year.toString(),
        }));
    }, [availableYears]);

    const values = {
        yearReport,
        yearSelected,
        dropdownData,
        handleSelectYear,
        handleBackToHome
    }

    return values
}