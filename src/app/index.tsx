import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, DMSans_700Bold, DMSans_700Bold_Italic } from '@expo-google-fonts/dm-sans';
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "@/styles/colors";

export default function Index(){
    const [isFontLoades, setIsFontLoaded] = useState(false)
    const [fontsLoaded] = useFonts({
        'PlaywriteITModerna': require('../../assets/fonts/PlaywriteITModerna-ExtraLight.ttf'),
        DMSans_700Bold,
        DMSans_700Bold_Italic
    });

    useEffect(()=>{
        fontsLoaded ? setIsFontLoaded(true) : setIsFontLoaded(false)
    },[fontsLoaded])

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
                    <Text  className="text-3xl text-center text-green-low px-6 shadow-green-high shadow-md" style={{ fontFamily: 'DMSans_700Bold' }} >Controle suas finanças</Text>
                    <Text className="text-xl text-center text-white px-6 shadow-black shadow" style={{ fontFamily: 'DMSans_700Bold_Italic' }}>pessoais e empresariais.</Text>
                </View>
            </View>

            <TouchableOpacity className="flex-row items-center gap-5 bg-white w-[70%] justify-center rounded-lg p-3 shadow">
                <Image source={require("../assets/Google.png")}/>
                <Text className="text-xl">Entrar com Google</Text>
            </TouchableOpacity>
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