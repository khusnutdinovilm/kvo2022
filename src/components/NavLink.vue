<template>
  <router-link
    :to="{ name }"
    v-slot="{ isExactActive }"
    exact-active-class="active"
    class="link tw-flex tw-flex-col tw-items-center tw-justify-between tw-relative"
  >
    <template>
      <slot></slot>
    </template>

    <base-icons :name="name" :is-active="isExactActive" class="tw-self-center" />
    <span class="link-item tw-text-xs tw-mt-0.5">
      {{ itemName }}
    </span>
    <span v-if="hasNotification" class="notification"></span>
  </router-link>
</template>

<script setup>
import { computed } from "vue";

const navList = {
  "creating-kvo": "Подать КВО",
  "creating-lpab": "Подать ЛПАБ",
  history: "История",
  messages: "Сообщения",
};

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  exact: {
    type: Boolean,
    required: false,
    default: false,
  },
  hasNotification: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const itemName = computed(() => navList[props.name]);
</script>

<style lang="scss">
.link {
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  width: 30%;
  text-align: center;
  color: $grey-light;
  text-decoration: none;

  & span {
  }
}
.router-link-exact-active {
  color: $secondary;
}
.notification {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: $negative;
}
</style>
