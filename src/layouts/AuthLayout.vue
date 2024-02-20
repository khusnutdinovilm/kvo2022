<template>
  <div class="p-content pb env-t env-b tw-h-screen" :class="{ 'ios-platform': isIosPlatform }">
    <router-view />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isIosPlatform = computed(() => store.getters["platforms/isIosPlatform"]);
</script>
