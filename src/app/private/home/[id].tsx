import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { HomeModelView } from './homeModelView';

export default function Home() {
  const { id } = useLocalSearchParams();
  const {isLoadingLatestTransactions, latestTransactions} = HomeModelView(id)
  return (
    <View className="flex-1 items-center bg-gray-medium">
        <Header total={500.00}/>
        <Nav walletId={id}/>
        {latestTransactions.length > 0 && (
          latestTransactions.map((item)=>(
            <Text key={item.id}>{item.name}</Text>
          ))
        )}
    </View>
  );
}