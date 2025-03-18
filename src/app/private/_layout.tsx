import { AuthContext } from "@/contexts/auth/authContext";
import { TransactionContextProvider } from "@/contexts/transaction/transactionContext";
import { colors } from "@/styles/colors";
import { router, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { StatusBar } from "react-native";

export default function PrivateLayout() {
  const { authState } = useContext(AuthContext);
  const bgColor = colors.green.high;

  useEffect(() => {
    if (!authState.authenticated) {
      router.replace('/');
    }
  }, [authState.authenticated]);

  return (
    <TransactionContextProvider>
      <StatusBar barStyle="default" backgroundColor={bgColor} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: bgColor,
          },
        }}
      />
    </TransactionContextProvider>
  );
}
