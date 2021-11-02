<template>
    <input :value="modelValue" @input="updateInput" type="text" class="input">
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

</style>