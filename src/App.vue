<template>
  <div>
    <navbar></navbar>
    <div class="contents">
      <div class="contents__search">
        <search-input v-model="searchQuery" placeholder="Search..."/>
      </div>
      <div class="contents__header">
        <div class="page-name">Teams</div>
        <sort-select v-model="selectedSort" :options="sortOptions" class="teams-sort"></sort-select>
      </div>
      <teams-list
        :teams="sortedAndSearchedTeams"
        v-if="!isTeamLoading"
      />
      <div class="loading" v-else>Loading...</div>
    </div>
    <help></help>
  </div>
  <!-- <router-view/> -->
</template>

<script>
  import axios from 'axios';
  import TeamsList from './components/TeamsList.vue';
  import Navbar from './components/Navbar.vue';
  import Help from './components/Help.vue'
  import SortSelect from './components/UI/SortSelect.vue';
  import SearchInput from './components/UI/SearchInput.vue';
  export default {
    components:{
      TeamsList, Navbar, Help,
        SortSelect,
        SearchInput
    },
    data(){
      return{
        teams:[],
        isTeamLoading: false,
        selectedSort: '',
        searchQuery: '',
        sortOptions: [
          {value: 'abbreviation', name: "Abbreviation"},
          {value: 'conference', name: "Conference"},
          {value: 'division', name: "Division"},
          {value: 'name', name: "Name"},
        ]
      }
    },
    methods:{
      async fetchTeams(){
        try{
          this.isTeamLoading = true;
          const response = await axios.get('https://www.balldontlie.io/api/v1/teams?per_page=10');
          this.teams = response.data.data;
        } catch(e){
          console.log("Error");
        } finally{
          this.isTeamLoading = false;
        }
      }
    },
    mounted(){
      this.fetchTeams();
    },
    computed:{
      sortedTeams(){
        return[...this.teams].sort((team1, team2) => team1[this.selectedSort]?.localeCompare(team2[this.selectedSort]))
      },
      sortedAndSearchedTeams(){
        return this.sortedTeams.filter(team => team.full_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
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
    margin-left: 330px;
    padding-top: 50px;
    padding-left: 50px;
  }
  .loading{
    margin: 50px;
    font-size: 24px;
  }

  .contents__header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .page-name{
    font-size: 48px;
    font-weight: bold;
    color: #212121;
    
    margin-top: 25px
  }

  .teams-sort{
    margin-right: 50px;
  }
</style>