<template>
  <div class="messages-nav">
    <div
      class="messages-nav__item"
      :class="{ 'messages-nav__item_active': !modelValue }"
      @click.prevent="$emit('update:modelValue', !modelValue)"
    >
      Новые
    </div>
    <div
      class="messages-nav__item"
      :class="{ 'messages-nav__item_active': modelValue }"
      @click.prevent="$emit('update:modelValue', !modelValue)"
    >
      Прочитанные
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.messages-nav {
  gap: 10px;

  &__item {
    padding: 3px 9px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 18px;
    transition: all 0.5s ease;
    color: $accent;
    border: 1px solid $grey-light;

    &_active {
      color: $secondary;
      border-color: $secondary;
    }
  }
}
</style>
