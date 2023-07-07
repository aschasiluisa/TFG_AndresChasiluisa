<script lang="ts" src="./Footer.ts"></script>

<template>
    <footer>
        <p>{{ $t('Footer') }}</p>
    </footer>
</template>

<style lang="scss">

    @import "@/css/globalStyles.scss";

    footer {
        text-align: center;
        align-items: center;
        height: 5%;
        background-color: $dark-color;
        color: $light-color;
        font-family: cambria Italic;
        padding-top: 0.6% ;
    }
</style>