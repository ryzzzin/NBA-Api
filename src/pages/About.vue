<template>
  <div class="content__main">
    <div class="page-name">About</div>
    <div class="about">
      <p class="about-desc">
        This project was created with
        <a class="vue-link" href="https://vuejs.org/" target="_blank">Vue</a> using the
        <a href="https://nba.com" target="_blank">
            <span class="letter--blue">N</span>B<span class="letter--red">A</span>
        </a>
        -API to create a client-side user interface for NBA basketball league
        data.
      </p>
      <img src="@/assets/svg/about-this-project.svg" class="page-img">
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content__main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-name {
  font-size: 48px;
  font-weight: bold;
  color: #212121;
  align-self: flex-start;
  margin-top: 25px;
}

.about {
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 100px;
}

.about-desc {
  font-size: 26px;
  width: 54%;
  color: #212121;
  text-align: center;
}

.vue-link {
  color: #41b883;
}

a{
  color: #c4c4c4;
}

.letter--blue {
  color: #006bb7;
}
.letter--red {
  color: #ed174b;
}

.page-img{
  height: 200px;
  margin-top: 60px;
  opacity: 90%;
  transition: 0.5s;
}

.page-img:hover{
  height: 220px;
  transition: 0.5s;
}
</style>