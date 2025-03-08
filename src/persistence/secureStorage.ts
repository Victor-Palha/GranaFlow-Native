import * as SecureStore from 'expo-secure-store';

class SecureStoragePersistence {
    private static KEYS = {
        JWT_TOKEN: "granaFlow.jwt",
        // REFRESH: "granaFlow.refresh",
        USERID: "granaFlow.userId",
    }
    static async clearTokens(){
        await SecureStore.deleteItemAsync(this.KEYS.JWT_TOKEN);
    }

    static async setJWT(value: string){
        await SecureStore.setItemAsync(this.KEYS.JWT_TOKEN, value);
    }

    static async getJWT(): Promise<string | null>{
        return await SecureStore.getItemAsync(this.KEYS.JWT_TOKEN);
    }

    static async setUserId(value: string){
        await SecureStore.setItemAsync(this.KEYS.USERID, value);
    }

    static async getUserId(): Promise<string | null>{
        return await SecureStore.getItemAsync(this.KEYS.USERID);
    }

    static async clearAll(){
        await SecureStore.deleteItemAsync(this.KEYS.JWT_TOKEN);
        await SecureStore.deleteItemAsync(this.KEYS.USERID);
    }
}

export default SecureStoragePersistence;