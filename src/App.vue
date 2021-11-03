<template>
  <div class="app">
    <navbar />
    <router-view></router-view>
    <help />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Help from "@/components/Help.vue";
  export default {
    components:{
      Navbar, Help
    }
  }

        Navbar</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: Arial, Helvetica, sans-serif;
}

body {
  position: relative;
  background: url("assets/pattern.jpg"), #f6f6f6;
  background-blend-mode: soft-light, normal;
  background-size: 31%;
}

</style>