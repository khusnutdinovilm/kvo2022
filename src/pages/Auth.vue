<template>
  <form @submit.prevent="onSubmit" class="tw-flex tw-flex-col tw-justify-between tw-h-full">
    <div>
      <q-img
        src="logo.svg"
        fit="contain"
        width="128px"
        class="q-mx-auto tw-mb-12"
        style="display: block"
      >
      </q-img>
      <h1 class="tw-text-center tw-pb-10">Войдите в аккаунт</h1>

      <base-input v-model="login" placeholder="Логин" class="tw-pb-2.5" :error="loginError ? true : false" />

      <password-input v-model="password" placeholder="Пароль" :text-error="passwordError" />

      <div class="danger tw-flex tw-flex-col tw-items-center tw-pt-7">
        <span>{{ loginError }}</span>
        <span>{{ passwordError }}</span>
        <span>{{ err }}</span>
      </div>
    </div>

    <base-button v-if="!loading" type="submit"> Войти </base-button>
    <base-button v-else>
      <template #loading>
        <img src="spinner.svg" alt="" class="tw-mx-auto" />
      </template>
    </base-button>
  </form>
</template>

<script setup>
import { useField, useForm } from "vee-validate";

import { authSchema } from "src/helper/validationSchemes";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { ref } from "vue";

const store = useStore();
const router = useRouter();

const loading = ref(false);
const err = ref("");

const { handleSubmit, resetForm } = useForm({
  validationSchema: authSchema,
});

const { value: login, errorMessage: loginError } = useField("login");

const { value: password, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    await store.dispatch("auth/auth", values);
    resetForm();
    router.push({ name: "history" });
  } catch (e) {
    throw e;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.danger {
  color: $negative;
}
</style>
