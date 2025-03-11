import EvilIcons from '@expo/vector-icons/EvilIcons';
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useLocalSearchParams } from 'expo-router';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Methods, paymentsModelView } from './paymentsModalView';
import { ModalCreateTransaction } from './ModalCreateTransaction';

export default function Payments(){
    const { id } = useLocalSearchParams();

    const {
        totalAmount,
        paymentsMethods,
        isModalOpen,
        handleModal,
        handlePaymentsMethods,
        setTrackTransactions,
    } = paymentsModelView()

    return (
        <View className="flex-1 items-center bg-gray-medium">
            {/* Header */}
            <LinearGradient colors={[colors.green.high, colors.green.medium]} style={styles.background}>
                <Link href={`/private/home/${id}`}>
                    <EvilIcons name="navicon" size={30} color="white" />
                </Link>
                <Text className="font-bold mx-auto text-white text-xl">Transações</Text>
            </LinearGradient>
            {/* Main Info */}
            <View className="p-4">
                <View className="flex-row justify-between items-center">
                    <View className='gap-3'>
                        <Text className="font-semibold">
                            Saldo 
                            {paymentsMethods === "" && " Total"}
                            {paymentsMethods === "INCOME" && " de Entradas"}
                            {paymentsMethods === "OUTCOME" && " de Saidas"}
                        </Text>
                        <Text className="font-bold text-4xl">R$ {totalAmount.toFixed(2)}</Text>
                    </View>

                    
                    <View className="items-center gap-2">
                        <TouchableOpacity className="bg-green-low rounded-full p-2 w-14 h-14 items-center justify-center" onPress={handleModal}>
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
            <Text className='text-2xl'>{id}</Text>

            {/* <View className="flex flex-col gap-2 w-[80%] justify-center mx-auto">
                {!isLoadingPaymentsMethods && latestsTransaction && latestsTransaction.map((transactions)=> (
                    <Transactions
                        _id={transactions._id}
                        key={transactions._id}
                        type={transactions.type}
                        amount={transactions.amount}
                        date={transactions.createdAt}
                        name={transactions.name}
                        description={transactions.description}
                        client={transactions.client}
                        loadindPayments={loadindPayments}
                    />
                ))}
                {isLoadingPaymentsMethods && (
                    <Loading/>
                )}
            </View> */}
            <ModalCreateTransaction
                closeModal={handleModal}
                isModalOpen={isModalOpen}
                setTrackTransactions={setTrackTransactions}
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
