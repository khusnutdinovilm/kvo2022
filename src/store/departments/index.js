import { getDepartments, getAuditors } from "src/api/departments";

export default {
  namespaced: true,
  state: () => ({
    departments: null,
    auditors: null,
  }),
  getters: {
    departments: (state) => state.departments,
  },
  mutations: {
    setDepartments(state, departments) {
      state.departments = departments;
    },
  },
  actions: {
    async getDepartments({ commit }) {
      try {
        const response = await getDepartments();
        commit("setDepartments", response.data);
      } catch (e) {
        throw e;
      }
    },

    async getAuditors(_, department_id) {
      try {
        const response = await getAuditors(department_id);
        return await response.data;
      } catch (e) {
        throw e;
      }
    },
  },
};
