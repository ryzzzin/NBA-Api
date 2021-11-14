<template>
    <div class="contents">
        <!-- <div class="contents__search">
            <search-input v-model="searchQuery" />
        </div> -->
        <div v-if="isTeamsFetched">
            <div class="contents__header">
                <div class="page-name">{{ getTeam.city + ' ' + getTeam.nickname }} Games</div>
            </div>
            <div class="matches">
                <details class="details" :open="(cUpcomingMatches.length <= 0) ? true : false">
                    <summary class="summary">Past matches</summary>
                    <div class="game-cards" v-for="match in cPastMatches" :key="match.gameId">
                        <div class="game-card">
                            <div class="card__top">
                                <div class="game-date">
                                    {{ getDate(match.match.startTimeUTC) }}
                                </div>
                                <div class="top__center">
                                    <div class="team-abbr team-abbr--home">
                                        {{ match.hTeam.tricode }}
                                    </div>
                                    <div class="game-time">
                                        {{ match.match.startTimeEastern }}
                                    </div>
                                    <div class="team-abbr team-abbr--visitor">
                                        {{ match.vTeam.tricode }}
                                    </div>
                                </div>
                                <div class="game-year">
                                    {{ match.match.seasonId.substring(1) }}
                                </div>
                            </div>
                            <div class="hl hl--card"></div>
                            <div class="card__bottom">
                                <div class="team-info team-info--home">
                                    <div class="team-logo logo--home">
                                        <img
                                        class="team-logo__img"
                                        :src="getTeamLogo(match.hTeam.teamId)"
                                        alt="Team's Logo"
                                        />
                                    </div>
                                    <router-link class="team-name" :to="'/teams/' + match.hTeam.urlName + ((year) ? ('?year=' + year) : '')">
                                        <div class="team-name--cityname">
                                            <p>{{ match.hTeam.city }}</p>
                                        </div>
                                        <div class="team-name--nickname">
                                            <strong>{{ match.hTeam.nickname }}</strong>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="game-results">
                                    <div class="results__outcome" :class="isHomeTeamWon(match.match) ? 'win' : 'loose'" >
                                        {{ isHomeTeamWon(match.match) ? 'W' : 'L' }}
                                    </div>
                                    <div class="results__score">
                                        {{ getScore(match.match) }}
                                    </div>
                                    <div class="results__outcome" :class="isHomeTeamWon(match.match) ? 'loose' : 'win'">
                                        {{ isHomeTeamWon(match.match) ? 'L' : 'W' }}
                                    </div>
                                </div>
                                <div class="team-info team-info--visitor">
                                    <router-link class="team-name" :to="'/teams/' + match.vTeam.urlName + ((year) ? ('?year=' + year) : '')">
                                        <div class="team-name--cityname">
                                            <p>{{ match.vTeam.city }}</p>
                                        </div>
                                        <div class="team-name--nickname">
                                            <strong>{{ match.vTeam.nickname }}</strong>
                                        </div>
                                    </router-link>
                                    <div class="team-logo logo--visitor">
                                        <img
                                        class="team-logo__img"
                                        :src="getTeamLogo(match.vTeam.teamId)"
                                        alt="Team's Logo"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hl hl--details"></div>
                </details>
                <details class="details" open v-if="cUpcomingMatches.length > 0">
                    <summary class="summary">Upcoming matches</summary>
                    <div class="game-cards" v-for="match in cUpcomingMatches" :key="match.gameId">
                        <div class="game-card">
                            <div class="card__top">
                                <div class="game-date">
                                    {{ getDate(match.match.startTimeUTC) }}
                                </div>
                                <div class="top__center">
                                    <div class="team-abbr team-abbr--home">
                                        {{ match.hTeam.tricode }}
                                    </div>
                                    <div class="game-time">
                                        {{ match.match.startTimeEastern }}
                                    </div>
                                    <div class="team-abbr team-abbr--visitor">
                                        {{ match.vTeam.tricode }}
                                    </div>
                                </div>
                                <div class="game-year">
                                    {{ match.match.seasonId.substring(1) }}
                                </div>
                            </div>
                            <div class="hl hl--card"></div>
                            <div class="card__bottom">
                                <div class="team-info team-info--home">
                                    <div class="team-logo logo--home">
                                        <img
                                        class="team-logo__img"
                                        :src="getTeamLogo(match.hTeam.teamId)"
                                        alt="Team's Logo"
                                        />
                                    </div>
                                    <router-link class="team-name" :to="'/teams/' + match.hTeam.urlName">
                                        <div class="team-name--cityname">
                                            <p>{{ match.hTeam.city }}</p>
                                        </div>
                                        <div class="team-name--nickname">
                                            <strong>{{ match.hTeam.nickname }}</strong>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="game-results">
                                    <div class="results__score">
                                        Upcoming
                                    </div>
                                </div>
                                <div class="team-info team-info--visitor">
                                    <router-link class="team-name" :to="'/teams/' + match.vTeam.urlName">
                                        <div class="team-name--cityname">
                                            <p>{{ match.vTeam.city }}</p>
                                        </div>
                                        <div class="team-name--nickname">
                                            <strong>{{ match.vTeam.nickname }}</strong>
                                        </div>
                                    </router-link>
                                    <div class="team-logo logo--visitor">
                                        <img
                                        class="team-logo__img"
                                        :src="getTeamLogo(match.vTeam.teamId)"
                                        alt="Team's Logo"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
        <div class="loading" v-else>
            <div class="loading__text">Loading...</div>
            <img class="loading__img" src="@/assets/svg/loading.svg" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            year: "2021",
            currentSeason: "2021",
            teams: [],
            matches: [],
            isTeamsFetched: false,
            isTeamLoading: false,
            // searchQuery: ''
        }
    },
    methods:{
        async fetchTeams(year) {
            this.isTeamLoading = true;
            axios
                .get("https://data.nba.net/data/10s/prod/v1/" + year + "/teams.json")
                .then((response) => {
                    this.teams = response.data.league.standard;

                    this.isTeamLoading = false;
                    this.isTeamsFetched = true;
                    console.log(this.teams)
                });
        },
        fetchMatches(year){
            this.matches = []
            axios
                .get("https://data.nba.net/data/10s/prod/v1/" + year + "/teams/" + this.$route.params.urlName + "/schedule.json")
                .then((response) => {
                    this.matches = response.data.league.standard
                    console.log(this.matches)
                })
        },
        isHomeTeamWon(match){
            return (parseInt(match.hTeam.score) > parseInt(match.vTeam.score));
        },
        getDate(dateStr){
            const date = new Date(dateStr);
            return date.toLocaleString('default', { month: 'short'}) + " " + date.getDate()
        },
        getScore(match){
            return match.hTeam.score + "-" + match.vTeam.score;
        },
        getPastMatches(){
            var previewMatches = [];
            var matches = (this.matches).filter(match => match.statusNum == 3).reverse();
            var hTeam = null;
            var vTeam = null;
            var isHTeamFound = false;
            var isVTeamFound = false;
            var BreakException = {};
            matches.forEach(match => {
                this.teams.forEach(team => {
                    try{
                        if(isHTeamFound && isVTeamFound) throw BreakException;

                        if(team.teamId == match.hTeam.teamId){
                            hTeam = team;
                            isHTeamFound = true;
                        }
                        else if(team.teamId == match.vTeam.teamId){
                            vTeam = team;
                            isVTeamFound = true;
                        }
                    }
                    catch(e){
                        if(e !== BreakException) throw e;
                    }
                })
                isVTeamFound = false;
                isHTeamFound = false;
                previewMatches.push({match, hTeam, vTeam});
            })
            return previewMatches;
        },
        getUpcomingMatches(){
            var previewMatches = [];
            var matches = (this.matches).filter(match => match.statusNum !== 3);
            var hTeam = null;
            var vTeam = null;
            var isHTeamFound = false;
            var isVTeamFound = false;
            var BreakException = {};
            matches.forEach(match => {
                this.teams.forEach(team => {
                    try{
                        if(isHTeamFound && isVTeamFound) throw BreakException;

                        if(team.teamId == match.hTeam.teamId){
                            hTeam = team;
                            isHTeamFound = true;
                        }
                        else if(team.teamId == match.vTeam.teamId){
                            vTeam = team;
                            isVTeamFound = true;
                        }
                    }
                    catch(e){
                        if(e !== BreakException) throw e;
                    }
                })
                isVTeamFound = false;
                isHTeamFound = false;
                previewMatches.push({match, hTeam, vTeam});
            })
            return previewMatches;
        },
        getTeamLogo(teamId) {
            return "https://avatars.dicebear.com/api/jdenticon/" + teamId + ".svg";
        },
    },
    mounted(){
        if(this.$route.query.year) this.year = this.$route.query.year;
        this.fetchTeams(this.year);
        this.fetchMatches(this.year);
    },
    watch:{
        '$route'(){
            this.fetchTeams(this.year);
            this.fetchMatches(this.year);
        }
    },
    computed:{
        getTeam(){
            var resTeam = {};
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
        cPastMatches(){
            return this.getPastMatches();
        },
        cUpcomingMatches(){
            return this.getUpcomingMatches();
        }
    }
}
</script>

