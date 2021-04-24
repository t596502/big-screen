<template>
  <router-view/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
  html,body,#app{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
