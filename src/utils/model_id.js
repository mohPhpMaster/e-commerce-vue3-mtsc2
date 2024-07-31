export function model() {
    return this?.product;
}

export function id() {
    return String(this?.model?.slug || this.$route?.params?.id).trim();
}

export default {
    computed: {
        model,
        id,
    },
};