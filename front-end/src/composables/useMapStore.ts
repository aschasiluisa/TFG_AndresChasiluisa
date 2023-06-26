import { computed } from 'vue'
import { useStore } from 'vuex'
import store, { StateInterface } from '@/store'

export const useMapStore = () => {

    const store = useStore<StateInterface>();

    return {
         // STATE //
        baseMaps: computed(() => store.state.map.baseMaps),

        selectedBaseMap: computed(() => store.state.map.selectedBaseMap),

        baseMapsConnections: computed(() => store.state.map.baseMapsConnections),

        layers: computed(() => store.state.map.layers),

        layersControl: computed(() => store.state.map.layersControl),

        mapResponse: computed(() => store.state.map.mapResponse),

        sendingData: computed(() => store.state.map.sendingData),

        // GETTERS //
        getRegistrosCalidadAire: computed<any>(() => store.getters['map/getRegistrosCalidadAire'] ),

        getRegistrosIncidencias: computed<any>(() => store.getters['map/getRegistrosIncidencias']),

        getRegistrosAlarmas: computed<any>(() => store.getters['map/getRegistrosAlarmas']),

        getElementInfoID: computed<any>(() => store.getters['map/getElementInfoID']),

        getRegistroInfo: computed<any>(() => store.getters['map/getRegistroInfo']),

        getBbox: computed<number[]>(()=> store.getters['map/getBbox']),

        // ACTIONS //
        registrosCalidadAire:() => store.dispatch('map/registrosCalidadAire'),

        registrosIncidencias: (token: string) => store.dispatch('map/registrosIncidencias', {token}),

        registrosAlarmas: (token: string) => store.dispatch('map/registrosAlarmas', {token}),

        registroCalidadAireInfo:(id: string) => store.dispatch('map/registroCalidadAireInfo', {id}),

        registroIncidenciaInfo:(id: string) => store.dispatch('map/registroIncidenciaInfo',{id}),

        registroAlarmaInfo:(token: string, id: string) => store.dispatch('map/registroAlarmaInfo',{token, id}),

        nuevaIncidencia: (token: string, nombre: string, tipo: string, coordenadas: string, imagen: File, descripcion: string, bbox: number[]) => 
        store.dispatch('map/nuevaIncidencia', {token, nombre, tipo, coordenadas, imagen, descripcion, bbox }),

        nuevaAlarma: (token: string, nombre: string, rango: number, coordenadas: string, bbox: number[]) => 
        store.dispatch('map/nuevaAlarma', {token, nombre, rango, coordenadas, bbox}),

        updateIncidencia: (token: string, id: string, nombre: string, tipo: string, coordenadas: string, imagen: File | undefined, descripcion: string, validada: boolean, bbox: number[]) => 
        store.dispatch('map/updateIncidencia', {token, id, nombre, tipo, coordenadas, imagen, descripcion, validada, bbox }),

        resetAlarma: (token: string, id: string) => store.dispatch('map/resetAlarma', {token, id}),

        deleteIncidencia: (token: string, id: string, validada: boolean, nombre: string) => store.dispatch('map/deleteIncidencia', { token, id, validada, nombre}),

        deleteAlarma: (token: string, id: string) => store.dispatch('map/deleteAlarma', { token, id}),

        //  MUTATIONS //
        setBaseMap: (map: { id: number, name: string }) => store.commit('map/setBaseMap', map),

        resetLayersControl: () => store.commit('map/resetLayersControl'),

        resetElementInfoID:() => store.commit('map/resetElementInfoID'),

        clearMapResponse: () => store.commit('map/clearMapResponse'),

        resetregistrosAlarmas: () => store.commit('map/resetregistrosAlarmas')

    }
}