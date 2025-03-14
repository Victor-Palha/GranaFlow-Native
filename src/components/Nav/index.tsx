import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BoxNav } from "./BoxNav";
import { View } from "react-native";

{/* Pagamentos */}
{/* Produtos */}
{/* Usuários */}
{/* Relatorios */}
type NavProps = {
    walletId: string | string[]
}
export function Nav({walletId}: NavProps) {
    return (
        <View className="flex-row bg-gray-light rounded-md shadow-black shadow-sm top-[-50px] relative h-[100px] w-[80%] mx-auto justify-center items-center gap-4">
            <BoxNav title="Transações" target={`/private/payments/${walletId}`}>
                <FontAwesome name="credit-card" size={20} color="black" />
            </BoxNav>
            <BoxNav title="Relatórios" target={`/private/reports/${walletId}`}>
                <FontAwesome6 name="money-bill-trend-up" size={20} color="black" />
            </BoxNav>
        </View>
    )
}