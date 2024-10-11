import type {AxiosInstance, AxiosRequestConfig} from "axios";
import {Ref} from "vue";

export interface IAxiosInstance {
    readonly instance: AxiosInstance;
    readonly optionsBag: AxiosRequestConfig;
    readonly headerLanguage: Ref<string>;

    setToken(token?: string): void;
    hasToken(): boolean;
    removeToken(): void;
}

export interface IAxios extends AxiosInstance, IAxiosInstance {
}


export type TAxios = AxiosInstance & IAxiosInstance;