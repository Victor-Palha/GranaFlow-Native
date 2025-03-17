import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { HomeModelView } from './homeModelView';
import { Transactions } from '@/components/Transactions';

export default function Home() {
  const { id } = useLocalSearchParams();
  const {isLoadingLatestTransactions, latestTransactions, currentBalance} = HomeModelView(id)
  return (
    <ScrollView className="flex-1 bg-gray-200" contentContainerStyle={{ alignItems: "center" }}>
        <Header total={currentBalance}/>
        <Nav walletId={id}/>

        <View className='gap-4 px-10'>
          <Text className="text-2xl text-center text-gray-900 mb-10" style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>
            Últimas Transações
          </Text>
          {latestTransactions.length > 0 &&  latestTransactions.map(transaction => (
              <Transactions
                key={transaction.id}
                data={transaction}
              />
          ))}
        </View>
    </ScrollView>
  );
}