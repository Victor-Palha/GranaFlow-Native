import React, { useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { View, Text } from 'react-native';
import { colors } from '@/styles/colors';

type YearReport = {
  final_balance: string;
  month: string; // Ex: "01", "02", ...
  income: string;
  outcome: string;
};

type Props = {
  data: YearReport[];
};

const MONTHS = [
  '',
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function YearReportGraph({ data }: Props) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedReportIndex, setSelectedReportIndex] = useState<number | null>(null);

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
          setSelectedValue(incomeValue);
          setSelectedIndex(index * 2);
          setSelectedReportIndex(index);
        },
      },
      {
        value: outcomeValue,
        label: '',
        frontColor: colors.red.medium,
        spacing: 8,
        onPress: () => {
          setSelectedValue(outcomeValue);
          setSelectedIndex(index * 2 + 1);
          setSelectedReportIndex(index);
        },
      },
    ];
  });

  const selectedReport = selectedReportIndex !== null ? data[selectedReportIndex] : null;

  return (
    <View className="p-4 rounded-lg">
      <Text className="text-lg font-bold mb-5">
        Entradas e Saídas Mensais
      </Text>

      {/* Legenda */}
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
        renderTooltip={(_item: any, index: number) =>
          index === selectedIndex ? (
            <View className="absolute -top-7 bg-black px-2 py-1 rounded">
              <Text className="text-white text-xs">
                R$ {selectedValue?.toFixed(2)}
              </Text>
            </View>
          ) : null
        }
      />

      {/* Informações abaixo do gráfico */}
      {selectedReport && (
        <View className="mt-6 p-4 rounded-lg border border-zinc-200 bg-gray-300">
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
          <View className="flex-row justify-between">
            <Text className="text-zinc-500">Saldo final:</Text>
            <Text className={`font-medium ${parseFloat(selectedReport.final_balance) >= 0 ? 'text-green-medium' : 'text-red-medium'}`}>
              R$ {parseFloat(selectedReport.final_balance).toFixed(2)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
