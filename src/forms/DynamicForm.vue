<template>
  <div class="form-container-wrapper">
    <div class="form-container" v-for="(eachQuestion, questionIndex) in props.page.questionArray" :key="questionIndex">
      <div class="question-wrapper">
        <div class="question">
          {{ eachQuestion.question }} <span class="astrik" v-if="eachQuestion.mandatory">*</span>
        </div>
        <div class="icon-wrapper" @click="sampleAnswerPopup()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#0d6efd" stroke="#0d6efd" stroke-width="1.5" />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill="white"
              font-family="sans-serif"
              font-weight="bold"
            >
              i
            </text>
          </svg>
        </div>
      </div>
      <div class="paragraph">
        {{ eachQuestion.description }}
      </div>
      <div v-for="(eachField, fieldIndex) in eachQuestion.fields" :key="fieldIndex" class="inputs-wrapper">
        <div v-if="eachField.type === 'text' || eachField.type === 'textarea'" class="basic-input-wrapper">
          <!--basic Input or textArea-->
          <BasicInput
            ref="inputRefs"
            :id="'text-' + fieldIndex"
            :value="eachField[eachField.valueKey]"
            :index="fieldIndex"
            @inputChange="onSelectedValue"
            :placeholder="eachField.placeholder"
            :type="eachField.type"
            :questionIndex="questionIndex"
            @enterPressed="onNextClick"
            :rules="getValidationRule(eachField.validation)"
            :isValidate="eachField.validation && eachField.validation.length > 0 ? true : false"
          />
        </div>
        <div v-if="eachField.type === 'radio'" class="basic-radio-wrapper">
         <!--basic Radio-->
          <BasicRadio
            :value="eachField[eachField.valueKey]"
            :index="fieldIndex"
            :questionIndex="questionIndex"
            @selectedValue="onSelectedValue"
            @enterPressed="onNextClick"
            :options="eachField.options"
          />
        </div>
        <SampleAnswerPopup :text="eachField.placeholder" v-if="viewSampleAnswerPopup" @close="closePopup()" />
      </div>

      <div class="buttons-wrapper">
        <div @click="onPreviousClick" v-if="eachQuestion.pressEnter" class="previous-text">
          <span class="previous-arrow"
            ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 18L9 12L15 6"
                stroke="#000"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> </span
          >Previous
        </div>
        <BasicButton :isButtonEnabled="buttonEnabled" :text="props.page.button.label" @click="onNextClick" />
        <div v-if="eachQuestion.pressEnter" class="press-enter">
          press <span class="enter-text">Enter</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 11H7.83L12.41 6.41L11 5L4 12L11 19L12.41 17.59L7.83 13H19V21H21V11H19Z" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import BasicInput from '../components/sharedComponents/BasicInput.vue';
import BasicRadio from '../components/sharedComponents/BasicRadio.vue';
import BasicButton from '../components/sharedComponents/BasicButton.vue';
import SampleAnswerPopup from '../components/SampleAnswerPopup.vue';

const props = defineProps({
  page: {
    type: Object,
    default: Object,
  },
});

const inputRefs = ref([]);

const emit = defineEmits(['nextPage', 'backPage', 'selectedAnswer','submitForm']);

const viewSampleAnswerPopup = ref(false);

function sampleAnswerPopup() {
  viewSampleAnswerPopup.value = true;
}

function closePopup() {
  viewSampleAnswerPopup.value = false;
}

const buttonEnabled = computed(() => {
  let isEnabled = true;

  if (!props.page.questionArray) {
    return false
  }
  
  props.page.questionArray.forEach((eachquestion, index) => {
    const inputElement = inputRefs.value?.[index];

    eachquestion.fields?.forEach((field) => {
      const key = field.valueKey;

      if (field.validation && field.validation.length > 0 && inputElement) {
        const isValid = inputElement.checkForValidation();
        if (!isValid) {
          isEnabled = false;
        }
      }

      if (eachquestion.mandatory && (!field[key] || field[key] === "")) {
        isEnabled = false;
      }
    });
  });

  return isEnabled;
});

function onSelectedValue({ questionIndex, index, value }) {
  console.log('onSelected value', { questionIndex, index, value });
  if (value && value.length > 0) {
    buttonEnabled.value = true;
  } else {
    buttonEnabled.value = false;
  }
  emit('selectedAnswer', { questionIndex, index, value });
}



function onNextClick() {
  console.log("Props pages", props.page);
  if (props.page.button.action === "submit") {
    emit("submitForm")
  }else if (buttonEnabled.value) {
    emit('nextPage');
  }
}
function onPreviousClick() {
  emit('backPage');
}

function getValidationRule(validationArray) {
  if (!Array.isArray(validationArray)) return [];

  const validationRules = {
    email: (value) => (/\S+@\S+\.\S+/.test(value) ? true : '*Please enter your email id.'),
    number: (value) => (/^\d+$/.test(value) ? true : '*Please enter a valid number.'),
    required: (value) => (value ? true : '*Please fill this in.'),
  };

  return validationArray.map((rule) => validationRules[rule] || (() => true));
}

</script>

<style lang="scss" scoped>
.form-container-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fff;
  padding: 20px;
  margin: 36px;

  .form-container {
    display: flex;
    gap: 20px;
    flex-direction: column;
    width: 100%;

    .question-wrapper {
      display: flex;
      justify-content: space-between;

      .question {
        color: #212429;
        font-size: 24px;
        margin-bottom: 8px;

        .astrik {
          color: red;
          font-size: 30px;
        }
      }

      .icon-wrapper {
        height: 30px;
        width: 30px;
        border: 1px solid #0d6efd;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background: #0d6efd;

          svg {
            circle {
              fill: #fff;
              stroke: #fff;
            }

            text {
              fill: #0d6efd;
            }
          }
        }
      }
    }

    .paragraph {
      color: #212529bf;
      font-size: 16px;
      margin-top: 4px;
    }

    .inputs-wrapper {
      width: 100%;

      .basic-radio-wrapper {
        padding-left: 20px;
      }
    }

    .buttons-wrapper {
      display: flex;
      gap: 10px;
      font-size: 13px;
      text-align: center;
      justify-content: start;
      align-items: center;
      margin: 16px 0 16px 16px;

      .previous-text {
        display: flex;
        cursor: pointer;
        // .previous-arrow{
        //     fill: #000;
        // }
      }

      .press-enter {
        .enter-text {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
