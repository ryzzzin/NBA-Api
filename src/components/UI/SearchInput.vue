<template>
    <div class="search">
        <input :value="modelValue" @input="updateInput" type="text" class="input" placeholder="Search...">
        <div class="hl-search"></div>
    </div>
</template>

<script>
    export default {
        name: 'search-input',
        props: {
            modelValue:{
                type: [String, Number]
            }
        },
        methods:{
            updateInput(event){
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
    .input{
        color: #6a6a6a;
        font-size: 18px;
        font-weight: bold;

        border: 0;
        background: transparent;
    }
    
    .input:focus{
        outline: none;
    }

    .input::placeholder{
        color: #a6a6a6;
        font-size: 18px;
        font-weight: bold;

        border: 0;
        background: transparent;
    }

    .hl-search {
        border-top: 3px solid #6a6a6a;
        width: 300px;
    }
</style>