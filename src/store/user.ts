import { StoreOptions } from "vuex";

// 用户信息状态
export default {
  namespace: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),

  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },

  actions: {
    getLoginUser({ commit, state }, payload) {
      commit("updateUser", { userName: "KarlexYan" });
    },
  },
} as StoreOptions<any>;
