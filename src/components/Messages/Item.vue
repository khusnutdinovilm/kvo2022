<template>
  <div class="message">
    <div class="line"></div>

    <div class="message__top">
      <div class="message__left">
        <base-icons
          v-if="message.value"
          :name="message.value"
          class="message__status_space-right"
        />
        <h4 class="message__status">Изменен статус {{ message.isKvo ? "КВО" : "отчета ЛПАБ" }}</h4>
      </div>
      <div class="message__right">
        <p class="message__time">
          {{ message.created_at }}
        </p>
      </div>
    </div>

    <div class="message__middle">
      <div class="message__middle-name">
        <span>Название:&nbsp;</span>
        <b>{{ message.application_name }}</b>
      </div>
      <p class="message__text">{{ message.department_name }}</p>
      <div class="message__middle-status">
        <span>Статус:&nbsp;</span>
        <base-status :bg="message.new_status" :is-kvo="message.isKvo" />
      </div>
    </div>

    <div class="message__bottom">
      <span class="message__bottom_space" @click.prevent="goToApplication">
        Посмотреть данные
      </span>

      <span v-if="!message.is_read" class="message__bottom_space" @click.prevent="markAsRead">
        Прочитано
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const { message } = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const markedAsReadLoading = ref(false);

const markAsRead = async () => {
  markedAsReadLoading.value = true;

  message.isKvo
    ? await store.dispatch("messages/markKvoMessageAsRead", message.message_id)
    : await store.dispatch("messages/markLpabMessageAsRead", message.message_id);
};

const goToApplication = () => {
  message.isKvo
    ? router.push({ name: "detail-kvo", params: { id: message.application_id } })
    : router.push({ name: "detail-lpab", params: { id: message.application_id } });
};
</script>

<style lang="scss">
.line {
  border: 1px solid $border;
  margin-bottom: 20px;
}
.message {
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
  }

  &__left {
    display: flex;
  }

  &__status {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    &_space-right {
      margin-right: 10px;
    }
  }

  &__middle {
    padding-bottom: 20px;
  }

  &__time {
    font-size: 12px;
    line-height: 16px;
    color: $accent;
  }

  &__text {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }

  &__middle-status {
    padding-top: 20px;
  }

  &__middle-name {
    padding-bottom: 20px;
    word-break: break-all;
  }

  &__bottom {
    color: $secondary;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 20px;

    &_space {
      cursor: pointer;
      margin-right: 20px;
    }
  }
}
</style>
