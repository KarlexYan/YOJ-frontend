import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/checkAuth";
import AUTH_ENUM from "@/access/authEnum";

router.beforeEach(async (to, from, next) => {
  console.log("当前登录用户信息：", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;
  // 如果之前没登陆过,自动登录
  if (!loginUser || !loginUser.userRole) {
    // await 等待用户登录后再执行后续代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser; // 更新用户状态
  }

  // 获取页面需要的权限
  const needAuth = (to.meta?.access as string) ?? AUTH_ENUM.NOT_LOGIN;
  // 要跳转的页面如果需要登录
  if (needAuth !== AUTH_ENUM.NOT_LOGIN) {
    // 判断是否登录,如果没登录跳转到登录页
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AUTH_ENUM.NOT_LOGIN
    ) {
      // 重定向 登录后回到原界面
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
  }
  // 如果已登录,权限不足,跳转无权限页面
  if (!checkAccess(loginUser, needAuth)) {
    next("/noAuth");
    return;
  }
  next();
});
