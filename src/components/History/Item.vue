<template>
  <div class="application" @click.prevent="goToApplication">
    <div class="application__top tw-flex tw-justify-between">
      <base-status :bg="application.status" :is-kvo="isKvo" />

      <span class="application__number">
        {{ application.name ? application.name : getApplicationIdName }}
      </span>
    </div>

    <div class="application__bottom">
      <p v-if="application.department_name" class="application__text">
        {{ application.department_name }}
      </p>
      <p>
        <b>{{ isKvo ? `Дата обнаружения опасности:` : `Дата проведения ЛПАБ:` }}</b>
        {{ application.date }}
      </p>
      <b v-if="isAnonymous">Анонимно</b>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const { application } = defineProps({
  application: {
    type: Object,
    required: true,
  },
});

const isKvo = computed(() => application.isAnonymous !== undefined);
const isAnonymous = computed(() => application.isAnonymous && isKvo.value);
const getApplicationIdName = computed(() =>
  isKvo.value ? `№${application.id} КВО` : `№${application.id} ЛПАБ`
);

const goToApplication = () => {
  isKvo.value
    ? router.push({ name: "detail-kvo", params: { id: application.id } })
    : router.push({ name: "detail-lpab", params: { id: application.id } });
};
</script>

<style lang="scss" scoped>
.application {
  &:first-child {
    margin: 0 -21px 15px -21px;
  }
  margin: 15px -21px;
  padding: 15px 21px;

  box-shadow: 0px 0px 10px rgb(0 0 0 / 12%);

  &__top {
    padding-bottom: 20px;
    gap: 4px;
    align-items: flex-start;
  }
  &__number {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: $primary;
    word-break: break-all;
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
}
</style>
