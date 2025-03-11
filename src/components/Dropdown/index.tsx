import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type DropdownProps = {
    data: DropdownData[],
    selectedData: DropdownData,
    label: string,
    selectItem: (value: DropdownData) => void
}

export type DropdownData = {
    label: string,
    value: string,
}
export function Dropdown(data: DropdownProps){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleSelectItem(item: DropdownData){
        data.selectItem(item)
    }

    return (
        <View className="w-[90%]">
            <Text className="text-white mb-2 text-lg">{data.label}</Text>
            <TouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border border-gray-300 p-3 rounded-md bg-white flex-row justify-between items-center w-full"
            >
                <Text className="text-black">{data.selectedData && data.selectedData.label}</Text>
            </TouchableOpacity>

            {isDropdownOpen && (
                <View className="border border-gray-300 rounded-md bg-white h-max overflow-hidden mt-1">
                    {data.data.map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        onPress={() => {
                        handleSelectItem(item);
                        setIsDropdownOpen(false);
                        }}
                        className="flex-row items-center p-3 border-b border-gray-200"
                    >
                        <Text className="ml-2 text-black">{item.label}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    )
}