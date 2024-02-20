<template>
  <div
    class="base-select"
    :class="{ 'base-select_error': !!error, 'base-select_disable': disabled }"
  >
    <div
      class="base-select__selected"
      :class="{ 'base-select__selected_empty': !!!option }"
      @click="popup = true"
    >
      <template v-if="!!option">
        {{ option }}
      </template>
      <template v-else>
        {{ placeholder }}
      </template>
    </div>

    <q-drawer side="right" :width="width" v-model="popup" behavior="mobile">
      <div class="p-content options__top">
        <h1>{{ selectTitle }}</h1>

        <q-icon class="close" size="28px" name="r_clear" @click="popup = false"></q-icon>
      </div>
      <div class="options__top_line"></div>
      <div class="opiton_list p-content">
        <div class="option_item item">
          <template v-for="item in options" :key="item.id">
            <h3 class="item__title" @click="choice($event, item.id)">
              {{ item.name }}
            </h3>
            <div class="options__item_line"></div>
          </template>
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  selectTitle: {
    type: String,
    required: true,
  },
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
  error: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [Array, null],
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const popup = ref(false);

const width = ref(0);
const updateWidth = () => (width.value = window.innerWidth);
updateWidth();

const option = ref(undefined);
const choice = (e, id) => {
  option.value = props.options.find((option) => option.id === id).name;
  popup.value = false;
  emit("update:modelValue", id);
};
</script>

<script>
export default {
  name: "base-select",
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.base-select {
  padding: 9px 12px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  margin-bottom: 20px;

  &_error {
    border-color: #962626;
  }

  &_disable {
    pointer-events: none;
  }

  &__selected {
    &_empty {
      color: #6d6c6c;
    }
  }
}
.options {
  &__top {
    padding-top: 15px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_line {
      border: 1px solid $border;
    }
  }
  &__item {
    &_line {
      border: 1px solid $border;
    }
  }
}
.item {
  &__title {
    padding: 12px 0 17px 0;
  }
}
</style>
