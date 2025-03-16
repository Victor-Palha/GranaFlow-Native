import { MONTHS } from "@/constants/MONTHS";
import { Text, View } from "react-native";
import { MonthReport, YearReport } from "..";
import { Transactions } from "@/components/Transactions";

type MonthReportsInformationProps = {
    selectedReport: YearReport
    monthReports: MonthReport | null
    currentMonth: boolean
}
export function MonthReportsInformation({ selectedReport, monthReports, currentMonth }: MonthReportsInformationProps) {
    return (
        <View className="mt-6 p-4 rounded-lg border border-zinc-200 bg-gray-300 shadow-black shadow mb-10">
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
                    <View key={type} className="w-[90%] mt-6">
                        <Text className="font-bold text-lg mb-3 text-zinc-700">
                            {isIncome ? 'Entradas por categoria' : 'Saídas por categoria'}
                        </Text>

                        {filtered.map((subtype) => {
                            const barColor = isIncome ? 'bg-green-medium' : 'bg-red-medium';
                            const bgBar = 'bg-zinc-300';
                            const percentage = parseFloat(subtype.percentage);

                            return (
                                <View key={`${type}-${subtype.subtype}`} className="mb-3">
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
                                </View>
                            );
                        })}
                    </View>
                );
            })}
            <View className="mt-10">
                {monthReports?.transactions.map((item)=> (
                    <Transactions data={item} key={item.id}/>
                ))}
            </View>
        </View>
    )
}