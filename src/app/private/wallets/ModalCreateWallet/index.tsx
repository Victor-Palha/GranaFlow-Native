import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Dropdown, DropdownData } from "@/components/Dropdown";

type ModalCreateWalletProps = {
    isModalOpen: boolean,
    closeModal: () => void
}
export function ModalCreateWallet({isModalOpen, closeModal}: ModalCreateWalletProps){
    const [selectedWalletType, setSelectedWalletType] = useState<DropdownData>({label: "Pessoal", value: "PERSONAL"});

    return (
        <Modal visible={isModalOpen} transparent animationType="slide">
            <View className="flex-1 h-full justify-end shadow-black shadow-md">
                <View className="bg-green-medium items-center gap-5 p-10 pb-20">
                    {/* Header */}
                    <View className='flex-row justify-between items-center w-full'>
                        <Text className='text-white text-lg font-semibold'>Criar Carteira</Text>
                        <MaterialIcons name="close" size={24} color="white" onPress={closeModal}/>
                    </View>
                    {/* Body */}
                    <View className="w-full items-center justify-center gap-2">
                        <View className="w-[90%] items-start">
                            <Text className="text-white mb-2 text-lg">Nome da Carteira</Text>
                        </View>

                        <TextInput 
                            className="bg-gray-light w-[90%] border-none focus:border focus:border-dashed h-10 focus:shadow-black focus:shadow rounded-md px-5 placeholder:text-gray-medium" 
                            placeholder="Nome para sua carteira"
                        />

                        <Dropdown
                            data={[
                                { label: "Pessoal", value: "PERSONAL" },
                                { label: "Empresarial", value: "ENTERPRISE" },
                            ]}
                            label="Tipo de carteira"
                            selectItem={setSelectedWalletType}
                            selectedData={selectedWalletType}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}