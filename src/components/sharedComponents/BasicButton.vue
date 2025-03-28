<template>
    <div @click=buttonClick() :class="isButtonEnabled ? 'button-enabled' : ''" class="continue-btn">
        {{ text }}
    </div>
</template>

<script setup>
import { defineEmits,defineProps,toRefs } from 'vue';
const props = defineProps({
    text: {
        type: String,
        default: "",
    },
    isButtonEnabled : {
        type: Boolean,
        default: false
    }

});

const {isButtonEnabled} = toRefs(props)
console.log("isButtonEnabled : ",isButtonEnabled.value)
const emit = defineEmits(["continue"]);

function buttonClick() {
    emit('continue')

}
</script>

<style lang="scss" scoped>
.continue-btn {
    background-color: #d3d3d3;
    color: white;
    padding: 8px 24px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
    min-width:100px;
    height: 30px;

    &.button-enabled {
        background-color: #6878d5;
        // cursor: not-allowed;
    }
}
</style>