import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index(){
    return (
        <View className="flex-1 items-center justify-center gap-10">
            <View className="gap-4 items-center">
                <Image source={require("../assets/logo.png")}/>
                <Text className="text-4xl shadow-black shadow">Grana<Text className="text-green-low">Flow</Text></Text>
            </View>
            <TouchableOpacity className="flex-row items-center gap-5 bg-white w-[60%] justify-center rounded-lg p-3 shadow">
                <Image source={require("../assets/Google.png")}/>
                <Text className="text-xl">Entrar com Google</Text>
            </TouchableOpacity>
        </View>
    )
}