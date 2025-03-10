import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center bg-gray-medium">
        <Header total={500.00}/>
        <Nav/>
      <Text>User ID: {id}</Text>
    </View>
  );
}