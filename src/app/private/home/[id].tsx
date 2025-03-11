import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { HomeModelView } from './homeModelView';
import { Transactions } from '@/components/Transactions';

export default function Home() {
  const { id } = useLocalSearchParams();
  const {isLoadingLatestTransactions, latestTransactions} = HomeModelView(id)
  return (
    <View className="flex-1 items-center bg-gray-200">
        <Header total={500.00}/>
        <Nav walletId={id}/>

        <View className='gap-4 px-10'>
          <Text className="text-2xl text-center text-gray-900 mb-10" style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>
            Últimas Transações
          </Text>
          {latestTransactions.length > 0 && (
            latestTransactions.map((item)=>(
              <Transactions
                key={item.id}
                data={item}
              />
            ))
          )}
        </View>
    </View>
  );
}