import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BoxNav } from "./BoxNav";
import { View } from "react-native";

{/* Pagamentos */}
{/* Produtos */}
{/* Usuários */}
{/* Relatorios */}

export function Nav() {
    return (
        <View className="flex-row bg-white rounded-md shadow-black shadow-sm top-[-50px] relative h-[100px] w-[80%] mx-auto justify-center items-center gap-4">
            <BoxNav title="Pagamentos" target="/payments">
                <FontAwesome name="credit-card" size={20} color="black" />
            </BoxNav>
            <BoxNav title="Relatórios" target="/summary">
                <FontAwesome6 name="money-bill-trend-up" size={20} color="black" />
            </BoxNav>
        </View>
    )
}