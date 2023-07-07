import  {createI18n}  from "vue-i18n"

import { useI18nStore } from "@/composables/useI18nStore";

import es from "./es.json";
import en from "./en.json"

const {
    getIdioma,
} = useI18nStore()

export enum Idiomas {
    ES = 'es',
    EN = 'en'
}

export const messages = {
    [Idiomas.ES]: es,
    [Idiomas.EN]: en
}

export const defaultIdioma = Idiomas.ES

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: defaultIdioma,
    fallbackLocale: defaultIdioma,
    messages
})
