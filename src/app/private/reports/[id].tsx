import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "@/styles/colors";
import { Dropdown, DropdownData } from "@/components/Dropdown";
import { useMemo } from "react";
import { reportsModelView } from "./reportsModelView";
import { YearReportGraph } from "@/components/YearReportGraph";

export default function Reports() {
  const { id } = useLocalSearchParams();

  const { yearReport, handleSelectYear, yearSelected, handleBackToHome, dropdownData } = reportsModelView(id);

  const selectedYearData = dropdownData.find(
    (item) => item.value === yearSelected.toString()
  );

  function handleDropdownChange(item: DropdownData) {
    handleSelectYear(Number(item.value));
  }

  return (
    <ScrollView className="flex-1 bg-gray-200" contentContainerStyle={{ alignItems: "center" }}>
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
          <YearReportGraph data={yearReport} wallet_id={id} year={yearSelected}/>
      )}
    </ScrollView>
  );
}
