<template>
  <base-input
    :placeholder="placeholder"
    :error="textError ? true : false"
    :type="inputType"
    :model-value="modelValue"
    @update:model-value="(e) => $emit('update:modelValue', e)"
  >
    <q-icon :name="iconName" class="cursor-pointer" @click="isShowPassword = !isShowPassword" />
  </base-input>
</template>

<script setup>
import { computed, ref } from "vue";

defineProps({
  textError: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const isShowPassword = ref(false);
const inputType = computed(() => (!isShowPassword.value ? "password" : "text"));
const iconName = computed(() => (!isShowPassword.value ? "visibility_off" : "visibility"));
</script>

<script>
export default {
  name: "password-input",
};
</script>
