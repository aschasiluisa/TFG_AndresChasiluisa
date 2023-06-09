<script lang="ts" src="./Header.ts"></script>

<template>
  <header>
    <nav>
        <router-link to="/visorLaPalma" v-show="noIsCurrentRoute(`/visorLaPalma`)"> Visor la palma</router-link> 
        <router-link to="/visorLaPalma/login" v-show="!userAuthenticated && noIsCurrentRoute(`/visorLaPalma/login`)"> Login</router-link> 
        <router-link to="/visorLaPalma/signup" v-show="!userAuthenticated && noIsCurrentRoute(`/visorLaPalma/signup`)"> Signup</router-link> 
        <router-link to="/visorLaPalma/profile" v-show="userAuthenticated && noIsCurrentRoute(`/visorLaPalma/profile`)"> Profile</router-link>
        <p @click="logout" v-show="userAuthenticated">Logout</p>
    </nav>
  </header>
</template>

<style lang="scss">
    header {
        background-color: #333;
        color: #fff;
        padding: 20px;
    }
    nav {
        display: flex;
        justify-content: space-between;
    }
</style>