import { ActionTree } from 'vuex'
import { MapState } from './state'
import { StateInterface } from '../index'

import { mapAPI, responseRegistrosCalidadAireControl} from '@/api/mapAPI'

const actions: ActionTree<MapState, StateInterface> = {

    async registrosCalidadAire({commit}){
        try {
            let responseControl: responseRegistrosCalidadAireControl | undefined = undefined;

            const responseUserInfo = await mapAPI.get('/registrosCalidadAire');

            if(responseUserInfo.data && responseUserInfo.data.result){
                commit("setRegistrosCalidadAire",responseUserInfo.data.data)
                responseControl = responseRegistrosCalidadAireControl.ok;
            } else {
                responseControl = responseRegistrosCalidadAireControl.serverError
            }

            commit("setMapResponse", responseControl);
        }
        catch {
            commit("setMapResponse", responseRegistrosCalidadAireControl.serverError);
        }
    },

}

export default actions