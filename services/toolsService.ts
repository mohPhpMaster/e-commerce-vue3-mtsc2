import type {ICategory} from "@/types/category-d-t";
import type {ISubCategory} from "@/types/sub-category-d-t";
import type {IProduct} from "@/types/product-d-t";
import type {IMenuItem} from "@/types/menu-d-t";
import type {IDropdownMenu} from "@/types/dropdown-menu-d-t";
import type {IBrand} from "@/types/brand-d-t";

const idKey = ["slug", "sku"];

export default {
    parseImageUrl(url = "", baseUrl = "") {
        baseUrl = baseUrl || "";
        baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        url = url.startsWith('/') ? url.slice(1) : url;

        if (url) {
            return url.startsWith('http') ? url : (baseUrl + url);
        }

        return useNuxtApp().$settings.noImageUrl;
    },
    id(obj: any): string {
        // console.log(13,obj.ITYPE)
        let idx = idKey.find(key => key in obj);
        return idx && idx in obj ?
            obj[idx] :
            obj;
    },
    parseId(obj: any, suffix: string = ''): string {
        return idKey.includes('id') ? `${this.id(obj)}-${encodeURIComponent(suffix)}` : this.id(obj);
    },
    parseIdDev(obj: any, suffix: string = ''): string {
        return `${obj?.id}-${encodeURIComponent(suffix)}`;
    },
    getIdFromSlugPrefix(slug: string = ''): string {
        return String(String(slug).split('-').shift());
    },
    getSlug(slug: string | number, {prefix = '', suffix = ''} = {}): string {
        // let value = String(String(slug).split('-').shift());
        let value = String(slug);
        return value ? `${prefix || ''}${value}${suffix || ''}` : '';
    },
    slugToTitleCase(slug: string): string {
        return String(slug)
            .replace(/-/g, ' ')           // Replace hyphens with spaces
            .replace(/_/g, ' ')           // Replace underscores with spaces (if any)
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
    },
    parseMenuName(menu: IMenuItem | IDropdownMenu): string {
        return menu?.title || "Untitled Menu";
    },
    parseCategoryName(category?: ICategory | ISubCategory, $default: string = 'Untitled Category'): string {
        return category && (
            ("name" in category && category?.name) ||
            ("parentName" in category && category?.parentName) ||
            ("slug" in category && this.slugToTitleCase(category?.slug))
        ) || $default;
    },
    parseProductName(product: IProduct, addSuffix: boolean = false): string {
        let suffix = '';
        if (addSuffix) {
            suffix = product?.additionalInfo?.[0]?.value || '';
            suffix = suffix ? ` - ${suffix}` : '';
        }

        return String(product?.name || (product?.sku ? this.slugToTitleCase(product?.sku) : undefined) || product?.id || 'Untitled Product') +
            suffix;
    },
    parseProductDifferent(product: IProduct): string {
        return String(product?.additionalInfo?.[0]?.value || '');
    },
    parseProductDescription(
        product: IProduct, cutter: {
            when?: (() => boolean);
            max_length: number;
            suffix: string;
        } | (() => boolean) = {
            when: undefined,
            max_length: 100,
            suffix: '...'
        }
    ): string {
        let description = product?.description || '';
        if (typeof cutter === 'function') {
            if (cutter()) {
                description = (description.substring(0, 100) + '...');
            }
        } else if (cutter?.when) {
            if (cutter?.when()) {
                description = (description.substring(0, cutter.max_length) + cutter.suffix);
            }
        }

        return this.normalizeLineEndingsToHtml(description);

        // return (
        // 		!textMore || textMore()
        // 				? product?.description
        // 				: `${product?.description.substring(0, 100)}...`
        // ).replace(/\n/g, '<br>')
    },
    parseBrandName(brand: IBrand): string {
        return String(brand?.name || brand?.id || 'Untitled Brand');
    },
    normalizeLineEndings(text: string): string {
        return text.replace(/\r\n/g, '\n');
    },
    normalizeLineEndingsToHtml(text?: string): string {
        return this.normalizeLineEndings(text || "").replace(/\n/g, '<br>');
    },
    gotoCategory(category: ICategory): void {
        useRouter().push(this.getCategoryUrl(category));
    },
    gotoBrand(brand: IBrand): void {
        useRouter().push(this.getBrandUrl(brand));
    },
    getProductReviewUrl(product: IProduct): string {
        return `/products/${product.id}/reviews`;
    },
    getRelatedProductUrl(product: IProduct): string {
        return `/products/${this.parseId(product, product?.sku)}/related`;
    },
    getProductUrl(product: IProduct): string {
        return `/product-details/${this.parseId(product, product?.sku)}`;
    },
    getCategoryUrl(category: ICategory): string {
        return `/category/${this.parseId(category, category?.slug)}`;
    },
    getBrandUrl(brand: IBrand): string {
        return `/brand/${this.parseId(brand, brand?.slug)}`;
    },
    getDefaultNoImageUrl(): string {
        return useRuntimeConfig()?.public?.noImageUrl || "";
    },
    getApiUrl(): string {
        return useRuntimeConfig()?.public?.apiURL || "";
    },
}
