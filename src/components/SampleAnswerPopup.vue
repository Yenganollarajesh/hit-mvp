<template>
    <BasicPopup class="sample-answer-popup-wrapper">
        <template v-slot>
            <div class="heading">Sample Answer</div>
            <div class="example-content"> {{ text }}</div>
            <div class="close-btn-wrapper">

                <div class="close-btn" @click="closePopup()">Close</div>
            </div>
        </template>
    </BasicPopup>

</template>
<script setup>
import BasicPopup from './sharedComponents/BasicPopup.vue';

import { defineEmits,defineProps } from 'vue';
const props = defineProps({
    text:{
        type: String,
        default: ""
    },
})

const emit = defineEmits(['close']);
function closePopup() {
    emit("close");
}
</script>

<style lang="scss">
.sample-answer-popup-wrapper {
    &.popup-component-wrapper {
        .popup-component-container {
            height:100%;
            width:560px;
            padding: 6px 0px 13px;
        }
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #00000052;
    

    .heading {
        color: #1a1b1f;
        font: 24px "roboto";
        margin: 0 0 1px;
        padding-bottom: 24px;
        display: flex;
        height:67px;
        justify-content: center;
    }

    .example-content {
        color: #44474e;
        font-size: 14px;
        padding: 0px 24px;
    }

    .close-btn-wrapper {
        display: flex;
        justify-content: end;
        align-content: end;
        padding: 16px 24px;

        .close-btn {
            height: 30px;
            width: 63px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #303031;
            font-size: 14px;
            margin: 0px 8px;
            padding: 0 14px;
            border: 1px solid #212529;
            border-radius: 5px;
            cursor:pointer;
        }
    }

}
</style>
