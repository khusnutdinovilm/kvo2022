<template>
  <q-layout view="lHh Lpr lFf" class="p-content">
    <q-header style="background-color: white">
      <q-toolbar class="tw-flex tw-justify-between tw-gap-4">
        <p class="user-name">{{ $store.getters["auth/userName"] }}</p>

        <q-img src="logout.svg" width="25px" height="25px" :ratio="16 / 9" @click="logOut" />
      </q-toolbar>
    </q-header>

    <q-footer class="footer__nav env-b" :class="{ 'ios-platform': isIos }">
      <NavLink name="creating-kvo" exact />
      <NavLink name="creating-lpab" />
      <NavLink name="history" />
      <NavLink name="messages" :has-notification="hasNotification" />
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavLink from "components/NavLink";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const store = useStore();
const router = useRouter();

const logOut = () => {
  store.commit("auth/login", false);
  router.push({ name: "auth" });
};

onMounted(async () => {
  try {
    await store.dispatch("messages/getTotalUnreadMessages");
  } catch (e) {
    throw e;
  }
});

const hasNotification = computed(() => store.getters["messages/hasNotification"]);

const platformType = computed(() => store.getters["platforms/currentPlatform"]);
const isIos = computed(() => platformType.value === "ios");
</script>

<script>
export default {
  name: "MainLayout",
};
</script>

<style lang="scss">
.footer__nav {
  padding: 9px;
  padding-top: 11px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.05);
}
.user-name {
  font-size: 16px;
  color: #000;
  overflow-x: hidden;
  white-space: nowrap;
  padding-left: 8px;
}
</style>
