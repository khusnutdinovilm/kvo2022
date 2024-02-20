import { user, auth } from "src/api/auth";
import * as Tokens from "src/api/helper/tokens";

const storage = window.localStorage;

export default {
  namespaced: true,
  state: () => ({
    auth: false,
    token: null,
    name: null,
    last_name: null,
  }),

  getters: {
    isAuth: (s) => s.auth,

    user: (s) => ({ name: s.name, last_name: s.last_name }),

    userName(state) {
      const { name, last_name } = state;
      if (state?.name && state?.last_name) {
        return `${last_name} ${name}`;
      }
      if (storage.getItem("userName")) {
        const user = storage.getItem("userName");
        return user;
      }
      return null;
    },
  },

  mutations: {
    login(state, res) {
      if (res) {
        const { firstName, lastName } = res;
        storage.setItem("userName", `${lastName} ${firstName}`);
        state.name = firstName;
        state.last_name = lastName;
      } else {
        state.name = null;
        state.last_name = null;
        storage.removeItem("userName");
        Tokens.cleanTokensData();
      }
    },
  },

  actions: {
    async getUser({ commit }, obj) {
      const res = await user(obj);
    },
    async auth({ commit }, obj) {
      try {
        const response = await auth(obj);
        const user = response.data;
        const accessToken = response.data.accessToken;
        commit("login", user);
        Tokens.setTokensData(accessToken);
      } catch (error) {
        throw error;
      }
    },
  },
};
