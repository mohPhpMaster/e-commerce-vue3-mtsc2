import {api} from "@/plugins/api";
import type {IUserAddresses} from "@/types/user-addresses-d-t";
import type {INiceSelectOption} from "@/types/user-nice-select-option-d-t";

export const useUserAddressesStore = defineStore("user_addressess", () => {
    const userAddresses = ref<IUserAddresses[]| INiceSelectOption[]>([]);
    const userAddressToOptions = ref<INiceSelectOption[]>([]);
    const selectedAddress = ref<IUserAddresses | INiceSelectOption | null>(null);
    const selectedAddressOption = ref<number>(0);


    const fetchUserAddresses = async () => {
        userAddresses.value = await api.userAddressesData();

        if (userAddresses.value.length) {
            SetSelectAddress(userAddresses.value.find(address => address.is_default) || userAddresses.value[0]);
        }
    };

    const SetSelectAddress = (address: IUserAddresses|INiceSelectOption) => {
        if ("value" in address && "text" in address) {
            selectedAddress.value = userAddresses.value.find(item => item.id === address.value);
        } else {
            selectedAddress.value = address;
        }
        userAddressToOptions.value = getUserAddressToOptions();
        selectedAddressOption.value = getSelectedAddressIndex();
    };

    const getSelectedAddressIndex = () => {
        return userAddressToOptions.value.findIndex(address => address.value === selectedAddress.value?.id) || 0;
    };

    const getUserAddressToOptions = () => {
        return [...userAddresses.value].map(address => ({value: address.id, text: address.label}));
    };

    return {
        userAddresses,
        SetSelectAddress,
        selectedAddress,
        getSelectedAddressIndex,

        userAddressToOptions,
        selectedAddressOption,
        getUserAddressToOptions,

        fetchUserAddresses,
    }
});
