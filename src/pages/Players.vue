<template>
    <div class="contents">
      <div class="contents__search">
        <search-input v-model="searchQuery" />
      </div>
      <div class="contents__header">
        <div class="page-name">Players</div>
        <div class="players-sort">
          <sort-select
            v-model="selectedPosition"
            :options="positionOptions"
            class="players-sort"
          ></sort-select>
          <sort-select
            v-model="selectedYear"
            :options="yearOptions"
            class="players-sort"
          ></sort-select>
          <sort-select
            v-model="selectedSort"
            :options="sortOptions"
            class="players-sort"
          ></sort-select>
        </div>
      </div>
      <players-list :players="sortedAndSearchedPlayers" :teams="teams" v-if="!isPlayerLoading" />
      <div class="loading" v-else>
        <div class="loading__text">Loading...</div>
        <img class="loading__img" src="@/assets/svg/loading.svg" />
      </div>
    </div>
</template>

<script>
import axios from "axios";
import PlayersList from "@/components/PlayersList.vue";

export default {
  components: {
    PlayersList,
  },
  data() {
    return {
      players: [],
      teams: [],
      isPlayerLoading: false,
      selectedYear: "2021",
      selectedSort: "lastName",
      reverseSort: false,
      selectedPosition: "",
      searchQuery: "",
      yearOptions: [
        { value: "2021", name: "2021" },
        { value: "2020", name: "2020" },
        { value: "2019", name: "2019" },
        { value: "2018", name: "2018" },
        { value: "2017", name: "2017" },
        { value: "2016", name: "2016" },
      ],
      sortOptions: [
        { value: "firstName", name: "First Name", reverse: false },
        { value: "lastName", name: "Last Name", reverse: false },
        { value: "jersey", name: "Jersey", reverse: false },
        { value: "heightMeters", name: "Height", reverse: true },
      ],
      positionOptions: [
        { value: "", name: "All" },
        { value: "F", name: "F" },
        { value: "G", name: "G" },
        { value: "C", name: "C" },
        { value: "F-C", name: "F-G" },
        { value: "F-C", name: "F-C" },
        { value: "G-F", name: "G-F" },
        { value: "C-F", name: "C-F" },
      ],
    };
  },
  methods: {
    async fetchPlayers(year) {
      try {
        this.isPlayerLoading = true;
        const response = await axios.get(
          "https://data.nba.net/data/10s/prod/v1/" + year + "/players.json"
        );
        this.players = response.data.league.standard;
        console.log(this.players[0]);
      } catch (e) {
        console.log(e);
      } finally {
        this.isPlayerLoading = false;
      }
    },
    async fetchTeams(year) {
      try {
        const response = await axios.get(
          "https://data.nba.net/data/10s/prod/v1/" + year + "/teams.json"
        );
        this.teams = response.data.league.standard;
        console.log(this.teams[0])
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.fetchPlayers("2021");
    this.fetchTeams("2021");
  },
  computed: {
    filteredPlayers() {
      if(this.selectedPosition != ""){
        return this.players.filter((player) =>
          player.pos.toLowerCase() == (this.selectedPosition.toLowerCase())
        );
      }
      else return this.players
    },
    sortedPlayers() {
      this.sortOptions.forEach(sortOption => {
        if(sortOption.value == this.selectedSort && sortOption.reverse) this.reverseSort = true; else this.reverseSort = false
      });
      if(this.reverseSort){
        return [...this.filteredPlayers].sort((player1, player2) =>
          player1[this.selectedSort]?.localeCompare(player2[this.selectedSort])
        ).reverse();
      }
      else{
        return [...this.filteredPlayers].sort((player1, player2) =>
          player1[this.selectedSort]?.localeCompare(player2[this.selectedSort])
        );
      }
    },
    sortedAndSearchedPlayers() {
      return this.sortedPlayers.filter((player) =>
        (player.lastName + player.firstName).toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    selectedYear(newValue) {
      this.fetchPlayers(newValue);
      this.fetchTeams(newValue);
    },
  },
};
</script>

<style>

.contents {
  display: flex;
  flex-direction: column;
}

.contents__search {
  margin-right: 50px;
  align-self: flex-end;
}

.loading {
  margin: 50px;
  font-size: 24px;
}

.contents__header {
  margin-top: 30px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.page-name {
  font-size: 48px;
  font-weight: bold;
  color: #212121;

  margin-top: 25px;
}

.players-sort {
  margin-right: 25px;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading__text {
  font-size: 36px;
  font-weight: bold;
  color: #6a6a6a;
  margin: 50px;
}

.loading__img {
  width: 300px;
  opacity: 90%;
}
</style>