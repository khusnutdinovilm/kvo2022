<template>
  <span class="status" :class="statusClass">{{ status }}</span>
</template>

<script setup>
import { kvoStatusList, lpabStatusList } from "src/helper/statusNameList";

import { computed } from "vue";

const { bg, isKvo } = defineProps({
  bg: {
    type: [String, Number],
    required: true,
  },
  isKvo: {
    type: Boolean,
    required: false,
  },
});

const status = computed(() => (isKvo ? kvoStatusList[bg] : lpabStatusList[bg]));
const statusClass = computed(() => (isKvo ? `status_kvo-${bg}` : `status_lpab-${bg}`));
</script>

<script>
export default {
  name: "base-status",
};
</script>

<style lang="scss" scoped>
.status {
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  white-space: nowrap;

  &_kvo-1,
  &_lpab-0 {
    background-color: $purple;
  }

  &_kvo-2 {
    background-color: $warning;
  }

  &-kvo-3,
  &_kvo-6,
  &_lpab-3 {
    background-color: $negative;
  }

  &_kvo-4,
  &_lpab-2 {
    background-color: $positive;
  }

  &_kvo-5 {
    background-color: $billet;
    color: $accent;
  }

  &_kvo-7,
  &_lpab-1 {
    background-color: $orange;
  }

  // &-1,
  // &-0 {
  //   background-color: $purple;
  // }
  // &-2 {
  //   background-color: $warning;
  // }
  // &-3 {
  //   background-color: $negative;
  // }
  // &-4 {
  //   background-color: $positive;
  // }
  // &-5 {
  //   background-color: $billet;
  //   color: $accent;
  // }
  // &-6 {
  //   background-color: $negative;
  // }
  // &-7 {
  //   background-color: $orange;
  // }
}
</style>
