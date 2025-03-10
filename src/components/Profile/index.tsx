import { Link } from "expo-router"
import { Text, TouchableOpacity } from "react-native"

type ProfileProps = {
    id: number,
    type: string,
    name: string
}
export function Profile(data: ProfileProps){
    return (
        <TouchableOpacity className="items-center justify-center gap-2">
            <Link
                href={`/private/home/${data.id}`}
                className={
                    "w-28 h-28 border-black border rounded-full flex text-center pt-9 justify-center border-dashed shadow-black shadow-md " +
                    (data.type === "PERSONAL" ? "bg-yellow-medium" : "bg-blue-medium")
                  }
            >
                <Text className="text-4xl">{data.name[0]}</Text>
            </Link>
            <Text className="text-xl text-white font-semibold">{data.name}</Text>
        </TouchableOpacity>
    )
}