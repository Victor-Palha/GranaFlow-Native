import { API } from "@/api/config";
import { LocalStorage } from "@/persistence/localStorage";
import SecureStoragePersistence from "@/persistence/secureStorage";
import { AxiosError } from "axios";
import { router } from "expo-router";

export async function useAPI() {
    const jwtRefreshToken = await SecureStoragePersistence.getRefreshJWT();

    if (!jwtRefreshToken) {
        await handleInvalidSession();
        return;
    }

    API.setTokenAuth(jwtRefreshToken);

    try {
        const response = await API.server.get("/refresh/");
        const { token, refresh_token, user_id } = response.data;
        await SecureStoragePersistence.setJWT(token);
        await SecureStoragePersistence.setRefreshJWT(refresh_token);

        API.setTokenAuth(token);

        return API;
    } catch (error) {
        console.log(error)
        await handleRefreshError(error);
    }
}

async function handleInvalidSession() {
    await SecureStoragePersistence.clearTokens();
    await LocalStorage.deleteAll();
    router.replace("/");
}
  
async function handleRefreshError(error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
        await SecureStoragePersistence.clearAll();
        await LocalStorage.deleteAll();
        router.replace("/");
    } else {
        console.error("Unexpected error during refresh:", error);
    }
}
  