<template>
    <div class="navbar">
        <div class="logo">
            <span class="blue-letter">N</span><span class="white-letter">B</span><span class="red-letter">A</span><span class="white-letter">-API</span>
        </div>
        <div class="nav-btns" v-for="page in pages" :key="page.title">
            <div class="nav-btn"><div class="current-page-indicator" v-if="currentPage==page.title"></div> {{ page.title }}</div>
        </div>
        <div class="hl-navbar"></div>
        <div class="nav-btns" v-for="link in links" :key="link.title">
            <a class="nav-btn" :href="link.href" target="_blank">{{ link.title }}</a>
        </div>
    </div>
    <div class="navbar-bg"></div>
</template>

<script>
    export default {
        data(){
            return{
                pages:[
                    {title: 'Teams'},
                    {title: 'Players'},
                    {title: 'Games'},
                    {title: 'About'}
                ],
                links:[
                    {title: 'GitHub', href: 'https://github.com/ryzzzin/NBA-Api'},
                    {title: 'API', href: 'https://github.com/kshvmdn/nba.js/blob/master/docs/api/DATA.md'}
                ],
                currentPage: 'Teams'
            }
        }
    }
</script>

<style scoped>
.navbar{
    width: 280px;
    height: 100%;

    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;

    overflow-x: hidden;
    background: #212121;
    box-shadow: 4px 0px 6px 4px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
}
.navbar-bg{
    width: 35px;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 280px;
    overflow-x: hidden;
    background: #006bb7;
}

.logo{
    margin: 50px 0 50px 65px;
    font-size: 36px;
    font-weight: bold;
}

.blue-letter{
    color: #006bb7;
}
.red-letter{
    color: #ed174b;
}
.white-letter{
    color: #f6f6f6;
}

.nav-btns{
    margin-left: 50px;
}

.nav-btn{
    font-size: 24px;
    margin-bottom: 20px;
    color: #f6f6f6;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.current-page-indicator{
    width: 10px;
    height: 10px;
    margin-right: 12px;
    background: #ed174b;
    border-radius: 100%;
}

.hl-navbar {
    margin: 15px 0 40px 0;
    border-bottom: 2px solid #f6f6f6;
    width: 230px;
    align-self: center;
}
</style>