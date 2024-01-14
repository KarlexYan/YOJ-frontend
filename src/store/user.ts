// 用户信息状态
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  // 存储用户状态信息
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "noLogin"
    }
  }),
  // 行为
  actions: {
    getLoginUser({ commit, state }, payload) {
      commit("updateUser", { userName: "KarlexYan" });
    }
  },
  // 定义状态变更
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    }
  }
} as StoreOptions<any>;
