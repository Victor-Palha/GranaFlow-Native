import { Link } from "expo-router";
import { Text, View } from "react-native";

{/* Pagamentos */}
{/* Produtos */}
{/* Usuários */}
{/* Relatorios */}
type BoxNavProps = {
    title: string;
    target: string;
    children: React.ReactNode;
}
export function BoxNav({title, children, target}: BoxNavProps){
    return (
        <View className="flex items-center flex-col">
            <Link href="/" className="rounded-full p-4 bg-green-low hover:scale-105 transition hover:shadow-sm hover:shadow-green-high">
                {children}
            </Link>
            <Text className="text-sm font-semibold text-mainText">{title}</Text>
        </View>
    )
}