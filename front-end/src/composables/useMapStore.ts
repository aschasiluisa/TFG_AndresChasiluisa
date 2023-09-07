import { computed } from 'vue'
import { useStore } from 'vuex'
import store, { StateInterface } from '@/store'

export const useMapStore = () => {

    const store = useStore<StateInterface>();

    return {
         // STATE //
        baseMaps: computed(() => store.state.map.baseMaps),

        selectedBaseMap: computed(() => store.state.map.selectedID_BaseMap),

        baseMapsConnections: computed(() => store.state.map.baseMapsConnections),

        layers: computed(() => store.state.map.layers),

        layersControl: computed(() => store.state.map.layersControl),

        sublayers_4: computed(() => store.state.map.sublayers_4),

        sublayersControl_4: computed(() => store.state.map.sublayersControl_4),

        sublayers_5: computed(() => store.state.map.sublayers_5),

        sublayersControl_5: computed(() => store.state.map.sublayersControl_5),

        mapResponse: computed(() => store.state.map.mapResponse),

        sendingData: computed(() => store.state.map.sendingData),

        // GETTERS //
        getRegistrosCalidadAire: computed<any>(() => store.getters['map/getRegistrosCalidadAire'] ),

        getRegistrosIncidencias: computed<any>(() => store.getters['map/getRegistrosIncidencias']),

        getRegistrosAlarmas: computed<any>(() => store.getters['map/getRegistrosAlarmas']),

        getElementInfoID: computed<any>(() => store.getters['map/getElementInfoID']),

        getLast_registroInfoIDlayer: computed<any>(() => store.getters['map/getLast_registroInfoIDlayer']),

        getRegistroInfo: computed<any>(() => store.getters['map/getRegistroInfo']),

        getBbox: computed<number[]>(()=> store.getters['map/getBbox']),

        getTypeIncidence: computed<{ [key: string]: { name_es: string, name_en: string} }>(() => store.getters['map/getTypeIncidence']),

        // ACTIONS //
        registrosCalidadAire:() => store.dispatch('map/registrosCalidadAire'),

        registrosIncidencias: (token: string) => store.dispatch('map/registrosIncidencias', {token}),

        registrosAlarmas: (token: string) => store.dispatch('map/registrosAlarmas', {token}),

        registroCalidadAireInfo:(id: string) => store.dispatch('map/registroCalidadAireInfo', {id}),

        registroIncidenciaInfo:(id: string) => store.dispatch('map/registroIncidenciaInfo',{id}),

        registroAlarmaInfo:(token: string, id: string) => store.dispatch('map/registroAlarmaInfo',{token, id}),

        nuevaIncidencia: (token: string, nombre: string, tipo: string, coordenadas: string, imagen: File, descripcion: string, bbox: number[]) => 
        store.dispatch('map/nuevaIncidencia', {token, nombre, tipo, coordenadas, imagen, descripcion, bbox }),

        nuevaIncidenciaAdmin: (token: string, nombre_es: string, nombre_en: string, tipo: string, coordenadas: string, imagen: File, descripcion_es: string, descripcion_en: string, bbox: number[]) => 
        store.dispatch('map/nuevaIncidenciaAdmin', {token, nombre_es, nombre_en, tipo, coordenadas, imagen, descripcion_es, descripcion_en, bbox }),

        nuevaAlarma: (token: string, nombre: string, rango: number, coordenadas: string, bbox: number[]) => 
        store.dispatch('map/nuevaAlarma', {token, nombre, rango, coordenadas, bbox}),

        updateIncidencia: (token: string, id: string, nombre_es: string, nombre_en: string, tipo: string, coordenadas: string, imagen: File | undefined, descripcion_es: string, descripcion_en: string, validada: boolean, bbox: number[]) => 
        store.dispatch('map/updateIncidencia', {token, id, nombre_es, nombre_en, tipo, coordenadas, imagen, descripcion_es, descripcion_en, validada, bbox }),

        resetAlarma: (token: string, id: string) => store.dispatch('map/resetAlarma', {token, id}),

        deleteIncidencia: (token: string, id: string, validada: boolean, nombre: string) => store.dispatch('map/deleteIncidencia', { token, id, validada, nombre}),

        deleteAlarma: (token: string, id: string) => store.dispatch('map/deleteAlarma', { token, id }),

        //  MUTATIONS //
        setBaseMap: (map: { id: number, name_es: string, name_en: string }) => store.commit('map/setBaseMap', map),

        resetLayersControl: () => store.commit('map/resetLayersControl'),

        setSublayersControl_4: () => store.commit('map/setSublayersControl_4'),

        resetSublayersControl_4: () => store.commit('map/resetSublayersControl_4'),

        setSublayersControl_5: () => store.commit('map/setSublayersControl_5'),

        resetSublayersControl_5: () => store.commit('map/resetSublayersControl_5'),

        resetElementInfoID: () => store.commit('map/resetElementInfoID'),

        resetLast_registroInfoIDlayer: () => store.commit('map/resetLast_registroInfoIDlayer'),

        clearMapResponse: () => store.commit('map/clearMapResponse'),

        resetregistrosAlarmas: () => store.commit('map/resetregistrosAlarmas'),

        setElementoInfoID: (id: number | undefined) => store.commit('map/setElementoInfoID', id),

    }
}