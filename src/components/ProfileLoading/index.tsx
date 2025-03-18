import { TouchableOpacity, View } from "react-native";

export function WalletsLoading() {
  return (
    <View className="items-center gap-5 mt-5">
      <View className="items-center mt-5">
        <TouchableOpacity
          className="items-center justify-center gap-2 animate-pulse"
        >
          <View className="w-28 h-28 border-black border rounded-full flex items-center justify-center border-dashed bg-gray-300 shadow-black shadow-md">

          </View>
          <View className="bg-gray-300 w-28 h-6 rounded-md mt-1"></View>
        </TouchableOpacity>
      </View>

      <View className="items-center mt-5">
        <TouchableOpacity
          className="items-center justify-center gap-2 animate-pulse"
        >
          <View className="w-28 h-28 border-black border rounded-full flex items-center justify-center border-dashed bg-gray-300 shadow-black shadow-md">

          </View>
          <View className="bg-gray-300 w-28 h-6 rounded-md mt-1"></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
