<template>

    <div class="page">
        <p>VISOR LA PALMA</p>        
        <Mapa />
    </div>

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

<style lang="scss" scoped>
    
.page{
    height: 100vh;
    align-items: center;
    justify-content: center;
    background:  rgb(4,78,157);
    background: linear-gradient(
        0deg,
        rgba(4,78,157,1) 0%,
        rgba(0,174,255,1)100%
    );
    margin: 0;
}
</style>
