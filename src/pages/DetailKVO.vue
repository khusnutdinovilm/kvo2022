<template>
  <Header name="Данные КВО" style="margin-bottom: 20px" to="history" />

  <base-loading v-if="loading" />
  <div v-else-if="true">
    <div class="info p-content">
      <h3 class="info__title">Название:</h3>
      <p class="info__text">
        {{ item.name ? item.name : `№${item.id}` }}
      </p>
    </div>

    <div v-if="!!item.rejectionComment?.length" class="reason">
      <div class="p-content">
        <h3 class="reason__title">Причина отклонения:</h3>
        <div class="reason__text">
          {{ item.rejectionComment }}
        </div>
      </div>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Дата подачи:</h3>
      <div class="info__text">
        {{ item.createdAt }}
      </div>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Структурное подразделение:</h3>
      <p class="info__text">
        {{ item.department?.name }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Место обнаружения опасности:</h3>
      <p class="info__text">
        {{ item.locationName }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Опасное действие/условие:</h3>
      <p class="info__text">
        {{ item.incidentDescription }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Меры предприняты/предложены:</h3>
      <p class="info__text">
        {{ item.actionsTakenToResolve }}
      </p>
    </div>

    <div v-if="item.files && !!item.files?.length" class="info p-content">
      <h3 class="info__title">Вложения:</h3>
      <p v-for="(file, idx) in item.files" :key="idx" class="info__text">
        {{ file.originalName }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Статус:</h3>
      <p class="info__text">
        {{ kvoStatus }}
      </p>
    </div>

    <div v-if="!!item.reviewerComment?.length" class="info p-content">
      <h3 class="info__title">Комментарий:</h3>
      <p class="info__text">
        {{ item.reviewerComment }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Header from "src/components/HeaderDrawer.vue";

import { kvoStatusList } from "src/helper/statusNameList";

import { useRoute } from "vue-router";
import { useStore } from "vuex";

import { computed, onMounted, ref } from "vue";

const route = useRoute();
const store = useStore();

const loading = ref(true);
const kvoId = ref(route.params.id);
const item = ref(null);

const kvoStatus = computed(() => kvoStatusList[item.value.status.value]);

onMounted(async () => {
  item.value = await store.dispatch("kvo/getKVOItem", kvoId.value);
  loading.value = false;
});
</script>
