import  {createI18n}  from "vue-i18n"

import es from "./es.json";
import en from "./en.json"

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
