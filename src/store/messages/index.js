import {
  getMessages,
  getMessagesPaginate,
  totalUnreadMessages,
  markKvoMessageAsRead,
  markLpabMessageAsRead,
} from "src/api/messages";

import { formatCustomDate } from "src/composition/formatCustomDate";

export default {
  namespaced: true,

  state: () => ({
    readMessages: null,
    unreadMessages: null,
    totalUnreadMessages: null,
    last_page: null,
  }),

  getters: {
    readMessages: (s) => s.readMessages,
    unreadMessages: (s) => s.unreadMessages,
    hasNotification: (s) => !!s.totalUnreadMessages && s.totalUnreadMessages !== 0,
    last_page: (s) => s.last_page,
  },

  mutations: {
    setLastPage(state, last_page) {
      state.last_page = last_page;
    },

    setMessages(state, { messages, isRead }) {
      isRead ? (state.readMessages = messages) : (state.unreadMessages = messages);
    },

    updateMessages(state, { messages, isRead }) {
      isRead ? state.readMessages.push(...messages) : state.unreadMessages.push(...messages);
    },

    setTotalUnreadMessages(state, totalUnreadMessages) {
      state.totalUnreadMessages = totalUnreadMessages;
    },

    markKvoMessageAsRead(state, message_id) {
      let idx = state.unreadMessages.findIndex(
        (message) => message.isKvo && message.message_id === message_id
      );
      state.unreadMessages.splice(idx, 1);
    },

    markLpabMessageAsRead(state, message_id) {
      let idx = state.unreadMessages.findIndex(
        (message) => !message.isKvo && message.message_id === message_id
      );
      state.unreadMessages.splice(idx, 1);
    },

    setLastPage(s, last_page) {
      s.last_page = last_page;
    },
  },

  actions: {
    async getMessages({ commit }, isRead) {
      try {
        const response = await getMessages(isRead);

        const messages = response.data.map((message) => ({
          id: new Date().getTime() + Math.random() * 10000,
          isKvo: message.card_id ? true : false,
          message_id: message.id,
          application_name: message.card?.name,
          application_id: !!message.card_id ? message.card_id : message.lpab_id,
          is_read: message.is_read,
          new_status: message.new_status,
          department_name: message.card.department.name,
          created_at: formatCustomDate(message.created_at, true),
        }));

        const last_page = response.meta?.last_page;

        commit("setMessages", { messages, isRead });
        commit("setLastPage", last_page);
      } catch (e) {
        throw e;
      }
    },

    async getMessagesPaginate({ commit }, obj) {
      try {
        const { isRead } = obj;

        const response = await getMessagesPaginate(obj);

        const messages = response.data.map((message) => ({
          id: new Date().getTime() + Math.random() * 10000,
          isKvo: !!message.card_id,
          message_id: message.id,
          application_name: message.card?.name,
          application_id: !!message.card_id ? message.card_id : message.lpab_id,
          is_read: message.is_read,
          new_status: message.new_status,
          department_name: message.card.department.name,
          created_at: formatCustomDate(message.created_at, true),
        }));

        commit("updateMessages", { messages, isRead });
      } catch (e) {
        throw e;
      }
    },

    async markKvoMessageAsRead({ commit }, message_id) {
      try {
        await markKvoMessageAsRead(message_id);
        commit("markKvoMessageAsRead", message_id);
      } catch (e) {
        throw e;
      }
    },

    async markLpabMessageAsRead({ commit }, message_id) {
      try {
        await markLpabMessageAsRead(message_id);
        commit("markLpabMessageAsRead", message_id);
      } catch (e) {
        throw e;
      }
    },

    async getTotalUnreadMessages({ commit }) {
      try {
        const response = await totalUnreadMessages();
        const total = await response.data.value;
        commit("setTotalUnreadMessages", total);
      } catch (e) {
        throw e;
      }
    },
  },
};
