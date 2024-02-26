import { getAllApplication, getAllAppplicationPaginate } from "src/api/history";
import { getLPABList, getLPABListPaginate } from "src/api/lpab";
import { getKVOList, getKVOListPaginate } from "src/api/kvo";

import { formatCustomDate } from "src/composition/formatCustomDate";

const NOT_DEPARTEMNT = "Подразделение не указано";

export default {
  namespaced: true,
  state: () => ({
    applicationList: null,
    lpabList: null,
    kvoList: null,
    last_page: null,
    not_department: "Подразделение не указано",
  }),
  getters: {
    applicationList: (state) => state.applicationList,
    kvoList: (state) => state.kvoList,
    lpabList: (state) => state.lpabList,
    last_page: (state) => state.last_page,
  },
  mutations: {
    setLastPage(state, page) {
      state.last_page = page;
    },

    setApplicationList(state, applicationList) {
      state.applicationList = applicationList;
    },

    updateApplicationList(state, newApplicationList) {
      if (newApplicationList) state.applicationList.push(...newApplicationList);
    },

    setLPABList(state, lpabList) {
      state.lpabList = lpabList;
    },
    updateLPABList(state, newLPABList) {
      if (newLPABList) state.lpabList.push(...newLPABList);
    },

    setKVOList(state, kvoList) {
      state.kvoList = kvoList;
    },
    updateKVOList(state, newKVOList) {
      if (newKVOList) state.kvoList.push(...newKVOList);
    },
  },
  actions: {
    async getAllApplication({ commit }) {
      try {
        const response = await getAllApplication();
        const applicationList = await response.data.map((application) => ({
          id: application.id,
          name: application.name,
          department_name: application.department.name,
          date: formatCustomDate(application.date),
          status: application.status,
          isAnonymous: application.is_anonymous,
        }));
        const last_page = await response.meta.last_page;
        commit("setLastPage", last_page);
        commit("setApplicationList", applicationList);
      } catch (error) {
        throw error;
      }
    },

    async getAllApplicationPagination({ commit }, page) {
      try {
        const response = await getAllAppplicationPaginate(page);
        const paginateApplicationList = await response.data.map((application) => ({
          id: application.id,
          name: application.name,
          department_name: application.department?.name || NOT_DEPARTEMNT,
          date: formatCustomDate(application.date),
          status: application.status,
          isAnonymous: application.is_anonymous, // ? application.isAnonymous : undefined,
        }));
        commit("updateApplicationList", paginateApplicationList);
      } catch (error) {
        throw error;
      }
    },

    async getLPABList({ commit }) {
      try {
        const response = await getLPABList();
        const last_page = await response.meta.last_page;
        const lpabList = await response.data.map((lpab) => ({
          id: lpab.id,
          name: lpab.name,
          department_name: lpab.department_id?.name || NOT_DEPARTEMNT,
          date: formatCustomDate(lpab.date),
          status: lpab.status,
        }));
        commit("setLPABList", lpabList);
        commit("setLastPage", last_page);
      } catch (error) {
        throw error;
      }
    },

    async getLPABListPaginate({ commit }, page) {
      try {
        const response = await getLPABListPaginate(page);
        const paginateLpabList = await response.data.map((lpab) => ({
          id: lpab.id,
          name: lpab.name,
          department_name: lpab.department_id?.name || NOT_DEPARTEMNT,
          date: formatCustomDate(lpab.date),
          status: lpab.status,
        }));
        commit("updateLPABList", paginateLpabList);
      } catch (error) {
        throw error;
      }
    },

    async getKVOList({ commit }) {
      try {
        const response = await getKVOList();
        const kvoList = await response.data.map((kvo) => ({
          id: kvo.id,
          name: kvo.name,
          department_name: kvo.department?.name,
          date: formatCustomDate(kvo.date),
          status: kvo.status?.value,
          isAnonymous: kvo.isAnonymous,
        }));
        const last_page = await response.meta.last_page;
        commit("setKVOList", kvoList);
        commit("setLastPage", last_page);
      } catch (error) {
        throw error;
      }
    },

    async getKVOListPaginate({ commit }, page) {
      try {
        const response = await getKVOListPaginate(page);
        const paginateKvoList = await response.data.map((kvo) => ({
          id: kvo.id,
          name: kvo.name,
          department_name: kvo.department?.name || NOT_DEPARTEMNT,
          date: formatCustomDate(kvo.date),
          status: kvo.status?.value,
          isAnonymous: kvo.isAnonymous,
        }));
        commit("updateKVOList", paginateKvoList);
      } catch (error) {
        throw error;
      }
    },
  },
};
