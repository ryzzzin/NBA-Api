<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'default-button',
    }
</script>

<style scoped>
.button{
    background: #eeeeee;
    color: #6a6a6a;
    height: 45px;
    width: 200px;
    
    font-size: 18px;
    font-weight: bold;

    border: 2px solid #c4c4c4;
    border-radius: 8px;

    padding-left: 14px;
    padding-right: 20px;

    cursor: pointer;
}

.button:active{
    background: #e1e1e1;
}
</style>