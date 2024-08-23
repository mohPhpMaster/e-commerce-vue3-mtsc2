import {setLocale} from 'yup';

export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp?.$i18n;

    const bM = (k: string) => {
        return {
            [k]: (a: any) => i18n.t(`validation.${k}`, a)
        }
    };

    setLocale({
        mixed: {
            ...bM('required'),
        },
        string: {
            ...bM('email'),
            ...bM('min'),
            ...bM('max'),
        },
        number: {
            ...bM('min'),
            ...bM('max'),
        }
    });
});
