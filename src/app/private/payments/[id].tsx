import EvilIcons from '@expo/vector-icons/EvilIcons';
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Methods, paymentsModelView } from './paymentsModelView';
import { ModalCreateTransaction } from './ModalCreateTransaction';
import { Transactions } from '@/components/Transactions';

export default function Payments(){
    const { id } = useLocalSearchParams();

    const {
        paymentsMethods,
        isModalOpen,
        selectedTransactions,
        isTransactionsLoading,
        handleModal,
        handlePaymentsMethods,
        handleBackToHome
    } = paymentsModelView()

    return (
        <View className="flex-1 items-center bg-gray-200">
            {/* Header */}
            <LinearGradient colors={[colors.green.high, colors.green.medium]} style={styles.background}>
                <TouchableOpacity onPress={handleBackToHome}>
                    <EvilIcons name="navicon" size={30} color="white" />
                </TouchableOpacity>
                <Text className="font-bold mx-auto text-white text-xl">Transações</Text>
            </LinearGradient>
            {/* Main Info */}
            <View className="p-4">
                <View className="flex-row justify-end items-end">            
                    <View className="items-center gap-2">
                        <TouchableOpacity className="bg-green-medium rounded-full p-2 w-14 h-14 items-center justify-center border-[0.5px]" onPress={handleModal}>
                            <SimpleLineIcons name="wallet" size={20} color="black" />
                        </TouchableOpacity>
                        <Text>Novo Pagamento</Text>
                    </View>
                </View>

                <View className="rounded-md bg-gray-light flex-row justify-around mt-6 w-full">
                    <TouchableOpacity onPress={()=>handlePaymentsMethods(Methods.ALL)} className={"p-2 h-12 w-1/3 border-b-[1px] items-center " + (paymentsMethods === Methods.ALL ? "border-b-[4px]" : "")}>
                        <Text className='text-lg'>Todas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePaymentsMethods(Methods.INCOME)} className={"p-2 h-12 w-1/3 border-b-[1px] items-center " + (paymentsMethods === Methods.INCOME ? "border-b-[4px]" : "")}>
                        <Text className='text-lg'>Entradas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePaymentsMethods(Methods.OUTCOME)} className={"p-2 h-12 w-1/3 border-b-[1px] items-center " + (paymentsMethods === Methods.OUTCOME ? "border-b-[4px]" : "")}>
                        <Text className='text-lg'>Saidas</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex flex-col gap-2 w-[80%] justify-center mx-auto">
                {!isTransactionsLoading && selectedTransactions && selectedTransactions.map((transactions)=> (
                    <Transactions
                        key={transactions.id}
                        data={transactions}
                    />
                ))}
                {/* {isLoadingTransactions && (
                    <Loading/>
                )} */}
            </View>
            <ModalCreateTransaction
                wallet_id={id}
                closeModal={handleModal}
                isModalOpen={isModalOpen}
            />
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
