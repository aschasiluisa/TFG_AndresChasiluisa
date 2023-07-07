import { Idiomas, defaultIdioma } from "@/i18n/index"

export interface I18nState {
    idioma: Idiomas;
}

function state(): I18nState {
    return {
        idioma: defaultIdioma,
    }
}

export default state