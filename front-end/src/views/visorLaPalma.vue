<template>
    <div class="page" id="grid-Map">         
        <Mapa />
        <ControlLayers />
    </div>
</template>

<script lang="ts">

    import { defineComponent } from 'vue';

    import Mapa from '@/components/mapa/Mapa.vue'
    import ControlLayers from '@/components/controlLayers/ControlLayers.vue'

    export default defineComponent({
        name: 'Visor la Palma',
        components:{
            Mapa,
            ControlLayers
        }
    });

</script>

<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";

    #grid-Map{
        display: grid;
        grid-template-columns: 50% 50%;
    }

</style>
