<template>
    <select class="select minimal" :value="modelValue" @change="changeOption">
        <option disabled value="">Choose</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name: 'sort-select',
        props: {
            modelValue:{
                type: String
            },
            options:{
                type: Array,
                default: () => []
            }
        },
        methods:{
            changeOption(event){
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
.select{
    background: #eeeeee;
    color: #6a6a6a;
    height: 45px;
    width: 200px;
    
    font-size: 18px;

    border: 2px solid #c4c4c4;
    border-radius: 8px;

    padding-left: 14px;
    padding-right: 20px;

    -webkit-appearance: none;
    -moz-appearance: none;
}
.select:focus{
    outline: none;
}

select.minimal {
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 23px) calc(1em),
    calc(100% - 19px) calc(1em),
    calc(100% - 2.5em) 0.35em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
}
</style>