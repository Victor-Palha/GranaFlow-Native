import { Link, LinkProps } from 'expo-router';
import { useHrefAttrs } from "expo-router/build/link/useLinkHooks";
import { Text, View } from "react-native";

{/* Pagamentos */}
{/* Produtos */}
{/* Usuários */}
{/* Relatorios */}
type BoxNavProps = {
    title: string;
    target: LinkProps['href'];
    children: React.ReactNode;
}
export function BoxNav({title, children, target}: BoxNavProps){
    return (
        <View className="flex items-center flex-col">
            <Link href={target} className="rounded-full p-4 bg-green-medium border-green-high border-[0.2px]">
                {children}
            </Link>
            <Text className="text-sm font-semibold text-mainText">{title}</Text>
        </View>
    )
}