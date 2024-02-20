<template>
  <q-page class="create-page">
    <h1 class="create__title">Новая КВО</h1>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="field__label" for="">Дата обнаружения опасности:</label>
        <date-input
          placeholder="Выберите дату"
          v-model="incidentDate"
          :error="incidentDateErr ? true : false"
        />
      </div>

      <div class="field">
        <label class="field__label" for="">Структурное подразделение:</label>
        <base-select
          placeholder="Выберите подразделение"
          select-title="Выберите подразделение"
          v-model="departmentId"
          :error="departmentIdErr ? true : false"
          :options="departmentsOptions"
        />
      </div>

      <div class="field">
        <label class="field__label" for="">Место обнаружения опасности:</label>
        <base-input
          v-model="locationName"
          placeholder="Опишите место"
          type="textarea"
          rows="2"
          :error="locationNameErr ? true : false"
        />
      </div>

      <div class="field">
        <label class="field__label" for="">Опасное действие/условие:</label>
        <base-input
          v-model="incidentDescription"
          type="textarea"
          rows="3"
          placeholder="Опишите действие/условие"
          :error="incidentDescriptionErr ? true : false"
        />
      </div>

      <div class="field">
        <label class="field__label" for="">Какие меры предприняты/предложены:</label>
        <base-input
          placeholder="Опишите принятые меры"
          v-model="actionsTakenToResolve"
          type="textarea"
          rows="3"
          :error="actionsTakenToResolveErr ? true : false"
        />
      </div>

      <base-checkbox v-model="isAnonymous" class="create__anonim" label="Анонимная подача" />

      <div class="create__file">
        <input hidden type="file" ref="uploadFile" accept="image/*" @change="fileSelect($event)" />

        <div class="upload">
          <div v-for="(file, index) in files" :key="index" class="upload__item">
            <div class="upload__item-wrapper">
              <span>
                {{ file.name }}
              </span>
            </div>

            <q-icon class="close" size="28px" name="r_clear" @click="onRemoveFile(index)"></q-icon>
          </div>

          <button @click="upload" class="upload__btn" type="button" v-if="files.length == 0">
            <base-icons name="upload" />
            <span class="upload__text"> Прикрепить файл </span>
          </button>
          <base-button @click="upload" v-bind="{ py: 'md', color: 'secondary-l' }" v-else>
            Добавить файл
          </base-button>
        </div>
      </div>

      <!-- <base-file-picker class="create__file" v-model="files" /> -->

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
import { creatingKvoSchema } from "src/helper/validationSchemes";

import { Notify } from "quasar";

import { useField, useForm } from "vee-validate";

import { ref, watch } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { Camera, CameraResultType } from "@capacitor/camera";

import useDepartments from "src/use/departments";
const { departmentsOptions, getDepartments } = useDepartments();
getDepartments();

const store = useStore();
const router = useRouter();

const { handleSubmit, resetForm } = useForm({
  validationSchema: creatingKvoSchema,
});
const isSubmitting = ref(false);

const { value: incidentDate, errorMessage: incidentDateErr } = useField("incidentDate");
watch(incidentDate, (newIncidentDate) => addOrUpdateFormDataField("incidentDate", newIncidentDate));

const { value: departmentId, errorMessage: departmentIdErr } = useField("departmentId");
watch(departmentId, (newDepartmentId) => addOrUpdateFormDataField("departmentId", newDepartmentId));

const { value: locationName, errorMessage: locationNameErr } = useField("locationName");
watch(locationName, (newLocationName) => addOrUpdateFormDataField("locationName", newLocationName));

const { value: incidentDescription, errorMessage: incidentDescriptionErr } =
  useField("incidentDescription");
watch(incidentDescription, (newIncidentDescription) =>
  addOrUpdateFormDataField("incidentDescription", newIncidentDescription)
);

const { value: actionsTakenToResolve, errorMessage: actionsTakenToResolveErr } =
  useField("actionsTakenToResolve");
watch(actionsTakenToResolve, (newActionsTakenToResolve) =>
  addOrUpdateFormDataField("actionsTakenToResolve", newActionsTakenToResolve)
);

const isAnonymous = ref(false);

const files = ref([]);

const fileSelect = async (e) => {
  error.value = "in fileSelect";
  files.value.push(e.target.files[0]);
};
const error = ref("");
const upload = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 50,
      resultType: CameraResultType.Uri,
      width: 800,
      height: 800,
      promptLabelPhoto: "Выбрать из хранилища",
      promptLabelPicture: "Сделать фото",
      allowEditing: false,
    });
    let blob = await fetch(image.webPath).then((r) => r.blob());
    let f = new File([blob], `${image.webPath.split("/").pop()}`, {
      type: `image/${image.format}`,
    });
    files.value.push(f);
  } catch (error) {
  }
};
const onRemoveFile = (index) => {
  files.value.splice(index, 1);
};

const formData = new FormData();
const addOrUpdateFormDataField = (key, value) =>
  formData.has(key) ? formData.set(key, value) : formData.append(key, value);

const onSubmit = handleSubmit(async () => {
  isSubmitting.value = true;
  try {
    addOrUpdateFormDataField("isAnonymous", Number(isAnonymous.value));
    files.value.forEach((file) => formData.append("files[]", file));

    await store.dispatch("kvo/createKVO", formData);

    resetForm();
    router.push({ name: "history" });
    Notify.create({
      type: "positive",
      message: `КВО отправлена.`,
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
  &__file {
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
