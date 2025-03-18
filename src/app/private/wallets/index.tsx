import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { walletsModelView } from "./walletsModelView";
import { Profile } from "@/components/Profile";
import { ModalCreateWallet } from "./ModalCreateWallet";
import { WalletsLoading } from "@/components/ProfileLoading";
import { useContext } from "react";
import { TransactionContext } from "@/contexts/transaction/transactionContext";
import { router } from "expo-router";

export default function Wallets(){
    const {setWalletToProvider} = useContext(TransactionContext)

    const {wallets, isLoadingWallets, isModalOpen, handleModal, setTrackWallets} = walletsModelView()

    function handleSelectWallet(wallet_id: number){
        setWalletToProvider(wallet_id)
        router.push(`/private/home/${wallet_id}`)
    }
    return (
        <View className="flex-1 items-center pt-14">
            <View className="flex-row items-center justify-between w-full px-10">
                <Image source={require('@/assets/logo.png')} className="w-20 h-20"/>
                <MaterialIcons name="logout" size={32} color="white" />
            </View>

            <View className="mt-20 items-center gap-2">
                <Text
                    className="text-2xl text-white"
                    style={{ fontFamily: 'PlaywriteITModerna-Regular' }}
                >Carteiras</Text>

                <Text className="text-lg text-white" style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>Centralize suas finanças em um único lugar</Text>
            </View>

            <View className="items-center gap-5 mt-5">
                {!isLoadingWallets && wallets && wallets.length > 0 ? (
                    <FlatList
                        data={wallets}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Profile id={item.id} name={item.name} type={item.type} handleSelectWallet={handleSelectWallet}/>
                        )}
                        contentContainerStyle={{ alignItems: 'center', paddingTop: 80 }}
                        ListFooterComponent={
                            <TouchableOpacity
                                className="items-center justify-center gap-2 mt-10"
                                onPress={handleModal}
                            >
                                <View className="w-28 h-28 border-black border rounded-full flex items-center justify-center border-dashed bg-green-medium shadow-black shadow-md">
                                    <Ionicons name="add-sharp" size={40} color="black" />
                                </View>
                                <Text className="text-xl text-white font-semibold">Criar carteira</Text>
                            </TouchableOpacity>
                        }
                    />
                ) : (
                    <WalletsLoading />
                )}
            </View>


            <ModalCreateWallet
                isModalOpen={isModalOpen}
                closeModal={handleModal}
                setTrackWallets={setTrackWallets}
            />
        </View>
    )
}