import {useLocaleStore} from "@/pinia/useLocaleStore";
export * from "./convertCategoryFilterResponse";
export * from "./convertBrandFilterResponse";
export * from "./topCategories";
export * from "./scrollToTop";

export const getLocaleIso = (): string => {
    return useLocaleStore().selectedLanguageIso();
};

export const getArabicLocale = () => {
    return useLocaleStore().locales()?.find((l) => l.code === 'ar');
};
