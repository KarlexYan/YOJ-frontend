// 用户信息状态
import { StoreOptions } from "vuex";
import AUTH_ENUM from "@/access/authEnum";
import { UserControllerService } from "../../backapi";

export default {
  namespaced: true,
  // 存储用户状态信息
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  // 行为
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 远程获取登录用户
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AUTH_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  // 定义状态变更
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
