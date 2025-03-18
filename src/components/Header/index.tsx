import { TransactionContext } from "@/contexts/transaction/transactionContext";
import { colors } from "@/styles/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
    total: number
}
export function Header({total}: HeaderProps){
    const {isTransactionsLoading} = useContext(TransactionContext)

    const handleBackToWallets = () => {
        router.back();
    };

    return (
        <LinearGradient
            colors={[colors.green.high, colors.green.medium]}
            style={styles.background}
        >            
            <View className="flex-row items-center justify-between w-full">
                <TouchableOpacity onPress={handleBackToWallets}>
                    <Ionicons name="chevron-back-outline" size={32} color="white" />
                </TouchableOpacity>
                <View>
                    {/* Profile Picture */}
                </View>
            </View>
            {!isTransactionsLoading && (
                <View className="flex flex-col justify-end items-center pt-20">
                    <Text className="font-semibold text-white">Saldo Atual</Text>
                    <Text className="text-5xl font-bold text-white mt-2">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</Text>
                </View>
                ) 
            }

            {isTransactionsLoading && (
                <View className="flex flex-col justify-end items-center pt-20 animate-pulse">
                    <View className="h-4 bg-gray-300 rounded w-24" />
                    <View className="h-10 bg-gray-300 rounded w-40 mt-4" />
                </View>
            )}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: 350,
        padding: 16,
        paddingTop: 60,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        alignItems: "center",
        boxShadow:" 10",
        gap: 5
    }
})