import { Modal, View } from "react-native";

type ModalCreateWalletProps = {
    isModalOpen: boolean,
    closeModal: () => void
}
export function ModalCreateWallet({isModalOpen, closeModal}: ModalCreateWalletProps){
    return (
        <Modal visible={isModalOpen}>
            <View className="flex-1 h-full justify-end">
                <View className="bg-green-medium items-center gap-5 p-10 pb-20">

                </View>
            </View>
        </Modal>
    )
}