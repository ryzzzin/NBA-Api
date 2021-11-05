<template>
  <div class="app">
    <navbar />
    <router-view class="content"></router-view>
    <top-btn id="topBtn"/>
    <help />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Help from "@/components/Help.vue";
import TopBtn from "@/components/TopBtn.vue";

export default {
  components:{
    Navbar, Help, TopBtn
  },
  data(){
    return{
      topBtn: Object
    }
  },
  methods:{
    scrollFunction() {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        this.topBtn.style.display = "flex";
      } else {
        this.topBtn.style.display = "none";
      }
    }
  },
  mounted(){
    this.topBtn = document.getElementById("topBtn");
    window.onscroll = () => this.scrollFunction();
  }
}
</script>

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

.content{
  margin-left: 16.6%;
  padding-top: 50px;
  padding-left: 50px;
}

</style>