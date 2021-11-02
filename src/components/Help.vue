<template>
    <div class="help">
        <div class="help__text">Any questions</div>
        <button class="help__btn">?</button>
    </div>
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
                    {title: 'API', href: 'https://balldontlie.io'}
                ],
                currentPage: 'Teams'
            }
        }
    }
</script>

<style scoped>
.help{
    width: 250px;
    height: 60px;

    position: fixed;
    z-index: 1;
    top: 990px;
    left: 1640px;
    overflow-x: hidden;

    background: rgba(246, 246, 246, 0.75);
    box-shadow: 0 0 8px 8px rgba(246, 246, 246, 0.75);
    border-radius: 80px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
}

.help__text{
    margin-left: 15px;
    color: #212121;
    font-size: 24px;
}

.help__btn{
    width: 60px;
    height: 60px;
    background: #212121;
    color: #f6f6f6;
    font-size: 30px;

    border: 0;
    border-radius: 30px;
    cursor: pointer;
}
</style>