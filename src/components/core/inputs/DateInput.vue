<template>
  <base-input
    v-bind="{ placeholder, error }"
    @focus="focused = true"
    @blur="focused = false"
    mask="##.##.####"
    v-model="date"
    @update:model-value="(e) => $emit('update:modelValue', e)"
    >
    <base-icons
      name="calendar"
      class="cursor-pointer tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-right-4"
    />
    <q-popup-proxy
      cover
      transition-show="scale"
      transition-hide="scale"
      :model-value="popup"
      @hide="popup = false"
    >
      <q-date
        v-model="date"
        color="secondary"
        :options="optionsFn"
        :locale="myLocale"
        mask="DD.MM.YYYY"
      >
        <div class="row items-center justify-end q-gutter-sm">
          <q-btn label="Отмена" color="secondary" flat v-close-popup></q-btn>
          <q-btn label="OK" color="secondary" flat v-close-popup></q-btn>
        </div>
      </q-date>
    </q-popup-proxy>
  </base-input>
</template>

<script>
import { ref, watch } from "vue";
import moment from "moment";
import { string } from "yup";
export default {
  name: "date-input",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  inheritAttrs: false,
  setup(props, { emit }) {
    const popup = ref(false);
    const focused = ref(false);
    const myLocale = {
      /* starting with Sunday */
      days: "Восскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split(
        "_"
      ),
      daysShort: "Вос_Пн_Вт_Ср_Чт_Пт_Суб".split("_"),
      months:
        "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split(
          "_"
        ),
      monthsShort: "Янв_Фев_Март_Апр_Май_Июнь_Июль_Авг_Сен_Окт_Нояб_Дек".split(
        "_"
      ),
      firstDayOfWeek: 1,
    };
    const date = ref("");
    watch(
      () => props.modelValue,
      (val) => {
        date.value = props.modelValue;
        emit("update:modelValue", val);

        // if (!popup.value) {
        //   // popup.value = true;
        // } else {
        //   emit("update:modelValue", first);
        // }
      }
    );
    watch(
      () => date.value,
      (val) => {
        emit("update:modelValue", val);
        // if (val) popup.value = true;
      }
    );
    return {
      optionsFn(date) {
        return date <= moment().format("YYYY/MM/DD");
      },
      myLocale,
      date,
      popup,
      focused,
    };
  },
};
</script>
