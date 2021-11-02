<template>
  <div>
    <navbar></navbar>
    <div class="contents">
      <div class="contents__search">
        <search-input v-model="searchQuery"/>
      </div>
      <div class="contents__header">
        <div class="page-name">Teams</div>
        <div class="teams-sort">
           <sort-select v-model="selectedYear" :options="yearOptions" class="teams-sort"></sort-select>
           <sort-select v-model="selectedSort" :options="sortOptions" class="teams-sort"></sort-select>
        </div>
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
        selectedYear: '2021',
        selectedSort: '',
        searchQuery: '',
        yearOptions: [
          {value: '2021', name: "2021"},
          {value: '2020', name: "2020"},
          {value: '2019', name: "2019"},
          {value: '2018', name: "2018"},
          {value: '2017', name: "2017"},
          {value: '2016', name: "2016"}
        ],
        sortOptions: [
          {value: 'tricode', name: "Tricode"},
          {value: 'confName', name: "Conference"},
          {value: 'divName', name: "Division"},
          {value: 'nickname', name: "Name"},
        ]
      }
    },
    methods:{
      async fetchPlayers(){
        try{
          const response = await axios.get('https://data.nba.net/data/10s/prod/v1/2021/players.json');
          this.players = response.data.league.standard;
          console.log(this.players[0]);
        } catch(e){
          console.log(e);
        }
      },
      async fetchTeams(year){
        try{
          const response = await axios.get('https://data.nba.net/data/10s/prod/v1/' + year + '/teams.json');
          this.teams = response.data.league.standard;
          console.log(this.teams);
        } catch(e){
          console.log(e);
        }
      }
    },
    mounted(){
      this.fetchPlayers();
      this.fetchTeams('2021');
    },
    computed:{
      sortedTeams(){
        return[...this.teams].sort((team1, team2) => team1[this.selectedSort]?.localeCompare(team2[this.selectedSort]))
      },
      sortedAndSearchedTeams(){
        return this.sortedTeams.filter(team => team.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    watch:{
      selectedYear(newValue){
        this.fetchTeams(newValue);
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
    display: flex;
    flex-direction: column;
  }

  .contents__search{
    margin-right: 50px;
    align-self: flex-end;
  }

  .loading{
    margin: 50px;
    font-size: 24px;
  }

  .contents__header{
    margin-top: 30px;

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