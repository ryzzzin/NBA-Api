<template>
  <div class="contents">
    <!-- <div class="contents__search">
      <search-input v-model="searchQuery" />
    </div> -->
    <div class="contents__header">
      <div class="page-name">Teams</div>
    </div>
    <div v-if="!isTeamLoading">
      <div v-if="getTeam" class="card">
        <div class="card__top">
          <div class="top-container">
            <div class="contents__main">
              <div class="team-logo">
                <img
                  class="team-logo__img"
                  :src="getTeamLogo(getTeam.teamId)"
                  alt="Team's Logo"
                />
              </div>
              <div class="team-names">
                <div class="team-names--cityname">
                  <div>
                    <p>{{ getTeam.city }}</p>
                  </div>
                  <div>
                    <strong>{{ getTeam.nickname }}</strong>
                  </div>
                </div>
                <div class="team-names--fullname">
                  <div>
                    <i
                      ><a>{{ getTeam.fullName }}</a></i
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="team-specs">
              <div class="vl vl--specs"></div>
              <div class="specs">
                <div class="spec">
                  <img
                    class="spec__icon"
                    src="../assets/icons/abbr.svg"
                    alt="Abbreviation Icon"
                  />
                  <div class="spec__text">{{ getTeam.tricode }}</div>
                </div>
                <div class="spec">
                  <img
                    class="spec__icon"
                    src="../assets/icons/conf.svg"
                    alt="Conference Icon"
                  />
                  <div class="spec__text">{{ getTeam.confName }}</div>
                </div>
                <div class="spec">
                  <img
                    class="spec__icon"
                    src="../assets/icons/div.svg"
                    alt="Division Icon"
                  />
                  <div class="spec__text">{{ getTeam.divName }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="top-container">
            <router-link to="/teams">
              <default-button class="teams-button">All teams</default-button>
            </router-link>
            <router-link :to="'/games/' + getTeam.urlName + ((year) ? ('?year=' + year) : '')">
              <default-button class="teams-button">All the matches</default-button>
            </router-link>
          </div>
        </div>
        <div class="hl hl--team"></div>
        <div class="card__bottom">
          <div class="card-bottom__container roaster">
            <div class="card-bottom-container__header">Roaster</div>
            <div class="roaster__players" v-if="getRoaster[0]">
              <div class="player" v-for="player in getRoaster" :key="player.personId">
                <div class="player__position"><u>{{ player.pos }}</u></div>
                <router-link class="player__name" :to="'/players/' + player.personId + ((year) ? ('?year=' + year) : '')">
                  {{ player.firstName + " " + player.lastName }}
                </router-link>
              </div>
            </div>
            <img class="loading-min" src="@/assets/gif/loading.gif" v-else>
          </div>
          <div class="vl vl--bottom-containers"></div>
          <div class="card-bottom__container last-matches">
            <div class="card-bottom-container__header">Last Matches</div>
            <div class="matches" v-if="cPreviewMatches[0]">
              <div class="matches-container" v-for="match in cPreviewMatches" :key="match.match.gameId">
                <div class="match">
                  <div class="match__date-home">
                    <div class="match-date">{{ getDate(match.match.startTimeUTC) }}</div>
                    <div class="match-home away" :style="{ background: match.match.isHomeTeam ? '#006BB7' : '#E7A423' }">
                      {{ match.match.isHomeTeam ? 'HOME' : 'AWAY' }}
                    </div>
                  </div>
                  <router-link class="match__opponent" :to="'/teams/' + match.team.urlName + ((year) ? ('?year=' + year) : '')">
                    <div class="opponent__city">{{ match.team.city }}</div>
                    <div class="opponent__name">{{ match.team.nickname }}</div>
                  </router-link>
                  <div class="match__results">
                    <div class="results__outcome " :class="isTeamWon(match.match) ? 'win' : 'loose'">
                      {{ isTeamWon(match.match) ? 'W' : 'L' }}
                    </div>
                    <div class="results__score">{{ getScore(match.match) }}</div>
                  </div>
                </div>
                <div class="hl hl--matches"></div>
              </div>
            </div>
            <img class="loading-min" src="@/assets/gif/loading.gif" v-else>
          </div>
        </div>
      </div>
      <div class="no-teams" v-else>
        <div class="no-teams__text">Sorry, there are no teams found...</div>
        <img class="no-teams__img" src="../assets/svg/not-found.svg" />
      </div>
    </div>
    <div class="loading" v-else>
      <div class="loading__text">Loading...</div>
      <img class="loading__img" src="@/assets/svg/loading.svg" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      year: "2021",
      teams: [],
      players: [],
      playersIds: [],
      matches: [],
      isTeamsFetched: false,
      isTeamLoading: false,
      searchQuery: ''
    };
  },
  methods: {
    async fetchTeams(year) {
      this.isTeamLoading = true;
      axios
        .get("https://data.nba.net/data/10s/prod/v1/" + year + "/teams.json")
        .then((response) => {
          this.teams = response.data.league.standard;

          this.isTeamLoading = false;
          this.isTeamsFetched = true;
        });
    },
    async fetchPlayers(year) {
      axios
        .get("https://data.nba.net/data/10s/prod/v1/" + year + "/players.json")
        .then(response => {
          this.players = response.data.league.standard;
        })
    },
    async fetchPlayersIds(year){
      this.playersIds = []
      axios
        .get("https://data.nba.net/data/10s/prod/v1/" + year + "/teams/" + this.$route.params.urlName + "/roster.json")
        .then((response) => {
          this.playersIds = response.data.league.standard.players;
        })
    },
    fetchMatches(year){
      this.matches = []
      axios
        .get("https://data.nba.net/data/10s/prod/v1/" + year + "/teams/" + this.$route.params.urlName + "/schedule.json")
        .then((response) => {
          this.matches = (response.data.league.standard).filter(match => match.statusNum == 3).reverse().splice(0, 5);
          console.log(this.matches)
        })
    },
    isTeamWon(match){
      var teamScore, opponentScore
      if(match.isHomeTeam){
        teamScore = parseInt(match.hTeam.score);
        opponentScore = parseInt(match.vTeam.score);
      }
      else{
        teamScore = parseInt(match.vTeam.score);
        opponentScore = parseInt(match.hTeam.score);
      }
      if (teamScore > opponentScore) return true;
      else return false;
    },
    getDate(dateStr){
      const date = new Date(dateStr);
      return date.toLocaleString('default', { month: 'short'}) + " " + date.getDate()
    },
    getScore(match){
      var teamScore, opponentScore
      if(match.isHomeTeam){
        teamScore = match.hTeam.score;
        opponentScore = match.vTeam.score;
      }
      else{
        teamScore = match.vTeam.score;
        opponentScore = match.hTeam.score;
      }
      return teamScore + "-" + opponentScore;
    },
    getPreviewMatches(){
      var previewMatches = [];
      var opponent = null;
      this.matches.forEach(match => {
        console.log(match)
        this.teams.forEach(team => {
          if(match.isHomeTeam) opponent = match.vTeam;
          else opponent = match.hTeam;

          if(team.teamId == opponent.teamId){
            previewMatches.push({match, team});
          }
        })
      })
      return previewMatches;
    },
    getTeamLogo(teamId) {
      return "https://avatars.dicebear.com/api/jdenticon/" + teamId + ".svg";
    },
  },
  mounted() {
    if(this.$route.query.year) this.year = this.$route.query.year;
    this.fetchTeams(this.year);
    this.fetchPlayers(this.year);
    this.fetchPlayersIds(this.year);
    this.fetchMatches(this.year);
  },
  watch:{
    '$route'(){
      this.fetchPlayersIds(this.year);
      this.fetchMatches(this.year);
    }
  },
  computed:{
    getTeam(){
      var resTeam = null;
      var BreakException = {};
      try{
        this.teams.forEach((team) => {
          if (team.urlName === this.$route.params.urlName) {
            resTeam = team;
            throw BreakException;
          }
        })
      } catch(e){
        if(e !== BreakException) throw e;
      }
      return resTeam;
    },
    getRoaster(){
      var roaster = [];
      var i = 0;
      var BreakException = {};
      try{
        this.players.forEach(player => {
          this.playersIds.forEach(playerId => {
            if (playerId.personId == player.personId) {
              roaster.push(player);
              i++;
            }
            if(i >= this.playersIds.length)
              throw BreakException;
          })
        })
      } catch(e){
        if(e !== BreakException) throw e;
      }
      return roaster;
    },
    cPreviewMatches(){
      return this.getPreviewMatches();
    }
  }
};
</script>

