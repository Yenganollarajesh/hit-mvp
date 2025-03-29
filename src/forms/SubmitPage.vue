<template>
  <div class="submit-page-wrapper">
    <div class="submit-page">
      <template v-for="(eachquestion, questionIndex) in page.questionArray" :key="'questionIndex' + questionIndex">
        <!-- Only show question if at least one field has a value -->
        <div 
          v-if="eachquestion.fields.some(field => field[field.valueKey])"
          class="question-answer-wrapper"
        > 
          <div class="question-wrapper">
            <div class="question-number">{{index + 1 }}</div>
            <div class="question-arrow-svg">
              <svg width="16" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="question-text">{{ eachquestion.question }}</div>
          </div>
          
          <template v-for="(eachField, fieldIndex) in eachquestion.fields" :key="'fieldIndex' + fieldIndex">
            <!-- Only show field if it has a value -->
            <div 
              v-if="eachField[eachField.valueKey]"
              class="eachQuestion-wrapper"
            >
              <div class="answer-wrapper">
                {{ eachField[eachField.valueKey] }}

              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  page: {
    type: Object,
    default: {},
  },
  index: {
    type:Number,
    default: 0
  }
});

let { page , index } = toRefs(props);
</script>

<style lang="scss" scoped>
.question-answer-wrapper{
  .question-wrapper{
    display: flex;
    align-items: center;
    .question-text{
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
  .eachQuestion-wrapper{
    .answer-wrapper{
      font-size: 14px;
      color: rgba(33, 37, 41, .75);
      padding: 0px 16px 8px 20px ;
    }
  }
}

</style>
