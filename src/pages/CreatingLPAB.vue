<template>
  <q-page class="create-page">
    <h1 class="create__title">Новый отчет ЛПАБ</h1>

    <form @submit="onSubmit">
      <div class="field">
        <label for="" class="field__label">Дата проведения:</label>
        <date-input
          placeholder="Не заполнено"
          v-model="dateLpab"
          :error="dateLpabErr ? true : false"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">Место проведения:</label>
        <base-input
          v-model="place"
          placeholder="Не заполнено"
          type="textarea"
          rows="2"
          :error="placeErr ? true : false"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">Структурное подразделение:</label>
        <base-select
          placeholder="Не заполнено"
          select-title="Выберите подразделение"
          v-model="departmentId"
          :error="departmentIdErr ? true : false"
          :options="departmentsOptions"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">ФИО аудитора:</label>
        <base-select
          placeholder="Не заполнено"
          select-title="Выберите аудитора"
          v-model="auditorId"
          :key="auditorsOptions"
          :error="auditorIdErr ? true : false"
          :options="auditorsOptions"
          :disabled="!choseDepartment"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">Кол-во наблюдаемых работников:</label>
        <base-input
          placeholder="Не заполнено"
          v-model="staff"
          :error="staffErr ? true : false"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">Безопасные действия (описание):</label>
        <base-input
          v-model="descriptionBd"
          placeholder="Не заполнено"
          type="textarea"
          rows="4"
          :error="descriptionBdErr ? true : false"
          @focus="clearIfValueIsDefault('descriptionBd')"
          @blur="setDefaultIfFieldEmpty('descriptionBd')"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">Безопасные действия (меры):</label>
        <base-input
          v-model="measuresBd"
          placeholder="Не заполнено"
          type="textarea"
          rows="4"
          :error="measuresBdErr ? true : false"
          @focus="clearIfValueIsDefault('measuresBd')"
          @blur="setDefaultIfFieldEmpty('measuresBd')"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">Опасные действия (описание):</label>
        <base-input
          v-model="descriptionOd"
          placeholder="Не заполнено"
          type="textarea"
          rows="4"
          :error="descriptionOdErr ? true : false"
          @focus="clearIfValueIsDefault('descriptionOd')"
          @blur="setDefaultIfFieldEmpty('descriptionOd')"
        />
      </div>

      <div class="field">
        <label for="" class="field__label">Опасные действия (меры):</label>
        <base-input
          v-model="measuresOd"
          placeholder="Не заполнено"
          type="textarea"
          rows="4"
          :error="measuresOdErr ? true : false"
          @focus="clearIfValueIsDefault('measuresOd')"
          @blur="setDefaultIfFieldEmpty('measuresOd')"
        />
      </div>

      <base-button v-if="!isSubmitting" type="submit">Отправить</base-button>
      <base-button v-else>
        <template #loading>
          <img src="spinner.svg" alt="" class="tw-mx-auto" />
        </template>
      </base-button>
    </form>
  </q-page>
</template>

<script setup>
import { useField, useForm } from "vee-validate";

import { Notify } from "quasar";

import { creatingLpabSchema, initialLpabValues } from "src/helper/validationSchemes";

import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { formatDateForBack } from "src/composition/formatCustomDate";

import useDepartments from "src/use/departments";

const { departmentsOptions, getDepartments, auditorsOptions, getAuditors } = useDepartments();
getDepartments();

const store = useStore();
const router = useRouter();

const {
  values: lpabForm,
  handleSubmit,
  setFieldValue,
  resetForm,
} = useForm({
  validationSchema: creatingLpabSchema,
  initialValues: initialLpabValues,
});
const isSubmitting = ref(false);

const formData = new FormData();
const addOrUpdateFormDataField = (key, value) =>
  formData.has(key) ? formData.set(key, value) : formData.append(key, value);

const setDefaultIfFieldEmpty = (fieldName) => {
  if (!lpabForm[fieldName]) {
    setFieldValue(fieldName, "Не заполнено");
  }
};

const clearIfValueIsDefault = (fieldName) => {
  if (lpabForm[fieldName].trim() === "Не заполнено") {
    setFieldValue(fieldName, "");
  }
};

const { value: dateLpab, errorMessage: dateLpabErr } = useField("dateLpab");
watch(dateLpab, (newDateLpab) => {
  addOrUpdateFormDataField("dateLpab", newDateLpab);
});

const { value: place, errorMessage: placeErr } = useField("place");
watch(place, (newPlace) => addOrUpdateFormDataField("place", newPlace));

const { value: departmentId, errorMessage: departmentIdErr } = useField("departmentId");
watch(departmentId, async (newDepartmentId) => {
  addOrUpdateFormDataField("department_id", newDepartmentId);
  if (!!newDepartmentId) {
    await getAuditors(newDepartmentId);
  }
});
const choseDepartment = computed(() => departmentId.value !== undefined);

const { value: auditorId, errorMessage: auditorIdErr } = useField("auditorId");
watch(auditorId, (newAuditorId) => addOrUpdateFormDataField("auditor_id", newAuditorId));

const { value: staff, errorMessage: staffErr } = useField("staff");
watch(staff, (newStaff) => addOrUpdateFormDataField("staff", newStaff));

const { value: descriptionBd, errorMessage: descriptionBdErr } = useField("descriptionBd");

const { value: measuresBd, errorMessage: measuresBdErr } = useField("measuresBd");

const { value: descriptionOd, errorMessage: descriptionOdErr } = useField("descriptionOd");

const { value: measuresOd, errorMessage: measuresOdErr } = useField("measuresOd");

watch(
  [descriptionBd, measuresBd, descriptionOd, measuresOd],
  (newValues, oldValues) => {
    const fieldsName = ["descriptionBd", "measuresBd", "descriptionOd", "measuresOd"];
    for (let i = 0; i < newValues.length; i++) {
      if (newValues[i] !== oldValues[i]) {
        addOrUpdateFormDataField(fieldsName[i], newValues[i]);
      }
    }
  },
  { immediate: true }
);

const onSubmit = handleSubmit(async () => {
  isSubmitting.value = true;
  try {
    const newDateLpab = formatDateForBack(dateLpab.value);
    addOrUpdateFormDataField("dateLpab", newDateLpab);

    await store.dispatch("lpab/createLPAB", formData);
    resetForm();
    router.push({ name: "history" });
    Notify.create({
      type: "positive",
      message: `Отчет ЛПАБ отправлен`,
      timeout: 1500,
      position: "top",
    });
  } catch (e) {
    throw e;
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<style lang="scss" scoped>
.create-page {
  padding-top: 10px;
}
.create {
  &__title {
    padding-bottom: 30px;
  }
  &__anonim {
    padding-bottom: 30px;
  }
  &__fail {
    padding-bottom: 41px;
  }
}

.field {
  display: flex;
  flex-direction: column;

  &__label {
    color: $accent;
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 10px;
  }
}

.upload {
  &__btn {
    display: flex;
  }

  &__text {
    padding-left: 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: $accent;
  }
  &__item {
    background: $billet;
    border-radius: 4px;
    padding: 5px 10px;
    padding-right: 33px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    position: relative;
    &-wrapper {
      overflow-x: hidden;
    }
    & .close {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
    & span {
      color: $accent;
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
