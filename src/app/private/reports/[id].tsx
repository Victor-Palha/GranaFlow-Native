import { colors } from "@/styles/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Reports(){
    const { id } = useLocalSearchParams();
    
    function handleBackToHome(){
        router.back()
    }
    return (
        <View className="flex-1 items-center bg-gray-200">
            <LinearGradient colors={[colors.green.high, colors.green.medium]} style={styles.background}>
                <TouchableOpacity onPress={handleBackToHome}>
                    <EvilIcons name="navicon" size={30} color="white" />
                </TouchableOpacity>
                <Text className="font-bold mx-auto text-white text-xl">Relatórios</Text>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: 100,
        padding: 16,
        paddingTop: 60,
        alignItems: "center",
        boxShadow:" 10",
        gap: 5,
        flexDirection: "row"
    }
})
