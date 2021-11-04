<template>
  <div>
    <div id="players-container" v-if="players.length > 0">
      <div class="players" v-for="player in players.slice(0,30)" v-bind:key="player.playerId">
        <div class="card--player">
          <div class="card--player__contents">
            <div class="contents__main">
              <div class="player-logo">
                <img class="player-logo__img" :src="getPlayerLogo(player.personId)" alt="Player's Logo">
              </div>
              <div class="player-names">
                <div class="player-names--cityname">
                  <div>
                    <p>{{ player.firstName }}</p>
                  </div>
                  <div>
                    <strong>{{ player.lastName }}</strong>
                  </div>
                </div>
                <div class="player-names--fullname">
                  <div>
                    <i>
                      <a>{{ getTeamName(player.teamId) }}</a>
                    </i>
                  </div>
                </div>
              </div>
            </div>
            <div class="player-specs">
              <div class="line vl--player"></div>
              <div class="specs">
                <div class="spec">
                  <img class="spec__icon" src="../assets/icons/height.svg" alt="Height Icon"/>
                  <div class="spec__text">{{ player.heightFeet + "'" + player.heightInches + "\""}}</div>
                </div>
                <div class="spec">
                  <img class="spec__icon" src="../assets/icons/weight.svg" alt="Weigth Icon"/>
                  <div class="spec__text">{{ player.weightPounds }}</div>
                </div>
                <div class="spec">
                  <img class="spec__icon" src="../assets/icons/pos.svg" alt="Position Icon"/>
                  <div class="spec__text">{{ player.pos }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-players" v-else>
      <div class="no-players__text">Sorry, there are no players found...</div>
      <img class="no-players__img" src="../assets/svg/not-found.svg">
      </div>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array,
      required: true,
    },
    teams:{
      type: Array,
      required: true
    }
  },
  methods:{
    getPlayerLogo(personId){
      return 'https://avatars.dicebear.com/api/big-ears-neutral/' + personId + '.svg';
    },
    getTeamName(teamId){
      var teamName = "";
      this.teams.forEach(team => {
        if(team.teamId == teamId) teamName = team.fullName
      });
      return teamName;
    }
  }
};
</script>

<style scoped>


#players-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  min-height: 200px;
  margin: 0 0 30px 0;
}

.card--player {
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

.card--player__contents {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.contents__main {
  display: flex;
  flex-direction: row;
}

.player-logo {
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

.player-logo__img{
  width: 100%;
  border-radius: 50%;
}

.player-names {
  margin: auto;
}

.player-names--cityname {
  font-size: 34px;
  line-height: 115%;

  color: #212121;
}

.player-names--fullname {
  margin-top: 14px;

  font-size: 22px;

  color: #6a6a6a;
}

.line {
  border-left: 2px solid #c4c4c4;
}

.player-specs {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vl--player {
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

.no-players{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-players__text{
  font-size: 36px;
  font-weight: bold;
  color: #6a6a6a;
  margin: 50px;
}

.no-players__img{
  width: 300px;
  opacity: 90%;
}

</style>