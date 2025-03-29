<template>
  <div>
    <DynamicForm
      v-if="isVisibleDynamicForm"
      :page="selectedPage"
      @selectedAnswer="onSelectedAnswer"
      :isPreviousButtonVisible="isPreviousButtonVisible"
      @nextPage="onNextPage"
      @backPage="onBackPage"
      @submitForm="onSubmitForm"
    />
  </div>

  <div v-if="isvisibleSubmitForm"  class="submit-answers-wrapper">
    <div class="text-wrapper">Is this info about product name correct?</div>
    <div v-for="(eachPage, index) in pages" :key="'page' + index" class="submit-page-wrapper">
      <SubmitPage :page="eachPage" :index="index" />
    </div>
    <div class="button-wrapper">
      <div class="edit-button" @click="editForm">Edit</div>
      <div class="submit-button" @click="clickSubmitForm">Submit</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import DynamicForm from './DynamicForm.vue';
import FormConfig from './FormConfig.js';
import SubmitPage from './SubmitPage.vue';

const pages = FormConfig.pages;
let selectedPage = ref(pages[0]);
const isPreviousButtonVisible = ref(false);
const answeredQuestions = reactive({});
let isVisibleDynamicForm = ref(true);
let isvisibleSubmitForm = ref(false);

onMounted(() => {
  console.log('formPage', selectedPage.value);
});

function onSelectedAnswer({ questionIndex, index, value }) {
  console.log('pages in onSelectedAnswer before', pages);

  const key = selectedPage.value.questionArray[questionIndex].fields?.[index].valueKey;

  if (key) {
    answeredQuestions[key] = value;
    selectedPage.value.questionArray[questionIndex].fields[index][key] = value;
  }

  console.log('pages in onSelectedAnswer', pages);

}

function onNextPage() {
  console.log('pages in onNextPage', pages);
  console.log(selectedPage.value);


  console.log(selectedPage.value.id);
  if (!selectedPage.value.nextQuestionId) return;
  const nextPage = pages.find((page) => page.id === selectedPage.value.nextQuestionId);
  console.log('nextPage', nextPage);

  if (answeredQuestions[selectedPage.value.id] !== '') {
    if (nextPage) {
      console.log(answeredQuestions['productType']);
      console.log(nextPage.questionArray[0].fields[0].placeholderValues[answeredQuestions['productType']]);
      nextPage.questionArray[0].fields[0].placeholder = nextPage.questionArray[0].fields[0].placeholderValues[answeredQuestions['productType']];
      selectedPage.value = nextPage;
      isPreviousButtonVisible.value = true;
    }
  }


}

function onBackPage() {
console.log("Previous Question Id:", selectedPage.value.previousQuestionId);

  if (!selectedPage.value.previousQuestionId) return;

  const prevPage = pages.find((page) => page.id === selectedPage.value.previousQuestionId);
  
  console.log("Pages:", pages);

  console.log("Previous page:", prevPage);

  if (prevPage) {
    selectedPage.value = prevPage;
    isPreviousButtonVisible.value = !prevPage.previousQuestionId; // Hide previous button if we're on the first page
  }
}

function onSubmitForm() {
  console.log("answeredQuestions:", answeredQuestions)
  isVisibleDynamicForm.value = false;
  isvisibleSubmitForm.value= true;
}

function editForm() {
  isVisibleDynamicForm.value = true;
  isvisibleSubmitForm.value= false;
  console.log("Pages in edit form:", pages);
  selectedPage.value = pages[0];
}
</script>
<style lang="scss" scoped>
.submit-answers-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 16px;
  width: 100%;
  .text-wrapper {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1.625rem;
  }
  .submit-page-wrapper{

  }
  .button-wrapper{
    display:flex;
    justify-content:end;
    align-items: end;
    width: 100%;
    gap: 1rem;
    .edit-button{
      // height:30px;
      // min-width:90px;
      // text-align:center;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      padding: .5rem 1rem;
      border: 1px solid #000000;
      border-radius: 5px;
      background:transparent;
      cursor: pointer;
      &:hover{
        background: #d3d3d3;
        border-color: #d3d3d3;
      }
    }
    .submit-button {
      height:30px;
      min-width:90px;
      text-align:center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      color:#ffffff;
      background: #6d78d5;
      cursor: pointer;
    }
  }
}
</style>
