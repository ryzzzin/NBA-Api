<template>
    <a href="https://t.me/ryzzzin" target="_blank" class="help__btn">?</a>
</template>

<script>
    
</script>

<style scoped>

.help__btn{
    position: fixed;
    z-index: 1;
    bottom: 3%;
    right: 2%;
    overflow-x: hidden;

    width: 60px;
    height: 60px;
    background: rgba(33, 33, 33, 0.9);
    color: #f6f6f6;
    font-size: 30px;

    border: 0;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;

    text-decoration: none;
}

.help__btn:hover{
    font-size: 35px;
    background: rgba(70, 70, 70, 0.5);
    width: 70px;
    height: 70px;
    transition: 0.5s;
}
</style>