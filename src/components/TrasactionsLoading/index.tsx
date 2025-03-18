import { View } from "react-native";

export function TransactionsLoading() {
  return (
    <View className="flex-row justify-between items-center w-full pb-3 animate-pulse">
      {/* Left - Icon + Text Placeholder */}
      <View className="flex-row items-start gap-3 flex-1">
        {/* Icon Placeholder */}
        <View className="rounded-full p-3 border-[0.5px] border-gray-300 bg-gray-300 w-10 h-10" />

        {/* Text Placeholder */}
        <View className="flex-1 gap-1">
          <View className="h-4 bg-gray-300 rounded w-1/2" />
          <View className="h-3 bg-gray-300 rounded w-1/3 mt-1" />
          <View className="h-3 bg-gray-300 rounded w-3/4 mt-1" />
        </View>
      </View>

      {/* Right - Amount + Date Placeholder */}
      <View className="items-end ml-3 gap-1">
        <View className="h-4 bg-gray-300 rounded w-14" />
        <View className="h-3 bg-gray-300 rounded w-12" />
      </View>
    </View>
  );
}
