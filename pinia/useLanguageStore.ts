import {defineStore} from "pinia";
import {ref, watch} from "vue";

export let current_language = ref('');
const router = useRouter();

/**
 * @deprecated useless
 */
export const useLanguageStore = defineStore("language", () => {
    watch(()=>{
        return router.params?.locale
    }, (value)=>{
        if (value !== current_language.value) {
            current_language.value = value
        }
    });

    return {
        current_language,
    };
});
