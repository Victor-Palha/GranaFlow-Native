import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { HomeModelView } from './homeModelView';
import { Transactions } from '@/components/Transactions';

export default function Home() {
  const { id } = useLocalSearchParams();
  const {isLoadingLatestTransactions, latestTransactions, currentBalance} = HomeModelView(id)
  return (
    <View className="flex-1 items-center bg-gray-200">
        <Header total={currentBalance}/>
        <Nav walletId={id}/>

        <View className='gap-4 px-10'>
          <Text className="text-2xl text-center text-gray-900 mb-10" style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>
            Últimas Transações
          </Text>
          {latestTransactions.length > 0 && (
            <FlatList
              data={latestTransactions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Transactions
                  key={item.id}
                  data={item}
                />
              )}
              contentContainerStyle={{ gap: 16 }}
            />
          )}
        </View>
    </View>
  );
}