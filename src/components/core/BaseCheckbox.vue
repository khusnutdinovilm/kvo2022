<template>
  <div class="tw-flex tw-items-center">
    <input v-model="checkbox" type="checkbox" class="custom-checkbox" id="checkbox" />
    <label class="custom-label" for="checkbox">{{ label }}</label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const checkbox = ref(props.modelValue);
watch(checkbox, (newCheckbox) => emit("update:modelValue", newCheckbox));
</script>

<script>
export default {
  name: "base-checkbox",
};
</script>

<style lang="scss">
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid $secondary;
  border-radius: 4px;
  margin-right: 12px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: transparent;

  background-image: url("../../../public/checked.svg");
  background-size: 10px;
}
.custom-label {
  font-size: 16px;
  line-height: 21px;
}
</style>
