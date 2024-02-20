<template>
  <router-view />
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

store.dispatch("platforms/setPlatformType", Capacitor.getPlatform());
</script>

<style lang="scss">
.ios-platform {
  padding-bottom: 20px !important;
}
</style>
