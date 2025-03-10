import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Dropdown, DropdownData } from "@/components/Dropdown";
import { API } from "@/api/config";
import SecureStoragePersistence from "@/persistence/secureStorage";
import { AxiosError } from "axios";

type ModalCreateWalletProps = {
    isModalOpen: boolean,
    closeModal: () => void
    setTrackWallets: (value: number)=>void
}
export function ModalCreateWallet({isModalOpen, closeModal, setTrackWallets}: ModalCreateWalletProps){
    const [isCreatingWallet, setIsCreatingWallet] = useState(false)
    const [selectedWalletType, setSelectedWalletType] = useState<DropdownData>({label: "Pessoal", value: "PERSONAL"});
    const [nameWallet, setNameWallet] = useState<string>("")

    async function handleCreateWallet(){
        if(nameWallet.length < 3){
            return Alert.alert("Aviso", "Por favor, dê um nome com mais de 3 letras para sua carteira")
        }
        const token = await SecureStoragePersistence.getJWT()
        if(!token){
            return Alert.alert("Erro", "Erro ao conectar na sua conta.")
        }
        const api = API
        api.setTokenAuth(token)
        setIsCreatingWallet(true)
        try{
            await api.server.post("/api/wallet", {name: nameWallet, type: selectedWalletType.value})
            setNameWallet("")
            setSelectedWalletType({label: "Pessoal", value: "PERSONAL"})
            setTrackWallets(Math.random() * 100)
            closeModal()
        }catch(error){
            if(error instanceof AxiosError){
                return Alert.alert("Erro", error.response?.data.message)
            }
        }finally{
            setIsCreatingWallet(false)
        }
    }

    return (
        <Modal visible={isModalOpen} transparent animationType="slide">
            <View className="flex-1 h-full justify-end shadow-black shadow-md">
                <View className="bg-green-medium items-center gap-5 p-10 pb-20">
                    {/* Header */}
                    <View className='flex-row justify-between items-center w-full'>
                        <Text className='text-white text-lg font-semibold' style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>Criar Carteira</Text>
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
                            value={nameWallet}
                            onChangeText={setNameWallet}
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

                        <TouchableOpacity 
                            className="w-[90%] bg-green-low p-3 rounded-lg items-center mt-4 shadow-black shadow-md" 
                            onPress={handleCreateWallet} 
                            disabled={isCreatingWallet}
                        >
                            <Text className="text-lg font-bold">Criar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}