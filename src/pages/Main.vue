<template>
    <div class="content__main">
        <div class="header">What do you want to see?</div>
        <div class="pages-links">
            <router-link :to="'/players'" class="pages-link">
                <img src="@/assets/svg/players.svg" class="page-img">
                <div class="page-name">Players</div>
            </router-link>
            <router-link :to="'/teams'" class="pages-link">
                <img src="@/assets/svg/teams.svg" class="page-img">
                <div class="page-name">Teams</div>
            </router-link>
            <router-link :to="'/games'" class="pages-link">
                <img src="@/assets/svg/games.svg" class="page-img">
                <div class="page-name">Games</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    div{
        color: #6a6a6a;
    }
    .header, .page-name{
        font-size: 48px;
        font-weight: bold;
    }
    .content__main{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .pages-links{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
    }

    .pages-link{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 5%;
        text-decoration-color: #6a6a6a;
    }

    .page-img{
        height: 27vh;
    }
</style>