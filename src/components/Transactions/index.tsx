import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { Transaction } from "@/@types/transactions";
import { Text, View } from "react-native";

type TransactionProps = {
    data: Transaction
}

export function Transactions({data}: TransactionProps){
    const isIncome = data.type === 'INCOME';
    const amountFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(data.amount));
  
    return (
      <View className="flex-row justify-between items-center w-full pb-3">
        {/* Left - Icon + Text */}
        <View className="flex-row items-start gap-3 flex-1">
          {/* Icon */}
          <View className={`rounded-full p-3 border-[0.5px] ${isIncome ? 'border-green-high bg-green-medium' : 'border-red-high bg-red-medium'}`}>
            {isIncome ? (
              <MaterialIcons name="attach-money" size={20} color="black" />
            ) : (
              <Feather name="trending-down" size={20} color="black" />
            )}
          </View>
  
          {/* Name + Subtype + Description */}
          <View className="flex-1">
            <Text className="font-semibold text-base text-gray-900">{data.name}</Text>
            <Text className="text-xs text-gray-700 italic">{data.subtype}</Text>
            <Text className="text-sm text-gray-600 mt-1">{data.description}</Text>
          </View>
        </View>
  
        {/* Right - Amount + Date */}
        <View className="items-end ml-3">
          <Text className={`font-semibold ${isIncome ? 'text-green-high' : 'text-red-high'}`}>{amountFormatted}</Text>
          <Text className="text-xs text-gray-500">{data.transaction_date}</Text>
        </View>
      </View>
    );
}
