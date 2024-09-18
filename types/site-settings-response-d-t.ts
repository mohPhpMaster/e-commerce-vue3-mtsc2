import { ILocale } from './locale-d-t';

export interface ISiteSettingsResponse {
    currency?: string;
    noImageUrl?: string;
    perPage?: number;
    perRow?: number;
    slider_show?: number;
    siteTitle?: string;
    email?: string; // contact us email
    whatsapp?: string; // footer
    facebook?: string; // footer
    twitter?: string; // footer
    instagram?: string; // footer
    address?: string; // footer
    google_map_url?: string; // footer
    keywords?: string; // seo
    description?: string; // seo
    phone?: string; // footer
    copy_right?: string; // footer
    logo?: string; // header
    logo_sm?: string; // footer
    favicon?: string;
    website_color?: string; // primary color
    hover_color?: string; // hover
    prices_color?: string; // product price color
    prices_background_color?: string; // product price background
    placingColorWhenPlacingMouseOnTheTopMenu?: string; // menu hover bg color
    footer_text_color?: string; // footer text
    footer_color?: string; // footer bg
    category_text_color?: string; // main page category color
    category_text_color_title?: string; // main page category color
    category_background_color_title?: string; // main page category color
    navbar_text_color?: string; // nav color
    navbar_color?: string; // nav bg
    locales?: ILocale[];
    locale?: string;
}