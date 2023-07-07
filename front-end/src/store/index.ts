import { createStore } from 'vuex'

import authenticationModule from './authentication'
import { AuthenticationState } from './authentication/state'

import mapModule from './map'
import { MapState } from './map/state'

import i18nModule from './i18n'
import { I18nState } from './i18n/state'

export interface StateInterface {
    auth: AuthenticationState,
    map: MapState,
    i18n: I18nState,
}

export default createStore<StateInterface>({
    modules: {
        auth: authenticationModule,
        map: mapModule,
        i18n: i18nModule,
    }
})
