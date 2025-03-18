import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { HomeModelView } from './homeModelView';
import { Transactions } from '@/components/Transactions';
import { TransactionsLoading } from '@/components/TrasactionsLoading';

export default function Home() {
  const { id } = useLocalSearchParams();
  const { transactions, isTransactionsLoading, currentBalance, groupTransactionsByMonth } = HomeModelView();

  const groupedTransactions = groupTransactionsByMonth(transactions);

  return (
    <ScrollView className="flex-1 bg-gray-200" contentContainerStyle={{ alignItems: "center" }}>
      <Header total={currentBalance} />
      <Nav walletId={id} />

      <View className='gap-4 px-10'>
        <Text className="text-2xl text-center text-gray-900 mb-10" style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>
          Últimas Transações
        </Text>

        {!isTransactionsLoading && Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
          <View key={monthYear} className="mb-1">
            <Text className="text-lg font-semibold text-gray-900 mb-6">{monthYear}</Text>
            {transactions.map((transaction) => (
              <Transactions
                key={transaction.id}
                data={transaction}
              />
            ))}
          </View>
        ))}
        {isTransactionsLoading && (
          <View  className="mb-1">
            <TransactionsLoading/>
            <TransactionsLoading/>
            <TransactionsLoading/>
            <TransactionsLoading/>
            <TransactionsLoading/>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
