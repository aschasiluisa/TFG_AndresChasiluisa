import { computed } from 'vue'
import { useStore } from 'vuex'
import { StateInterface } from '@/store'

export const useMapStore = () => {

    const store = useStore<StateInterface>();

    return {
         // STATE //
        baseMaps: computed(() => store.state.map.baseMaps),

        selectedBaseMap: computed(() => store.state.map.selectedBaseMap),

        baseMapsConnections: computed(() => store.state.map.baseMapsConnections),

        layers: computed(() => store.state.map.layers),

        layersControl: computed(() => store.state.map.layersControl),

        // GETTERS //
        getRegistrosCalidadAire: computed<any>(() => store.getters['map/getRegistrosCalidadAire'] ),

        getElementInfoID: computed<any>(() => store.getters['map/getElementInfoID']),

        // ACTIONS //
        registrosCalidadAire:() => store.dispatch('map/registrosCalidadAire'),

        //  MUTATIONS //
        setBaseMap: (map: { id: number, name: string }) => store.commit('map/setBaseMap', map),

        resetLayersControl: () => store.commit('map/resetLayersControl'),

        setElementInfoID: (setElementInfoID: {layerID: number,elementID: number}) => store.commit('map/setElementInfoID', setElementInfoID),

        resetElementInfoID:() => store.commit('map/resetElementInfoID'),

    }
}