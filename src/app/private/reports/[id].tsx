import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/styles/colors";
import { Dropdown, DropdownData } from "@/components/Dropdown";
import { useState, useMemo } from "react";
import { reportsModelView } from "./reportsModelView";
import { YearReportGraph } from "@/components/YearReportGraph";

export default function Reports() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { yearReport, handleSelectYear, availableYears, yearSelected } = reportsModelView(id);

  function handleBackToHome() {
    router.back();
  }

  const dropdownData = useMemo<DropdownData[]>(() => {
    return availableYears.map((year) => ({
      label: year.toString(),
      value: year.toString(),
    }));
  }, [availableYears]);

  const selectedYearData = dropdownData.find(
    (item) => item.value === yearSelected.toString()
  );

  function handleDropdownChange(item: DropdownData) {
    handleSelectYear(Number(item.value));
  }

  return (
    <View className="flex-1 items-center bg-gray-200">
      <LinearGradient
        colors={[colors.green.high, colors.green.medium]}
        style={{ width: "100%", padding: 20, paddingTop: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
      >
        <TouchableOpacity onPress={handleBackToHome}>
          <EvilIcons name="navicon" size={30} color="white" />
        </TouchableOpacity>
        <Text className="font-bold mx-auto text-white text-xl mb-4">Relatórios</Text>

        {selectedYearData && (
          <Dropdown
            label="Selecione o ano para seu relatório"
            data={dropdownData}
            selectedData={selectedYearData}
            selectItem={handleDropdownChange}
          />
        )}
      </LinearGradient>

      {yearReport.length > 0 && (
          <YearReportGraph data={yearReport} />
      )}
    </View>
  );
}
