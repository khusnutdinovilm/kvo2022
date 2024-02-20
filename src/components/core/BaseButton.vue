<template>
  <button :type="type" :class="`btn btn-${color}  color-${textcolor}`">
    <span class="tw-text-center tw-inline-block" :class="`py-${py}`" v-if="$slots.default">
      <slot> </slot>
    </span>
    <slot name="loading" />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
  color: {
    type: String,
    default: "secondary",
  },
  py: {
    type: String,
    default: "lg",
  },
  textcolor: {
    type: String,
    default: "white",
  },
});
</script>

<script>
export default {
  name: "base-button",
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  min-height: 47px;
  font-weight: 600;
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 10px;
  &-secondary {
    background-color: $secondary;
    color: white;
  }
  &-secondary-l {
    background-color: $secondary-light;
    color: $secondary;
  }
}
.py {
  &-lg {
    padding-top: 13px;
    padding-bottom: 16px;
  }
  &-md {
    padding: 5px;
    padding-bottom: 8px;
  }
}
</style>
