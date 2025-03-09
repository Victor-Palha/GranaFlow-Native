import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Profile } from "@/components/Profile";

export default function Home(){
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


            <View className="items-center gap-5 mt-20 flex-wrap">
                <Profile
                    id={1}
                    name="João Victor"
                    type="PERSONAL"
                />
                <TouchableOpacity className="items-center justify-center gap-2">
                    <View className="w-28 h-28 border-black border rounded-full flex items-center justify-center border-dashed bg-green-medium shadow-black shadow-md">
                        <Ionicons name="add-sharp" size={40} color="black" />
                    </View>
                    <Text className="text-xl text-white font-semibold">Criar carteira</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}