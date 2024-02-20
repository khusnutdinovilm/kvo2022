<template>
  <div>
    <input hidden type="file" ref="uploadFile" accept="image/*" @change="fileSelect($event)" />

    <div class="upload">
      <div v-for="(file, idx) in files" :key="idx" class="upload__item">
        <div class="upload__item-wrapper">
          <span>
            {{ file.name }}
          </span>
        </div>

        <q-icon class="close" size="28px" name="r_clear" @click="onRemoveFile(idx)" />
      </div>

      <button v-if="files.length == 0" @click="upload" class="upload__btn" type="button">
        <base-icons name="upload" />
        <span class="upload__text"> Прикрепить файл </span>
      </button>
      <base-button v-else @click="upload" v-bind="{ py: 'md', color: 'secondary-l' }">
        Добавить файл
      </base-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import { Camera, CameraResultType } from "@capacitor/camera";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const files = ref(props.modelValue);
watch(files, () => emit("update:modelValue", files.value), { deep: true });

const fileSelect = async (e) => {
  files.value.push(e.target.files[0]);
};

const upload = async () => {
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
};

const onRemoveFile = (index) => {
  files.value.splice(index, 1);
};
</script>

<script>
export default {
  name: "base-file-picker",
};
</script>

<style lang="scss" scoped>
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
