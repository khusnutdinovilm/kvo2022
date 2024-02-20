<template>
  <Header name="Данные ЛПАБ" style="margin-bottom: 20px" to="history" />

  <base-loading v-if="loading" />
  <div v-else>
    <div class="info p-content">
      <h3 class="info__title">Название:</h3>
      <p class="info__text">
        {{ item.name ? item.name : `№${item.id}` }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Статус:</h3>
      <p class="info__text">
        {{ lpabStatus }}
      </p>
    </div>

    <div v-if="!!item.rejection_comment?.length" class="info p-content">
      <h3 class="info__title">Причина отклонения:</h3>
      <p class="info__text">
        {{ item.rejection_comment }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Дата подачи:</h3>
      <p class="info__text">
        {{ item.created_at }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Дата проведения отчета ЛПАБ:</h3>
      <p class="info__text">
        {{ item.date }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Место проведения:</h3>
      <p class="info__text">
        {{ item.locationName }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Структурное подразделение:</h3>
      <p class="info__text">
        {{ item.department_name }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">ФИО аудитора:</h3>
      <p class="info__text">
        {{ item.auditor_name }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Кол-во наблюдаемых работников:</h3>
      <p class="info__text">
        {{ item.staff }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Безопасные действия (описание):</h3>
      <p class="info__text">
        {{ item.descriptionBd }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Безопасные действия (меры):</h3>
      <p class="info__text">
        {{ item.measuresBd }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Опасные действия (описание):</h3>
      <p class="info__text">
        {{ item.descriptionOd }}
      </p>
    </div>

    <div class="info p-content">
      <h3 class="info__title">Опасные действия (меры):</h3>
      <p class="info__text">
        {{ item.measuresOd }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Header from "src/components/HeaderDrawer.vue";

import { lpabStatusList } from "src/helper/statusNameList";

import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const loading = ref(true);
const route = useRoute();

const store = useStore();

const lpabId = ref(route.params.id);
const item = ref(null);
const lpabStatus = computed(() => lpabStatusList[item.value.status]);

onMounted(async () => {
  item.value = await store.dispatch("lpab/getLPABItem", lpabId.value);
  loading.value = false;
});
</script>
