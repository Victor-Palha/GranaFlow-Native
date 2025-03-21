import { createContext, useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import { Alert } from "react-native";
import { URLS } from "@/constants/URLS";
import { LocalStorage, UserProfile } from "@/persistence/localStorage";
import SecureStoragePersistence from "@/persistence/secureStorage";
import { router } from "expo-router";
import { useAPI } from "@/hooks/useApi";

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
            const authUrl = `${URLS.api}/auth/google?client=mobile`;
            const result = await WebBrowser.openAuthSessionAsync(authUrl, `${URLS.api}/auth/google/callback`);
            if (result.type === 'success') {
                const params = new URLSearchParams(result.url.split('?')[1]);
                const token = params.get('token') ?? '';
                const refresh = params.get('refresh_token') ?? '';

                const user = {
                  id: params.get('id'),
                  email: params.get('email'),
                  name: params.get('name'),
                  avatar_url: params.get('avatar_url'),
                } as UserProfile;

                Alert.alert('Sucesso', 'Autenticação concluída!');

                setAuthState({
                    authenticated: true,
                    user_id: user.id
                })

                await SecureStoragePersistence.setRefreshJWT(refresh)
                await SecureStoragePersistence.setJWT(token)
                await LocalStorage.setUserProfile(user)

                router.replace('/private/wallets')
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
        await SecureStoragePersistence.clearAll()
        await LocalStorage.deleteAll();
        setAuthState({
            authenticated: false,
            user_id: null
        })
        router.replace("/")
    }

    async function validateAuth() {
        try{
            const api = await useAPI()
            if(api){
                const user = await LocalStorage.getUserProfile()
                setAuthState({
                    authenticated: true,
                    user_id: user.id
                })
            }else {
                setAuthState({
                    authenticated: false,
                    user_id: null
                })
            }
        } catch(error){
            setAuthState({
                authenticated: false,
                user_id: null
            })
        }
    }

    useEffect(()=>{
        validateAuth()
    }, [])

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