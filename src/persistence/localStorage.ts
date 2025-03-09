import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserProfile = {
    id: string,
    email: string,
    name: string,
    avatar_url: string,
};

export class LocalStorage {
    private static KEYS = {
        USERID: "granaFlow.userId",
        USEREMAIL: "granaFlow.userEmail",
        USERNAME: "granaFlow.userName",
        USERPHOTO: "granaFlow.userPhoto"
    }

    static async setUserProfile(userProfile: UserProfile){
        await AsyncStorage.setItem(this.KEYS.USERID, userProfile.id)
        await AsyncStorage.setItem(this.KEYS.USEREMAIL, userProfile.email)
        await AsyncStorage.setItem(this.KEYS.USERNAME, userProfile.name)
        await AsyncStorage.setItem(this.KEYS.USERPHOTO, userProfile.avatar_url)
    }

    static async getUserProfile(): Promise<UserProfile>{
        const id = await AsyncStorage.getItem(this.KEYS.USERID) ?? ''
        const email = await AsyncStorage.getItem(this.KEYS.USEREMAIL) ?? ''
        const name = await AsyncStorage.getItem(this.KEYS.USERNAME) ?? ''
        const avatar_url = await AsyncStorage.getItem(this.KEYS.USERPHOTO) ?? ''

        return {
            id,
            email,
            name,
            avatar_url
        }
    }

    static async deleteAll(){
        await AsyncStorage.multiRemove([
            this.KEYS.USERID,
            this.KEYS.USEREMAIL,
            this.KEYS.USERNAME,
            this.KEYS.USERPHOTO,
        ])
    }
}