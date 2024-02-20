<template>
  <div>
    <p>{{ emptyMessagesText }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const { isRead } = defineProps({
  isRead: {
    type: Boolean,
    required: true,
  },
});
const emptyMessagesText = computed(() =>
  isRead ? "У Вас нет прочитанных сообщений" : "У Вас нет новых сообщений"
);
</script>
