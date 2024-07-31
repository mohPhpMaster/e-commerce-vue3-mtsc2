export const methods = {
    columnClass(col = 4, dim = 'md') {
        col = Number(Number.isInteger(col) ? col : col?.productsCount);
        col = col > 12 ? 12 : col;
        col = col < 1 ? 1 : col;
        col = Math.ceil(12 / col);
        dim = dim ? `${dim}-` : '';
        return col ? `col-${dim}${col}` : 'col-12';
    },

    parseImageUrl(url = "", baseUrl = process.env.VUE_APP_IMAGES_URL) {
        if (url) {
            if (url.startsWith('http')) {
                return url
            }

            return baseUrl + url
        }

        return require("../assets/no-image.png")
    },

    parseProductDescription(description = "") {
        description = String(description).trim();
        if (description.length > 20) {
            description = description.substring(0, 20) + '...';
        }

        return description;
    },

    parseProductName(product = {different: "", name: ""}) {
        let suffix = product?.different || "";
        suffix = suffix ? ` (${suffix})` : "";
        return product?.name + suffix;
    },
};

export const computed = {
    parsed_description() {
        return this?.parseProductDescription(this?.model?.description || this?.product?.description || "");
    },
    parsed_product_name() {
        return this?.parseProductName(this?.model || this?.product || {});
    },
    parsed_title() {
        return this?.parseProductName(this?.model || this?.product || {}) ||
            this?.title ||
            "";
    },
};

export default {
    methods,
    computed,
};