<style scoped>
.loading-min{
  height: 200px;
  width: 200px;
  align-self: center;
  margin: auto;
}

.card {
  background: #f6f6f6;
  border: 2px solid #c4c4c4;
  box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.25);
  border-radius: 24px;

  display: flex;
  flex-direction: column;

  padding: 13px 22px 13px 22px;
  margin: 25px 25px 0px 0px;

  align-items: center;

  width: 1500px;
  height: 765px;
}

.card__top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 225px;
}

.top-container{
  display: flex;
  flex-direction: row;
}

.contents__main {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 525px;
}

.team-logo {
  width: 165px;
  height: 165px;

  margin-right: 24px;

  background: #ececec;
  box-shadow: 2px 4px 5px 1px rgba(0, 0, 0, 0.25);
  border-radius: 88px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.team-logo__img {
  width: 110px;
}

.team-names {
  display: flex;
  flex-direction: column;
}

.team-names--cityname {
  font-size: 34px;
  line-height: 115%;

  color: #212121;
}

.team-names--fullname {
  margin-top: 14px;
  font-size: 22px;
  color: #6a6a6a;
}

.team-specs {
  display: flex;
  align-items: center;
  justify-content: center;
}

.teams-button{
  margin-right: 50px;
}

.vl {
  border-left: 2px solid #c4c4c4;
  align-self: center;
}

.hl {
  border-bottom: 2px solid #c4c4c4;
  align-self: center;
}

.vl--specs {
  height: 142px;
}

.spec {
  margin: 22px;
  width: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.spec__icon {
  width: 22px;
}

.spec__text {
  margin-left: 22px;

  color: #6a6a6a;
  font-size: 22px;
  line-height: 25px;
}

.no-teams {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-teams__text {
  font-size: 36px;
  font-weight: bold;
  color: #6a6a6a;
  margin: 50px;
}

.no-teams__img {
  width: 300px;
  opacity: 90%;
}

.hl--team {
  margin: 15px 0 40px 0;
  width: 1400px;
}

.card__bottom {
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 600px;
}

.vl--bottom-containers {
  height: 94%;
}

.card-bottom__container {
  display: flex;
  flex-direction: column;
}

.roaster {
  width: 780px;
}

.loading {
  margin: auto;
  font-size: 24px;

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
  width: 200px;
  opacity: 90%;
}

.last-matches {
  width: 720px;
}

.card-bottom-container__header {
  margin-left: 45px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #212121;
}

.roaster__players {
  display: flex;
  flex-flow: row wrap;
  padding-left: 20px;
  align-items: center;
}

.player {
  width: 50%;
  font-size: 24px;
  color: #6a6a6a;

  margin: 17px 0 0 0;

  display: flex;
  flex-direction: row;
}

.player__position {
  font-weight: bold;
  width: 65px;
}

.player__name {
  color: #6a6a6a;
}

.matches{
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  
}

.match{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 590px;

  font-size: 24px;
  color: #6a6a6a
}

.match__date-home{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.match-date{
  font-weight: bold;
}

.match-home{
  margin-top: 5px;

  font-size: 14px;
  font-weight: bold;

  color: #f6f6f6;
  border-radius: 13px;

  width: 70px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.away{
  background: #E7A423;
}

.home{
  background: #006BB7;
}

.match__opponent{
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #6a6a6a;
}

.opponent__name{
  font-weight: bold;
}

.match__results{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.results__outcome{
  font-size: 20px;
  font-weight: bold;

  border-radius: 50%;

  width: 35px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.win{
  color: #29670C;
  background: #41A114;
}

.loose{
  color: #7E2822;
  background: #C54239;
}

.results__score{
  margin-left: 20px;
  width: 90px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.hl--matches {
  margin: 15px 0 15px 0;
  width: 610px;
}
</style>