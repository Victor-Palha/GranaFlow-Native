import { Dropdown, DropdownData } from "@/components/Dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, Switch, Platform, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

type ModalCreateTransactionProps = {
  isModalOpen: boolean,
  closeModal: () => void,
  setTrackTransactions: (value: number) => void
};

export function ModalCreateTransaction({ isModalOpen, closeModal, setTrackTransactions }: ModalCreateTransactionProps) {
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [nameTransaction, setNameTransaction] = useState("");
  const [description, setDescription] = useState("");
  const [typeTransaction, setTypeTransaction] = useState<DropdownData>({ label: "Entrada de dinheiro", value: "INCOME" });
  const [subtypeTransaction, setSubtypeTransaction] = useState<DropdownData>({ label: "Pix", value: "PIX" });
  const [amountTransaction, setAmountTransaction] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceStart, setRecurrenceStart] = useState(new Date());
  const [recurrenceEnd, setRecurrenceEnd] = useState(new Date());

  async function handleCreateTransaction() {
    // lógica aqui
  }

  return (
    <Modal visible={isModalOpen} transparent animationType="slide">
        <View className="flex-1 h-full justify-end shadow-black shadow-md">
            <View className="bg-green-medium max-h-[95%] rounded-t-xl px-4 pt-6 pb-10">
                <ScrollView
                    contentContainerStyle={{ alignItems: "center", gap: 16 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View className='flex-row justify-between items-center w-full'>
                        <Text className='text-white text-lg font-semibold' style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>
                            Criar Transação
                        </Text>
                        <MaterialIcons name="close" size={24} color="white" onPress={closeModal} />
                    </View>

                    {/* Body */}
                    <View className="w-full items-center justify-center gap-2">
                        {/* Nome */}
                        <View className="w-[90%] items-start">
                            <Text className="text-white mb-1 text-lg">Nome da Transação</Text>
                        </View>
                        <TextInput
                            className="bg-gray-light w-[90%] h-10 rounded-md px-5"
                            placeholder="Nome para sua transação"
                            value={nameTransaction}
                            onChangeText={setNameTransaction}
                        />

                        {/* Descrição */}
                        <View className="w-[90%] items-start">
                        <Text className="text-white mb-1 text-lg">Descrição</Text>
                        </View>
                        <TextInput
                            className="bg-gray-light w-[90%] h-20 rounded-md px-5 py-3 text-left text-wrap"
                            placeholder="Descreva essa transação"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        {/* Tipo */}
                        <Dropdown
                            data={[
                                { label: "Entrada de dinheiro", value: "INCOME" },
                                { label: "Saída de dinheiro", value: "OUTCOME" },
                            ]}
                            label="Tipo de transação"
                            selectedData={typeTransaction}
                            selectItem={setTypeTransaction}
                        />

                        {/* Subtipo */}
                        <Dropdown
                            data={[
                                { label: "Pix", value: "PIX" },
                                { label: "Boleto", value: "BOLETO" },
                                { label: "Crédito", value: "CREDIT" },
                                { label: "Débito", value: "DEBIT" },
                            ]}
                            label="Subtipo"
                            selectedData={subtypeTransaction}
                            selectItem={setSubtypeTransaction}
                        />

                        {/* Valor */}
                        <View className="w-[90%] items-start">
                            <Text className="text-white mb-1 text-lg">Valor da transação</Text>
                        </View>
                        <TextInput
                            className="bg-gray-light w-[90%] h-10 rounded-md px-5"
                            keyboardType="numeric"
                            placeholder="R$ 0,00"
                            value={amountTransaction}
                            onChangeText={setAmountTransaction}
                        />

                        {!isRecurring && (
                            <View className="w-[90%] items-start">
                                <Text className="text-white mb-1 text-lg">Data da transação</Text>
                                <DateTimePicker
                                    value={transactionDate}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={(_, date) => date && setTransactionDate(date)}
                                />
                            </View>
                        )}

                        {/* Recorrência */}
                        <View className="w-[90%] flex-row items-center justify-between mt-3">
                        <Text className="text-white text-lg">Pagamento recorrente?</Text>
                        <Switch
                            value={isRecurring}
                            onValueChange={setIsRecurring}
                            thumbColor="#fff"
                            trackColor={{ true: "#2ecc71", false: "#ccc" }}
                        />
                        </View>

                        {isRecurring && (
                        <View className="w-[90%] mt-2 gap-3">
                            <Text className="text-white text-sm">De:</Text>
                            <DateTimePicker
                                value={recurrenceStart}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(_, date) => date && setRecurrenceStart(date)}
                            />
                            <Text className="text-white text-sm">Até:</Text>
                            <DateTimePicker
                                value={recurrenceEnd}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(_, date) => date && setRecurrenceEnd(date)}
                            />
                        </View>
                        )}

                        {/* Botão Criar */}
                        <TouchableOpacity
                            className="w-[90%] bg-green-low p-3 rounded-lg items-center mt-4 shadow-black shadow-md"
                            disabled={isCreatingTransaction}
                            onPress={handleCreateTransaction}
                        >
                            <Text className="text-lg font-bold">Criar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    </Modal>
  );
}
