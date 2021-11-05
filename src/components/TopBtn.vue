<template>
    <button @click="moveToTop" class="top">
        <img src="@/assets/icons/top.svg" class="top__img">
    </button>
</template>

<script>
    export default{
        methods:{
            moveToTop() {
                var currentYOffset = self.pageYOffset;
                var initYOffset = currentYOffset;

                var intervalId = setInterval(function(){
                currentYOffset -= initYOffset*0.05; 
                document.body.scrollTop = currentYOffset ;
                document.documentElement.scrollTop = currentYOffset;

                    if(self.pageYOffset == 0){
                    clearInterval(intervalId);
                    }
                }, 10);
            }
        }
    }
</script>

<style scoped>
.top{
    position: fixed;
    z-index: 1;
    bottom: 3%;
    right: 6%;
    overflow-x: hidden;

    width: 60px;
    height: 60px;
    background: #212121;
    opacity: 90%;
    color: #f6f6f6;
    font-size: 30px;

    border: 0;
    border-radius: 50%;
    cursor: pointer;

    display: none;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
}

.top:hover{
    width: 70px;
    height: 70px;
    background: #464646;
    opacity: 50%;
    transition: 0.5s;
}

.top__img{
    width: 50%;
}
</style>