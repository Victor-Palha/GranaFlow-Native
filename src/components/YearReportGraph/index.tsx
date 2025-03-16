import React, { useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { View, Text } from 'react-native';
import { colors } from '@/styles/colors';
import { API } from '@/api/config';
import SecureStoragePersistence from '@/persistence/secureStorage';
import { MONTHS } from '@/constants/MONTHS';
import { MonthReportsInformation } from './MonthReportsInformation';
import { Transaction } from '@/@types/transactions';

type MonthReportSubtype = {
  total: string;
  type: 'INCOME' | 'OUTCOME';
  subtype: string;
  percentage: string;
};

export type MonthReport = {
  final_balance: string;
  total_income: string;
  total_outcome: string;
  subtypes: MonthReportSubtype[];
  transactions: Transaction[]
};

export type YearReport = {
  final_balance: string;
  month: string; // Ex: "01", "02", ...
  income: string;
  outcome: string;
};

type YearReportGraphProps = {
  data: YearReport[];
  wallet_id: string | string[]
  year: number
};

export function YearReportGraph({ wallet_id, data, year }: YearReportGraphProps) {
  const [monthReports, setMonthReport] = useState<MonthReport | null>(null);
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

  const chartData = data.flatMap((report, index) => {
    const monthLabel = MONTHS[parseInt(report.month, 10)];
    const incomeValue = parseFloat(report.income);
    const outcomeValue = parseFloat(report.outcome);

    return [
      {
        value: incomeValue,
        label: monthLabel,
        frontColor: colors.green.medium,
        spacing: 8,
        onPress: () => {
          setSelectedReportIndex(index);
          fetchMonthReport(index + 1, year)
        },
      },
      {
        value: outcomeValue,
        label: '',
        frontColor: colors.red.medium,
        spacing: 8,
        onPress: () => {
          setSelectedReportIndex(index);
          fetchMonthReport(index + 1, year)
        },
      },
    ];
  });

  const selectedReport = selectedReportIndex !== null ? data[selectedReportIndex] : null;

  async function fetchMonthReport(month: number, year: number) {
    const api = API
    const token = await SecureStoragePersistence.getJWT()
    if (!token) {
      return
    }
    api.setTokenAuth(token)
    try {
      const response = await api.server.get(`/api/wallet/${wallet_id}/reports/month`,
        {
          params: { year, month },
        }
      );

      setMonthReport(response.data.report);
    } catch (error) {
      console.error('Erro ao buscar relatório mensal:', error);
    }
  }

  return (
    <View className="p-4 rounded-lg">
      <Text className="text-lg font-bold mb-5">
        Entradas e Saídas Mensais
      </Text>

      <View className="flex-row gap-4 mb-5">
        <View className="flex-row items-center">
          <View
            className="w-3 h-3 rounded-sm mr-1"
            style={{ backgroundColor: colors.green.medium }}
          />
          <Text>Entradas</Text>
        </View>
        <View className="flex-row items-center">
          <View
            className="w-3 h-3 rounded-sm mr-1"
            style={{ backgroundColor: colors.red.medium }}
          />
          <Text>Saídas</Text>
        </View>
      </View>

      <BarChart
        data={chartData}
        width={290}
        height={250}
        barWidth={30}
        initialSpacing={20}
        spacing={16}
        barBorderRadius={2}
        yAxisThickness={0}
        yAxisTextStyle={{ color: '#777', paddingRight: 100 }}
        yAxisLabelPrefix="R$ "
        xAxisLabelTextStyle={{ color: '#777' }}
        yAxisColor="#ccc"
        xAxisColor="#ccc"
        noOfSections={5}
        isAnimated
        maxValue={
          Math.max(
            ...data.map((r) =>
              Math.max(parseFloat(r.income), parseFloat(r.outcome))
            )
          ) + 50
        }
      />

      {selectedReport && (
        <MonthReportsInformation
          selectedReport={selectedReport}
          monthReports={monthReports}
          currentMonth={selectedReportIndex+1 === new Date().getMonth()+1}
        />
      )}
    </View>
  );
}
