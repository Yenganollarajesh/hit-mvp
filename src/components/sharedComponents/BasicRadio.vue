<template>
  <div class="radio-group">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="radio-wrapper"
      :class="[{ 'radio-selected': selectedRadio === option.value }]"
    >
      <input
        type="radio"
        :value="option.value"
        v-model="selectedRadio"
        @change="radioSelection"
        @click="handleClick(option.value)"
        class="radio-button"
      />
      <div class="radio-content">
        <div class="radio-title">{{ option.displayText }}</div>
        <div class="radio-description">{{ option.displaySubText }}</div>
      </div>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
  },
  questionIndex: {
    type: Number,
  },
  value: {
    type: String,
  },
});

const emit = defineEmits(['selectedValue','enterPressed']);
const selectedRadio = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    selectedRadio.value = newValue;
  }
);

function handleClick(value) {
  if (selectedRadio.value === value) {
    radioSelection();
  }
}

function radioSelection() {
  console.log('SelectedRadio', selectedRadio.value);
  emit('selectedValue', { questionIndex: props.questionIndex, index: props.index, value: selectedRadio.value });
}

</script>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  .radio-wrapper {
    display: flex;
    align-items: center;
    border: 1px solid #d1d5db;
    border-radius: 20px;
    padding: 7px 12px;
    cursor: pointer;
    background-color: #fff;
    transition:
      border-color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
    }
    &.radio-selected {
      background-color: #f0f9ff;
    }
    .radio-content {
      display: flex;
      flex-direction: column;
      margin:0px 0px 0px 10px;
      .radio-title {
        color: #212529;
        font-size: 16px;
      }
      .radio-description {
        font-size: 12px;
        color: #212529;
        font-weight: lighter;
      }
    }
    .radio-button {
      appearance: none;
      width: 16px;
      height: 16px;
      border: 2px solid #d1d5db;
      border-radius: 50%;
      outline: none;
      margin:0px;
      margin-top: 4px;
      cursor: pointer;
      position: relative;
      background-color: #fff;
      &:checked {
        border-color: #3b82f6;
        background-color: #3b82f6;
        &::before {
          content: '\2714'; /* Unicode checkmark */
          font-size: 11px;
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
