<template>

<div class="app">
  <Header />
  <router-view/>
  <Footer />
</div>

</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount } from 'vue';
  import { useAuthStore } from "@/composables/useAuthStore";

  import Header from '@/components/header/Header.vue';
  import Footer from '@/components/footer/Footer.vue';

  export default defineComponent({
    components:{
      Header,
      Footer
    },
    setup(){

      const { 
            userAuthenticated,
            getUserToken,
            logout
        } = useAuthStore();


      const BeforeUnloadHandler = () => {
        if(userAuthenticated.value){
          logout(getUserToken.value)
        }
      }

      onBeforeUnmount(() => {
        window.removeEventListener('beforeunload',BeforeUnloadHandler)
      })

      window.addEventListener('beforeunload', BeforeUnloadHandler)
    }

  })
</script>


<style lang="scss">

  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

</style>
