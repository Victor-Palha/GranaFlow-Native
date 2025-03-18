import { TransactionContext } from "@/contexts/transaction/transactionContext"
import { Link, router } from "expo-router"
import { useContext } from "react"
import { Text, TouchableOpacity, View } from "react-native"

type ProfileProps = {
    id: number,
    type: string,
    name: string,
    
}
export function Profile(data: ProfileProps){
    const {setWalletToProvider} = useContext(TransactionContext)

    function handleChooseWallet(){
        setWalletToProvider(data.id)
        router.replace(`/private/home/${data.id}`)
    }
    
    return (
        <TouchableOpacity className="items-center justify-center gap-2" onPress={handleChooseWallet}>
            <View
                className={
                    "w-28 h-28 border-black border rounded-full flex items-center text-center pt-1 justify-center border-dashed shadow-black shadow-md " +
                    (data.type === "PERSONAL" ? "bg-yellow-medium" : "bg-blue-medium")
                  }
            >
                <Text className="text-4xl">{data.name[0]}</Text>
            </View>
            <Text className="text-xl text-white font-semibold">{data.name}</Text>
        </TouchableOpacity>
    )
}