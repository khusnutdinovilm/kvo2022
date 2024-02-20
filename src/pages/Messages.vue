<template>
  <q-page class="messages">
    <h1 class="messages__title">Сообщения</h1>

    <messages-nav v-model="isRead" class="messages__nav" />

    <div v-if="loading">
      <img src="spinner.svg" alt="" class="tw-mx-auto" />
    </div>
    <messages-empty v-else-if="isMessagesEmpty" :is-read="isRead" class="messages__empty" />
    <q-infinite-scroll v-else :initial-index="1" :disable="scrollDisable" @load="onLoad">
      <messages-item v-for="message in messages" :key="message.id" :message="message" />

      <template #loading>
        <base-loading />
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup>
import MessagesNav from "src/components/Messages/Nav.vue";
import MessagesItem from "src/components/Messages/Item.vue";
import MessagesEmpty from "src/components/Messages/Empty.vue";

import { ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const loading = ref(true);

const isRead = ref(false);
watch(isRead, async () => {
  await getMessages();
  current_page.value = 1;
});

const last_page = computed(() => store.getters["messages/last_page"]);
const current_page = ref(1);
const scrollDisable = computed(() => current_page.value >= last_page.value);
const onLoad = async (page, done) => {
  try {
    if (last_page.value >= page) {
      await store.dispatch("messages/getMessagesPaginate", {
        page: page,
        isRead: Number(isRead.value),
      });
      current_page.value = page;
      done();
    }
  } catch (e) {
    throw e;
  }
};

const messages = computed(
  () => isRead.value ? store.getters["messages/readMessages"] : store.getters["messages/unreadMessages"]
);
const isMessagesEmpty = computed(() => !!!messages.value.length);

const getMessages = async () => {
  loading.value = true;
  try {
    await store.dispatch("messages/getMessages", Number(isRead.value));
  } catch (e) {
    throw e;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await getMessages();
});
</script>

<style lang="scss" scoped>
.messages {
  &__title {
    padding-bottom: 30px;
  }

  &__nav {
    display: flex;
    padding-bottom: 20px;
  }

  &__empty {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
}
</style>
