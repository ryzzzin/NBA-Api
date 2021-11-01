<template>
  <div>
    <div id="teams-container">
      <div class="teams" v-for="team in teams" v-bind:key="team.id">
        <div class="card card--team">
          <div class="card--team__contents">
            <div class="contents__main">
              <div class="team-logo"></div>
              <div class="team-names">
                <div class="team-names--cityname">
                  <div>
                    <p>{{ team.city }}</p>
                  </div>
                  <div>
                    <strong>{{ team.name }}</strong>
                  </div>
                </div>
                <div class="team-names--fullname">
                  <div>
                    <i
                      ><a>{{ team.full_name }}</a></i
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="team-specs">
              <div class="line vl--team"></div>
              <div class="specs">
                <div class="spec">
                  <img class="spec__icon" src="../assets/icons/abbr.svg" />
                  <div class="spec__text">{{ team.abbreviation }}</div>
                </div>
                <div class="spec">
                  <img class="spec__icon" src="../assets/icons/conf.svg" />
                  <div class="spec__text">{{ team.conference }}</div>
                </div>
                <div class="spec">
                  <img class="spec__icon" src="../assets/icons/div.svg" />
                  <div class="spec__text">{{ team.division }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: Arial, Helvetica, sans-serif;
}

#teams-container{
  display: -webkit-flex;
  -webkit-flex-direction: row;
  -webkit-flex-wrap: wrap;
  width: 1605px;
  height: auto;
  min-height: 200px;
}

#teams-container .teams{
  -webkit-flex: 130px 1;
}

#teams-container .box.bigger {
    -webkit-flex: 330px 1;
}


.card {
  background: #f6f6f6;
  border: 2px solid #c4c4c4;
  box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.25);
  border-radius: 24px;

  display: flex;
}

.card--team {
  padding: 13px 22px 13px 22px;
  margin: 30px;

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

  background: #d6d6d6;
  box-shadow: 2px 4px 5px 1px rgba(0, 0, 0, 0.25);
  border-radius: 88px;
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


</style>