<template>
    <div :class="['option-card', { selected }]" @click="selectOption">
        <div class="svg-wrapper">

            <input type="radio" :value="option.id" :checked="selectedOption === option.id"
                @change="handleChange(option.id)" class="basic-input" />
        </div>

        <div class="card-text-wrapper">
            <div class="card-top-text-timer">
                <div class="title-text">{{ option.title }}</div>
                <div class="time-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13.6" viewBox="0 0 512 512" fill="none"
                        stroke="#2563eb" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="256" cy="256" r="208" />
                        <polyline points="256 128 256 272 352 272" />
                    </svg>
                    <div class="time-text">
                        {{ option.time }}
                    </div>
                </div>
            </div>
            <div class="description-text">{{ option.description }}</div>
            <div class="action-text">{{ option.action }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
    option: Object,
    selected: Boolean,
    selectedOption: Number,
});

const emit = defineEmits(["select", "update:selectedOption"]);

const selectOption = () => {
    emit("select", props.option.id);
};

const handleChange = (id) => {
    emit("update:selectedOption", id); // Emit the new selected option ID
    emit("select", id); // Also emit the select event for backward compatibility
};
</script>

<style lang="scss" scoped>
.option-card {
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    padding: 16px;
    text-align: left;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 5px;

    &.selected {
        box-shadow: 0 4px 10px rgba(52, 76, 118, 0.574);
    }

    &:hover {
        background: #f7f8fa;
    }
    .svg-wrapper {
  cursor: pointer;
  display: inline-block;
  .basic-input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid #ccc; 
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    margin-right: 8px;
    position: relative;
    top: 2px;

  
    &:checked {
      border-color: blue; 
      background-color: blue; 
      &::after {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

    


    .card-text-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-left: 1px;

        .card-top-text-timer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #212529;

            .title-text {
                font-weight: 550;
                padding: 0px;
            }

            .time-badge {
                background-color: #eaf4ff;
                border-radius: 5px;
                padding: 4px 8px;
                color: #4a90e2;
                display: flex;
                align-items: center;
                gap: 4px;

                .time-text {
                    padding-top: 1.5px;
                }
            }
        }

        .description-text {
            font-size: 11px;
            color: #6c757d;
            line-height: 1.6;
        }

        .action-text {
            background-color: #e7f1ff;
            padding: 8px;
            border-radius: 6px;
            color: #4361ee;
            font-weight: 520;
            font-size: 12px;
        }
    }
}
</style>