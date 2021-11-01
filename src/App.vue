<template>
  <div>
    <teams-list :teams="teams"></teams-list>
  </div>
  <router-view/>
</template>

<script>

  import TeamsList from './components/TeamsList.vue';
  import axios from 'axios';
  export default {
    components:{
      TeamsList
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

<style scoped>

</style>