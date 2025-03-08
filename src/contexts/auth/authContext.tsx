import { createContext, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import { Alert } from "react-native";
import { URLS } from "@/constants/URLS";

type AuthState = {
    user_id: string | null,
    authenticated: boolean | null
}

interface AuthProps {
    authState: AuthState,
    isLoading: boolean,
    onLogin: () => Promise<any>,
    onLogout(): Promise<void>
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export function AuthContextProvider({children}: {children: React.ReactNode}){
    const [authState, setAuthState] = useState<AuthState>({authenticated: null, user_id: null});
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onLogin(){
        setIsLoading(true)
        try {
            const authUrl = `${URLS.api}/auth/google`;
            const result = await WebBrowser.openAuthSessionAsync(authUrl, `${URLS.api}/auth/google/callback`);
            if (result.type === 'success') {
                const params = new URLSearchParams(result.url.split('?')[1]);
                const token = params.get('token');

                const user = {
                  id: params.get('id'),
                  email: params.get('email'),
                  name: params.get('name'),
                  avatar_url: params.get('avatar_url'),
                };

                Alert.alert('Sucesso', 'Autenticação concluída!');
                setAuthState({
                    authenticated: true,
                    user_id: user.id
                })
            } else {
                Alert.alert('Erro', 'Autenticação cancelada ou falhou');
                setAuthState({
                    authenticated: false,
                    user_id: null
                })
            }
        } catch (error) {
            Alert.alert('Erro', 'Algo deu errado');
            console.error(error);
            setAuthState({
                authenticated: false,
                user_id: null
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onLogout(){

    }

    const values = {
        authState,
        isLoading,
        onLogin,
        onLogout
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}