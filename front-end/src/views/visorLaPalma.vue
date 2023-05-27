<template>
    <h1>VISOR LA PALMA</h1>

    <Mapa />

</template>

<script lang="ts">

    import { defineComponent } from 'vue';

    import Mapa from '@/components/mapa/Mapa.vue'

    export default defineComponent({
        name: 'Visor la Palma',
        components:{
            Mapa
        }
    });

</script>
