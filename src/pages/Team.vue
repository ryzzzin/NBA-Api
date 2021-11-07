<template>
  <div>
    <div v-if="!isTeamLoading">
      <div id="teams-container" v-if="teams">
        <div class="teams">
          <div class="card--team">
            <div class="card--team__contents">
              <div class="contents__main">
                <div class="team-logo">
                  <img class="team-logo__img" :src="getTeamLogo(team.teamId)" alt="Team's Logo">
                </div>
                <div class="team-names">
                  <div class="team-names--cityname">
                    <div>
                      <p>{{ team.city }}</p>
                    </div>
                    <div>
                      <strong>{{ team.nickname }}</strong>
                    </div>
                  </div>
                  <div class="team-names--fullname">
                    <div>
                      <i
                        ><a>{{ team.fullName }}</a></i
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="team-specs">
                <div class="line vl--team"></div>
                <div class="specs">
                  <div class="spec">
                    <img class="spec__icon" src="../assets/icons/abbr.svg" alt="Abbreviation Icon"/>
                    <div class="spec__text">{{ team.tricode }}</div>
                  </div>
                  <div class="spec">
                    <img class="spec__icon" src="../assets/icons/conf.svg" alt="Conference Icon"/>
                    <div class="spec__text">{{ team.confName }}</div>
                  </div>
                  <div class="spec">
                    <img class="spec__icon" src="../assets/icons/div.svg" alt="Division Icon"/>
                    <div class="spec__text">{{ team.divName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-teams" v-else>
        <div class="no-teams__text">Sorry, there are no teams found...</div>
        <img class="no-teams__img" src="../assets/svg/not-found.svg">
      </div>
    </div>
    <div class="loading" v-else>
      <div class="loading__text">Loading...</div>
      <img class="loading__img" src="@/assets/svg/loading.svg" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      teams: [],
      team: Object,
      isTeamLoading: false
    }
  },
  methods:{
    async fetchTeams(year) {
      this.isTeamLoading = true;
      axios.get(
          "https://data.nba.net/data/10s/prod/v1/" + year + "/teams.json"
        ).then(response => {
          this.teams = response.data.league.standard;
          var BreakException = {};
          try {
            this.teams.forEach(team => {
              if(team.urlName == this.$route.params.urlName) {
                this.team = team;
                throw BreakException;
              }
            })
          }
          catch(e){
            if (e !== BreakException) throw e;
          }
          this.isTeamLoading = false;
        }
      )
    },
    getTeamLogo(teamId){
      return 'https://avatars.dicebear.com/api/jdenticon/' + teamId + '.svg';
    }
  },
  mounted() {
    this.fetchTeams("2021");
  }
};
</script>

<style scoped>


#teams-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  min-height: 200px;
  margin: 0 0 30px 0;
}

.card--team {
  background: #f6f6f6;
  border: 2px solid #c4c4c4;
  box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.25);
  border-radius: 24px;

  display: flex;

  padding: 13px 22px 13px 22px;
  margin: 25px 25px 0px 0px;

  width: 735px;
  height: 192px;

  align-items: center;
}

.card--team__contents {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.contents__main {
  display: flex;
  flex-direction: row;
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

.team-logo__img{
  width: 110px;
}

.team-names {
  margin: auto;
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

.line {
  border-left: 2px solid #c4c4c4;
}

.team-specs {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vl--team {
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

.no-teams{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-teams__text{
  font-size: 36px;
  font-weight: bold;
  color: #6a6a6a;
  margin: 50px;
}

.no-teams__img{
  width: 300px;
  opacity: 90%;
}

</style>