<style scoped>

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

.hl {
  border-bottom: 2px solid #c4c4c4;
  align-self: center;
}

.hl--card{
    width: 100%;
    margin: 10px 0 10px 0;
}

.hl--details{
    width: 1030px;
    margin: 60px 0 20px 0;
}

.matches{
    margin-bottom: 100px;
}

.game-cards{

}

.game-card{
    display: flex;
    flex-direction: column;

    background: #f6f6f6;
    border: 2px solid #c4c4c4;
    box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    text-decoration: none;

    align-items: center;

    padding: 13px 22px 13px 22px;
    margin: 20px 0 20px 0;
    width: 1000px;
    height: 200px;
    
    transition: 0.1s;
}

.game-card:hover{
    background: #e9e9e9;
    transition: 0.2s;
}

.card__top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    width: 98%;
    height: 55px;

    font-size: 24px;
    color: #6a6a6a;
}

.game-date{
    font-weight: bold;
}

.team-abbr{
    color: #c4c4c4;
    font-weight: bold;
}

.game-time{
    margin: 0 45px 0 45px;

    font-weight: bold;
}

.game-year{
    color: #c4c4c4;
    font-weight: bold;
}

.top__center{
    display: flex;
    flex-direction: row;
}

.card__bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 100%;

    color: #6a6a6a;
}

.bottom__center{
    display: flex;
    flex-direction: row;
}

.team-info{
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 340px;
}

.details{
    margin-top: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.summary{
    font-size: 24px;
    font-weight: bold;
    color: #6a6a6a;
}

.team-info--visitor{
    justify-content: flex-end;
}

.team-name{
    margin-top: 5px;
}

.team-logo {
    width: 100px;
    height: 100px;

    background: #ececec;
    box-shadow: 2px 4px 5px 1px rgba(0, 0, 0, 0.25);
    border-radius: 88px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.logo--home{
    margin-right: 24px;
}

.logo--visitor{
    margin-left: 24px;
}

.team-logo__img{
    height: 50px;
}

.team-info--home{
    text-align: start;
}

.team-info--visitor{
    text-align: end;
}

.team-name{
    font-size: 30px;
    color: #6a6a6a
}

.game-results{
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    font-size: 30px;
    font-weight: bold;

    margin: 0 20px 0 20px;
}

</style>