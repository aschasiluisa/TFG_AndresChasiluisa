import { createStore } from 'vuex'

import authenticationModule from './authentication'
import { AuthenticationState } from './authentication/state'

import mapModule from './map'
import { MapState } from './map/state'

export interface StateInterface {
    auth: AuthenticationState,
    map: MapState,
}

export default createStore<StateInterface>({
    modules: {
        auth: authenticationModule,
        map: mapModule,
    }
})
