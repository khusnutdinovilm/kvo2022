<template>
  <q-input
    outlined
    :type="type"
    :placeholder="placeholder"
    no-error-icon
    :bottom-slots="false"
    :error="error"
    :mask="mask"
    :rows="rows"
    dense
    :model-value="modelValue"
    @update:model-value="(e) => $emit('update:modelValue', e)"
    @focus="() => $emit('focus')"
    @blur="() => $emit('blur')"
  >
    <template v-slot:append>
      <slot> </slot>
    </template>
  </q-input>
</template>

<script setup>
defineProps({
  textError: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    required: true,
    type: String,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  mask: {
    type: String,
    default: "",
  },
  rows: {
    type: [Number, String],
    default: 0,
  },
});

defineEmits(["update:modelValue", "focus", "blur"]);
</script>

<script>
export default {
  name: "base-input",
};
</script>
<style lang="scss" scoped>
.danger {
  color: $negative;
}
</style>
