import {ILocale} from "@/types/locale-d-t";

export interface ISiteSettings {
    currency?: string;
    noImageUrl?: string;
    perPage?: number;
    siteTitle?: string;
    siteKeywords?: string;
    siteDescription?: string;
    siteCopyRight?: string;
    logo?: string;
    logoSmall?: string;
    favicon?: string;
    sliderShow?: boolean;
    phone?: string;
    email?: string;
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    address?: string;
    locales?: ILocale[];
    locale?: string;
    footerBackground?: string;
    footerColor?: string;
    hoverColor?: string;
    priceColor?: string;
    priceBackground?: string;
    categoryColor?: string;
    categoryTitleColor?: string;
    categoryTitleBackground?: string;
}