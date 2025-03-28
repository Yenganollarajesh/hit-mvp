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
            <div class="question-number">{{index + 1 }}.</div>
            <div class="question-arrow-svg">arrow-svg</div>
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


</style>
