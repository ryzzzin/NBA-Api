<template>
  <div>
    <div v-if="!isTeamLoading">
      <div v-if="team" class="card">
        <div class="card__top">
          <div class="contents__main">
            <div class="team-logo">
              <img
                class="team-logo__img"
                :src="getTeamLogo(team.teamId)"
                alt="Team's Logo"
              />
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
            <div class="vl vl--specs"></div>
            <div class="specs">
              <div class="spec">
                <img
                  class="spec__icon"
                  src="../assets/icons/abbr.svg"
                  alt="Abbreviation Icon"
                />
                <div class="spec__text">{{ team.tricode }}</div>
              </div>
              <div class="spec">
                <img
                  class="spec__icon"
                  src="../assets/icons/conf.svg"
                  alt="Conference Icon"
                />
                <div class="spec__text">{{ team.confName }}</div>
              </div>
              <div class="spec">
                <img
                  class="spec__icon"
                  src="../assets/icons/div.svg"
                  alt="Division Icon"
                />
                <div class="spec__text">{{ team.divName }}</div>
              </div>
            </div>
          </div>
          <default-button class="teams-button">Go to all teams</default-button>
        </div>
        <div class="hl hl--team"></div>
        <div class="card__bottom">
          <div class="card-bottom__container roaster">
            <div class="card-bottom-container__header">Roaster</div>
            <div class="roaster__players">
              <div class="player">
                <div class="player__position">G</div>
                <div class="player__name">Russel Westbrook</div>
              </div>
              <div class="player">
                <div class="player__position">G</div>
                <div class="player__name">Russel Westbrook</div>
              </div>
              <div class="player">
                <div class="player__position">CF</div>
                <div class="player__name">Russel Westbrook</div>
              </div>
              <div class="player">
                <div class="player__position">G</div>
                <div class="player__name">Russel Westbrook</div>
              </div>
              <div class="player">
                <div class="player__position">GF</div>
                <div class="player__name">Russel Westbrook</div>
              </div>
              <div class="player">
                <div class="player__position">G</div>
                <div class="player__name">Thanasis Antetokounmpo</div>
              </div>
              <div class="player">
                <div class="player__position">G</div>
                <div class="player__name">Russel Westbrook</div>
              </div>
            </div>
          </div>
          <div class="vl vl--bottom-containers"></div>
          <div class="card-bottom__container last-matches">
            <div class="card-bottom-container__header">Last Matches</div>
            <div class="matches">
              <div class="match">
                <div class="match__date-home">
                  <div class="match-date">Aug 08</div>
                  <div class="match-home away">AWAY</div>
                </div>
                <div class="match__opponent">
                  <div class="opponent__city">Phoenix</div>
                  <div class="opponent__name">Suns</div>
                </div>
                <div class="match__results">
                  <div class="results__outcome win">W</div>
                  <div class="results__score">73-72</div>
                </div>
              </div>
              <div class="hl hl--matches"></div>
            </div>
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
      teams: [],
      team: null,
      isTeamLoading: false,
    };
  },
  methods: {
    async fetchTeams(year) {
      this.isTeamLoading = true;
      axios
        .get("https://data.nba.net/data/10s/prod/v1/" + year + "/teams.json")
        .then((response) => {
          this.teams = response.data.league.standard;
          var BreakException = {};
          try {
            this.teams.forEach((team) => {
              if (team.urlName == this.$route.params.urlName) {
                this.team = team;
                throw BreakException;
              }
            });
          } catch (e) {
            if (e !== BreakException) throw e;
          }
          this.isTeamLoading = false;
        });
    },
    getTeamLogo(teamId) {
      return "https://avatars.dicebear.com/api/jdenticon/" + teamId + ".svg";
    },
  },
  mounted() {
    this.fetchTeams("2021");
  },
};
</script>

<style scoped>
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

  /* width: 95%; */
  width: 1500px;
  height: 765px;
}

.card__top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 225px;
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
  margin-left: 100px;
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
  height: 85%;
}

.card-bottom__container {
  display: flex;
  flex-direction: column;
}

.roaster {
  width: 780px;
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
}

.player {
  width: 50%;
  font-size: 24px;
  color: #6a6a6a;

  margin: 10px 0 0 0;

  display: flex;
  flex-direction: row;
}

.player__position {
  font-weight: bold;
  width: 55px;
}

/* .player__name {

} */

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
}

.opponent__city{

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

  font-weight: bold;
}

.hl--matches {
  margin: 15px 0 15px 0;
  width: 610px;
}
</style>