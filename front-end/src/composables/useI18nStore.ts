import { computed } from 'vue'
import { useStore } from 'vuex'
import { StateInterface } from '@/store'

export const useI18nStore = () => {
    const store = useStore<StateInterface>();

    return{

        // GETTERS //
        getIdioma: computed<string>(() => store.getters['i18n/getIdioma']),

        // MUTATIONS //
        setIdioma: (idioma: string) => store.commit('i18n/setIdioma', idioma),
    }
}