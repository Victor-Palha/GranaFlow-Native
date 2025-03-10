import { colors } from "@/styles/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    total: number
}
export function Header({total}: HeaderProps){
    // const [hasNotification, setHasNotification] = useState<boolean>(false)
    // const [notifications, setNotifications] = useState<NotificationProps[]>([] as NotificationProps[])
    // const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    // function handleSignout(){
    //     if(!window.confirm("Deseja realmente sair?")) return;

    //     localStorage.removeItem('@forno:auth');
    //     window.document.location.href = '/login';
    // }

    // async function getAllNotifications(){
    //     const result = await api.get("/notifications/all")
    //     if(result.data.length > 0){
    //         setHasNotification(true)
    //     }
    //     setNotifications(result.data)
    // }

    // async function verifyIfIsSomeoneBirthday(){
    //     // await api.get("/notifications/check-birthdays")
    // }

    // useEffect(()=>{
    //     verifyIfIsSomeoneBirthday()
    //     getAllNotifications()
    // }, [])

    return (
        <LinearGradient
            colors={[colors.green.high, colors.green.medium]}
            style={styles.background}
        >            
            <View className="flex-row items-center justify-between w-full">
                <View>
                    {/* Profile Picture */}
                </View>
                <View>
                    <MaterialIcons name="logout" size={32} color="white" />
                </View>
            </View>

            <View className="flex flex-col justify-end items-center pt-20">
                <Text className="font-semibold text-white">Total</Text>
                <Text className="
                    text-5xl
                    font-bold
                    text-white
                    mt-2
                ">R$ {total.toFixed(2)}</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: 350,
        padding: 16,
        paddingTop: 60,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        alignItems: "center",
        boxShadow:" 10",
        gap: 5
    }
})