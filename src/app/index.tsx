import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, DMSans_700Bold, DMSans_700Bold_Italic } from '@expo-google-fonts/dm-sans';
import { useCallback, useContext, useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "@/styles/colors";
import { AuthContext } from "@/contexts/auth/authContext";
import { router } from "expo-router";

export default function Index(){
    const {onLogin, isLoading, authState} = useContext(AuthContext)
    

    const [isFontLoades, setIsFontLoaded] = useState(false)
    const [fontsLoaded] = useFonts({
        'PlaywriteITModerna': require('../../assets/fonts/PlaywriteITModerna-ExtraLight.ttf'),
        'PlaywriteITModerna-Regular': require('../../assets/fonts/PlaywriteITModerna-Regular.ttf'),
        DMSans_700Bold,
        DMSans_700Bold_Italic
    });

    useEffect(()=>{
        fontsLoaded ? setIsFontLoaded(true) : setIsFontLoaded(false)
    },[fontsLoaded])

    useEffect(()=>{
        if(authState.authenticated){
            router.replace("/private/wallets")
        }
    }, [authState])

    if (!isFontLoades) {
        return null;
    }

    return (
        <LinearGradient
            colors={[colors.green.high, colors.green.medium]}
            style={styles.background}
        >
            <View className="gap-5 items-center">
                <Image source={require("../assets/logo.png")}/>
                <Text className="text-4xl shadow-black shadow" style={{ fontFamily: 'PlaywriteITModerna' }}>Grana<Text className="text-green-low">Flow</Text></Text>

                <View className="gap-2">
                    <Text  className="text-2xl text-center text-green-low px-6 shadow-green-high shadow-md" style={{ fontFamily: 'PlaywriteITModerna-Regular' }}>
                        Controle suas finanças
                    </Text>
                    <Text className="text-xl text-center text-white px-6 shadow-black shadow" style={{ fontFamily: 'DMSans_700Bold' }}>
                        Pessoais e Empresariais.
                    </Text>
                </View>
            </View>

            <View className="items-center justify-center">
                <TouchableOpacity className="flex-row items-center gap-5 bg-white justify-center rounded-lg py-3 px-10 shadow" onPress={onLogin} disabled={isLoading}>
                    <Image source={require("../assets/Google.png")}/>
                    <Text className="text-xl">Entrar com Google</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        gap: 5
    }
})