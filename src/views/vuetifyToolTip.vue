<template>
    <div
      class="custom-tooltip-container"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      ref="tooltipContainer"
      tabindex="0"
    >
      <slot name="activator"></slot>
      <transition name="fade">
        <div
          v-if="isVisible"
          class="custom-tooltip"
          :class="[positionClass]"
          ref="tooltip"
        >
          <slot name="content"></slot>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, nextTick } from "vue";
  
  const props = defineProps({
    position: {
      type: String,
      default: "top",
    },
  });
  
  const isVisible = ref(false);
  const tooltipContainer = ref(null);
  const tooltip = ref(null);
  const positionClass = ref("top");
  
  const showTooltip = () => {
    isVisible.value = true;
    nextTick(() => updateTooltipPosition());
  };
  
  const hideTooltip = () => {
    isVisible.value = false;
  };
  
  const updateTooltipPosition = () => {
    if (!tooltip.value || !tooltipContainer.value) return;
  
    const containerRect = tooltipContainer.value.getBoundingClientRect();
    const tooltipRect = tooltip.value.getBoundingClientRect();
    switch (props.position) {
      case "top":
        positionClass.value = "top";
        tooltip.value.style.top = `${containerRect.top - tooltipRect.height}px`;
        tooltip.value.style.left = `${
          containerRect.left + containerRect.width / 2 - tooltipRect.width / 2
        }px`;
        break;
  
      case "bottom":
        positionClass.value = "bottom";
        tooltip.value.style.top = `${containerRect.bottom}px`;
        tooltip.value.style.left = `${
          containerRect.left + containerRect.width / 2 - tooltipRect.width / 2
        }px`;
        break;
  
      case "left":
        positionClass.value = "left";
        tooltip.value.style.top = `${
          containerRect.top + containerRect.height / 2 - tooltipRect.height / 2
        }px`;
        tooltip.value.style.left = `${
          containerRect.left - tooltipRect.width
        }px`;
        break;
  
      case "right":
        positionClass.value = "right";
        tooltip.value.style.top = `${
          containerRect.top + containerRect.height / 2 - tooltipRect.height / 2
        }px`;
        tooltip.value.style.left = `${containerRect.right}px`;
        break;
    }
  };
  
  onMounted(() => {
    window.addEventListener("scroll", hideTooltip);
    window.addEventListener("resize", hideTooltip);
  });
  
  onUnmounted(() => {
    window.removeEventListener("scroll", hideTooltip);
    window.removeEventListener("resize", hideTooltip);
  });
  </script>
  
  <style lang="scss" scoped>
  .custom-tooltip-container {
    display: flex;
    position: relative;
    cursor: pointer;
    .custom-tooltip {
      position: fixed;
      background-color: black;
      padding: 8px 12px;
      border-radius: 6px;
      width: max-content;
      max-width: 200px;
      // white-space: nowrap;
      z-index: 999;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: opacity 0.2s ease-in-out;
      color:  #fff;
      font-size: 12px;
      font-weight: 400;
  
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .top {
    transform: translateY(-8px);
  }
  
  .bottom {
    transform: translateY(8px);
  }
  
  .left {
    transform: translateX(-8px);
  }
  
  .right {
    transform: translateX(8px);
  }
  </style>