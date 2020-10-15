<template>
  <div id="app" class="h-full w-full  bg-gray-200">
    <Wall></Wall>
  </div> 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Wall from '@/components/Wall.vue';

@Component({
  components: {
    Wall,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


body {
    background: #edf2f7;
}

</style>
