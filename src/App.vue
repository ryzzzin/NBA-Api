<template>
  <div>
    <navbar></navbar>
    <div class="contents">
      <teams-list :teams="teams"></teams-list>
    </div>
    <help></help>
  </div>
  <router-view/>
</template>

<script>

  import TeamsList from './components/TeamsList.vue';
  import axios from 'axios';
  import Navbar from './components/Navbar.vue';
  import Help from './components/Help.vue'
  export default {
    components:{
      TeamsList, Navbar, Help
    },
    data(){
      return{
        teams:[]
      }
    },
    methods:{
      async fetchTeams(){
        try{
          const response = await axios.get('https://www.balldontlie.io/api/v1/teams?per_page=10');
          this.teams = response.data.data;
        }
        catch(e){
          console.log("Error");
        }
      }
    },
    mounted(){
      this.fetchTeams();
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
  body{
    position: relative;
    background: url('assets/pattern.jpg'), #F6F6F6;
    background-blend-mode: soft-light, normal;
    background-size: 31%;
  }
  .contents{
    margin-left: 330px
  }
</style>