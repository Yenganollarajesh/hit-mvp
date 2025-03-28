<template>
  <div class="container-wrapper">
    <div class="container">
      <div class="heading">Choose how to start</div>
      <div class="paragraph">Select the option that best fits your current needs</div>

      <OptionCard
        v-for="option in options"
        :key="option.id"
        :option="option"
        :selected="selectedOption === option.id"
        :selectedOption="selectedOption"
        @update:selectedOption="selectedOption = $event"
        @select="selectOption"
        class="options-wrapper"
      />
    <div class="button-wrapper">
        <CustomTooltip :text="'Continue'" position="top">
          <template #activator>
            <BasicButton :disabled="!selectedOption" :text="'Continue'" />
          </template>
        </CustomTooltip>
        
        <div class="bottom-text">Select an option above</div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import OptionCard from '../components/sharedComponents/OptionCard.vue';
import BasicButton from '../components/sharedComponents/BasicButton.vue';
import CustomTooltip from './vuetifyToolTip.vue';

const selectedOption = ref(null);

const options = [
  {
    id: 1,
    title: 'Idea Viability Analysis',
    description:
      'Score your startup idea across 5 critical dimensions to assess its viability. Find out if your concept has what it takes to succeed in the market.',
    time: '2 minutes',
    action: "Avoid wasting time and resources on ideas that aren't market-ready.",
  },
  {
    id: 2,
    title: 'Make detailed app development plan',
    description:
      'Create a comprehensive app development blueprint that developers will understand. Get time and cost estimates, feature breakdowns, and avoid costly planning mistakes.',
    time: '7 minutes',
    action: 'Save up to 40% on development costs with clear requirements and proper planning.',
  },
  {
    id: 3,
    title: 'Blank Project',
    description:
      'Start with a clean slate and build your project exactly how you want it. Configure all aspects from scratch to match your specific requirements and vision.',
    time: '30 seconds',
    action: 'Start using HitMVP instantly, using only what matters for your unique needs.',
  },
];

const selectOption = (id) => {
  selectedOption.value = id;
};
</script>

<style lang="scss" scoped>
.container-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 32px;

  .container {
    max-width: 700px;

    .heading {
      color: #212429;
      font-size: 24px;
      margin-bottom: 16px;
    }

    .paragraph {
      color: #6c757d;
      margin-bottom: 24px;
      font-size: 14px;
    }

    .options-wrapper {
      margin-bottom: 24px;
    }
    .button-wrapper {
        display:flex;
        gap:16px;
        font-size: 14px;
        .bottom-text {
            display:flex;
            justify-content: center;
            align-items:center;
            color: #212529bf;
        }
    }
  }
}
</style>
