import { Text, TouchableOpacity, View } from "react-native"

type ProfileProps = {
    id: number,
    type: string,
    name: string,
    handleSelectWallet(wallet_id: number): void
}
export function Profile(data: ProfileProps){    
    return (
        <TouchableOpacity className="items-center justify-center gap-2" onPress={()=>data.handleSelectWallet(data.id)}>
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