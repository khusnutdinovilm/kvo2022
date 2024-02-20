<template>
  <div class="tw-flex tw-flex-col tw-justify-between tw-items-center pb empty">
    <div class="empty__text">
      {{ emptyText }}
    </div>

    <base-icons name="empty" />

    <div class="empty__btn-group">
      <base-button v-for="(btn, idx) in buttons" :key="idx" @click="goTo(btn.to)">
        {{ btn.text }}
      </base-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { useRouter } from "vue-router";

import { emptyTexts, buttonsText, buttonsLinks } from "src/helper/historyEmptyUi";

const router = useRouter();

const { applicationTypeId } = defineProps({
  applicationTypeId: {
    type: Number,
    required: true,
  },
});

const emptyText = computed(() => emptyTexts[applicationTypeId]);

const buttons = computed(() =>
  buttonsLinks[applicationTypeId].map((route, idx) => ({
    text: buttonsText[applicationTypeId][idx],
    to: route,
  }))
);

const goTo = (link) => router.push({ name: link });
</script>

<style lang="scss">
.empty {
  &__text {
    color: $accent;
    margin-top: 20px;
  }

  &__btn-group {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
