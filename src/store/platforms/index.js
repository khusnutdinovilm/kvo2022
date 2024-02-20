export default {
  namespaced: true,

  state: () => ({
    currentPlatform: null,
  }),

  getters: {
    currentPlatform: (state) => state.currentPlatform,
  },

  mutations: {
    setPlatformType(state, platformType) {
      state.currentPlatform = platformType;
    },
  },

  actions: {
    setPlatformType({ commit }, platformType) {
      commit("setPlatformType", platformType);
    },
  },
};
