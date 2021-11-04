<template>
  <div class="content__main">
    <div class="page-name">About</div>
    <div class="about">
      <div class="about-preview">
        <img
          class="about-preview-img"
          src="@/assets/images/about.jpeg"
          alt=""
        />
        <div class="about-preview-info">
          <h1 class="about-header">About this project</h1>
          <p class="about-desc">
            This project was created with
            <a class="vue-link" href="https://vuejs.org/" target="_blank">Vue</a> using the
            <a href="https://nba.com" target="_blank">
                <span class="letter--blue">N</span>B<span class="letter--red">A</span>
            </a>
            -API to create a client-side user interface for NBA basketball league
            data.
          </p>
        </div>
      </div>
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
  background: #212121;
  margin: 20px 0px;
  display: flex;
  width: 94%;
  position: relative;
}
.about-preview {
  width: 100%;
  height: 79vh;
  transition: 1s;
  display: flex;
  overflow: hidden;
}
.about-preview-img {
  object-fit: cover;
  width: 50%;
  height: 100%;
  transition: 1s;
}
.about-preview:hover .about-preview-img {
  width: 100%;
  height: 100%;
}
.about-preview-info {
  position: absolute;
  top: 15%;
  left: 60%;
}
.about-header {
  padding: 0px 10px;
  font-size: 55px;
  width: 85%;
  mix-blend-mode: lighten;
  background-blend-mode: multiply;
  background-color: white;
  color: black;
}
.about-desc {
  margin-top: 2%;
  font-size: 24px;
  padding: 15px;
  width: 85%;
  mix-blend-mode: lighten;
  background-blend-mode: multiply;
  background-color: black;
  color: white;
  text-align: end;
}

.vue-link {
  color: #41b883;
}

a{
    color: white;
}

.letter--blue {
  color: #006bb7;
}
.letter--red {
  color: #ed174b;
}
</style>