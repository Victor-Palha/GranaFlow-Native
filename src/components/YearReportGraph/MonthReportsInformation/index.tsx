import { MONTHS } from "@/constants/MONTHS";
import { Text, TouchableOpacity, View } from "react-native";
import { MonthReport, YearReport } from "..";
import { Transactions } from "@/components/Transactions";
import { useEffect, useState } from "react";
import { Transaction } from "@/@types/transactions";

type MonthReportsInformationProps = {
    selectedReport: YearReport
    monthReports: MonthReport | null
    currentMonth: boolean
}
export function MonthReportsInformation({ selectedReport, monthReports, currentMonth }: MonthReportsInformationProps) {
    const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
    const [selectedTransactionsBasedOnSubtype, setSelectedTransactionsBasedOnSubtype] = useState<Transaction[]>([])

    function selectTransactionsBySubtype(subtype: string, transactions: Transaction[]) {
        const grouped = transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
          if (!acc[transaction.subtype]) {
            acc[transaction.subtype] = [];
          }
          acc[transaction.subtype].push(transaction);
          return acc;
        }, {});
      
        setSelectedTransactionsBasedOnSubtype(grouped[subtype] ?? []);
      }

    useEffect(()=>{
        if(selectedSubtype && monthReports && monthReports.transactions){
            selectTransactionsBySubtype(selectedSubtype, monthReports.transactions)
        }
    }, [selectedSubtype])

    useEffect(()=>{
        setSelectedSubtype(null)
        setSelectedTransactionsBasedOnSubtype([])
    }, [selectedReport])

    return (
        <View className="mt-6 p-4 rounded-lg border border-zinc-200 bg-gray-300 shadow-black shadow mb-10 min-w-[90%] max-w-[90%]">
            <Text className="text-base font-semibold mb-2">
                {MONTHS[parseInt(selectedReport.month, 10)]}
            </Text>

            <View className="flex-row justify-between mb-1">
                <Text className="text-zinc-500">Entradas:</Text>
                <Text className="text-green-600 font-medium">
                    R$ {parseFloat(selectedReport.income).toFixed(2)}
                </Text>
            </View>
            <View className="flex-row justify-between mb-1">
                <Text className="text-zinc-500">Saídas:</Text>
                <Text className="text-red-600 font-medium">
                    R$ {parseFloat(selectedReport.outcome).toFixed(2)}
                </Text>
            </View>
            <View className="flex-row justify-between mb-4">
                <Text className="text-zinc-500 font-bold">{currentMonth ? "Saldo Atual: " : "Saldo previsto: "}</Text>
                <Text
                    className={`font-bold ${parseFloat(selectedReport.final_balance) >= 0
                            ? 'text-green-medium'
                            : 'text-red-medium'
                        }`}
                >
                    R$ {parseFloat(selectedReport.final_balance).toFixed(2)}
                </Text>
            </View>

            {/* Subtypes */}
            {['INCOME', 'OUTCOME'].map((type) => {
                const filtered = monthReports?.subtypes.filter((s) => s.type === type);
                if (!filtered || filtered.length === 0) return null;

                const isIncome = type === 'INCOME';

                return (
                    <View key={type} className="mt-6">
                        <Text className="font-bold text-lg mb-3 text-zinc-700">
                            {isIncome ? 'Entradas por categoria' : 'Saídas por categoria'}
                        </Text>

                        {filtered.map((subtype) => {
                            const barColor = isIncome ? 'bg-green-medium' : 'bg-red-medium';
                            const bgBar = 'bg-zinc-300';
                            const percentage = parseFloat(subtype.percentage);

                            return (
                                <View key={`${type}-${subtype.subtype}`} className="mb-3">
                                    <TouchableOpacity
                                        onPress={() => setSelectedSubtype(subtype.subtype)}
                                        activeOpacity={0.7}
                                    >
                                    <View className="flex-row justify-between mb-1">
                                        <Text className="text-zinc-600 font-medium">{subtype.subtype}</Text>
                                        <Text className="text-zinc-800 font-semibold">{percentage.toFixed(1)}%</Text>
                                    </View>

                                    
                                        <View className={`w-full h-3 rounded-full ${bgBar} overflow-hidden`}>
                                            <View
                                            className={`h-3 ${barColor}`}
                                            style={{ width: `${percentage}%` }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                );
            })}
            <View className="mt-10">
                {selectedTransactionsBasedOnSubtype.map((item)=> (
                    <Transactions data={item} key={item.id}/>
                ))}
            </View>
        </View>
    )
}