<template>
  <q-page padding class="history">
    <h1 class="history__title">История поданных КВО и ЛПАБ</h1>

    <q-select
      style="padding-bottom: 15px"
      v-model="applicationType"
      :options="types"
      :option-value="(item) => (!!item ? item.label : null)"
    />

    <base-loading v-if="loading" />
    <history-empty
      v-else-if="isApplicationListEmpty"
      class="history__empty"
      :application-type-id="applicationType.id"
    />
    <q-infinite-scroll v-else :initial-index="1" :disable="scrollDisable" @load="onLoad">
      <history-item
        v-for="(application, idx) in applicationList"
        :key="idx"
        :application="application"
      />

      <template #loading>
        <base-loading />
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup>
import HistoryItem from "src/components/History/Item.vue";
import HistoryEmpty from "src/components/History/Empty.vue";

import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";

import { useRouter, useRoute } from "vue-router";
const route = useRoute();
route.query.type = 0;
const router = useRouter();

const store = useStore();

const types = ref([
  { id: 0, label: "Вся история" },
  { id: 1, label: "История КВО" },
  { id: 2, label: "История отчетов ЛПАБ" },
]);

const applicationType = ref(types.value[parseInt(route.query.type)]);
watch(applicationType, async (newType) => {
  try {
    router.replace({ query: { type: newType.id } });
    loading.value = true;
    await getApplication[newType.id]();
    current_page.value = 1;
  } catch (e) {
    throw e;
  } finally {
    loading.value = false;
  }
});

const last_page = computed(() => store.getters["history/last_page"]);
const current_page = ref(1);
const scrollDisable = computed(() => current_page.value >= last_page.value);
const onLoad = async (page, done) => {
  try {
    if (last_page.value >= page) {
      await getApplicationPagination[applicationType.value.id](page);
      current_page.value = page;
      done();
    }
  } catch (e) {
    throw e;
  }
};

const loading = ref(true);

const applicationList = computed(() => {
  if (applicationType.value.id === 0) return store.getters["history/applicationList"];
  else if (applicationType.value.id === 1) return store.getters["history/kvoList"];
  else if (applicationType.value.id === 2) return store.getters["history/lpabList"];
});
const isApplicationListEmpty = computed(() => !!!applicationList.value?.length);

const getApplication = {
  0: () => store.dispatch("history/getAllApplication"),
  1: () => store.dispatch("history/getKVOList"),
  2: () => store.dispatch("history/getLPABList"),
};

const getApplicationPagination = {
  0: (page) => store.dispatch("history/getAllApplicationPagination", page),
  1: (page) => store.dispatch("history/getKVOListPaginate", page),
  2: (page) => store.dispatch("history/getLPABListPaginate", page),
};

onMounted(async () => {
  try {
    await getApplication[applicationType.value.id]();
  } catch (e) {
    throw e;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  flex-direction: column;

  &__title {
    padding-bottom: 10px;
  }

  &__empty {
    gap: 15px;
    flex-grow: 1;
  }
}
</style>
