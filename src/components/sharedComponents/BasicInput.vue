<template>
  <div :class="['input-container', { 'error-padding': showError }]">
    <input
      v-if="props.type === 'text'"
      ref="inputRef"
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="onInput"
      @keydown.enter="onEnterPressed"
      :disabled="disabled"
      @blur="handleBlur"
      class="base-input"
    />
    <div v-else-if="props.type === 'textarea'" class="textarea-wrapper">
      <textarea
        ref="inputRef"
        :id="id"
        :value="value"
        :placeholder="props.placeholder"
        @input="onInput"
        @blur="handleBlur"
        @keydown.enter="onEnterPressed"
        :disabled="disabled"
        class="base-textarea"
      ></textarea>
    </div>
  </div>
  <div class="error-container" v-if="showError || true">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, defineExpose } from 'vue';
const emit = defineEmits(['inputChange', 'enterPressed']);
const showError = ref(false);
const errorMessage = ref('');

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: '',
  },
  value: {
    type: [String, Number],
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Type here...',
  },
  index: {
    type: Number,
  },
  questionIndex: {
    type: Number,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  isValidate: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

function onInput(event) {
  emit('inputChange', { questionIndex: props.questionIndex, index: props.index, value: event.target.value });
}

function validate() {
  for (let eachRule of props.rules) {
    const result = eachRule(props.value);

    if (result !== true) {
      errorMessage.value = result;
      showError.value = true;
      return false;
    } else {
      showError.value = false;
      errorMessage.value = '';
    }
  }
  return true;
}

function checkForValidation() {
  for (let eachRule of props.rules) {
    const result = eachRule(props.value);

    if (result !== true) {
      return false;
    } else {
      showError.value = false;
      errorMessage.value = '';
    }
  }
  return true;
}

function handleBlur() {
  if (props.isValidate) {
    validate();
  }
}
function onEnterPressed() {
  handleBlur();

  if (!showError.value) {
    emit('enterPressed');
  }
}

defineExpose({
  checkForValidation,
});
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  position: relative;

  &.error-padding {
    padding-bottom: 0.5rem;
  }

  .base-input {
    border: none;
    outline: none;
    border-bottom: 0.0625rem solid #5a3b3b;
    display: flex;
    padding: 1rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    background: none;
    color: rgba(90, 59, 59, 0.5);
    font-size: 1rem;
    font-weight: 500;
    color:#000;
    &::placeholder {
      font-size:1rem;
    }
  }
  .textarea-wrapper {
    width: 100%;
    .base-textarea {
      border: none;
      outline: none;
      border-bottom: 0.0625rem solid #5a3b3b;
      height: 100px !important;
      width: 100%;
      max-width: 100%;
      min-width: 200px;
      resize: vertical;
      box-sizing: border-box;
      font-size: 1rem;
    }
  }
}

.error-container {
  color: #e86d1b;
  font-family: Montserrat;
  font-size: 0.75rem;
  font-weight: 600;
  padding-top: 0.3125rem;
}
</style>
