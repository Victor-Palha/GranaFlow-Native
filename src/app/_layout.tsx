import { AuthContextProvider } from "@/contexts/auth/authContext";
import { colors } from "@/styles/colors";
import "@/styles/global.css"
import { Stack } from 'expo-router';
import { StatusBar } from "react-native";

export default function RootLayout() {
  const bgColor = colors.green.high
  return (
    <AuthContextProvider>
      <StatusBar barStyle="default" backgroundColor={bgColor} />
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: bgColor
        }
      }}/>
    </AuthContextProvider>
  )
}