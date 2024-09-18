import type {ISocialLink} from "@/types/social-link-d-t";
import {objectOnly} from "./objectOnly";

type TObject = { [key: string]: any } | any;

export const socialLinks = {
    "email": {
        link: "mailto:",
        icon: "fas fa-envelope",
        title: "Email",
    },
    "phone": {
        link: "tel:",
        icon: "fas fa-phone",
        title: "Phone",
    },
    "whatsapp": {
        link: "https://wa.me/",
        icon: "fa-whatsapp",
        title: "Whatsapp",
    },
    "facebook": {
        link: "https://www.facebook.com/",
        icon: "fa-facebook-f",
        title: "Facebook",
    },
    "twitter": {
        link: "https://twitter.com/",
        icon: "fa-twitter",
        title: "Twitter",
    },
    "instagram": {
        link: "https://www.instagram.com/",
        icon: "fa-instagram",
        title: "Instagram",
    },
    "linkedin": {
        link: "https://www.linkedin.com/",
        icon: "fa-linkedin-in",
        title: "Linkedin",
    },
    "vimeo": {
        link: "https://vimeo.com/",
        icon: "fa-vimeo-v",
        title: "Vimeo",
    },
    "youtube": {
        link: "https://youtube.com/",
        icon: "fa-youtube",
        title: "Youtube",
    },
};

export function getSocialLinks(obj: TObject, except?: string[]): TObject {
    let links = except ? Object.keys(socialLinks).filter((key) => !except.includes(key)) : Object.keys(socialLinks);
    return objectOnly(obj, links);
}

export function toSocialLinks(obj: TObject): ISocialLink[] {
    return Object.keys(obj).map((key) =>{
        let _type = socialLinks?.[key] || {
            link: "https://www.google.com/",
            icon: "fas fa-chain",
            title: key,
        };

        let _obj = obj?.[key]
        _obj = typeof _obj === 'string' ? {link: (_type?.link||"") + _obj} : _obj;
        return {
            id: _obj?.id || _type?.id || _obj?.link || undefined,
            link: _obj?.link || _type?.link || undefined,
            icon: _obj?.icon || _type?.icon || undefined,
            title: _obj?.title || useNuxtApp()?.$i18n.t(_type?.title) || undefined,
        }
    });
}
