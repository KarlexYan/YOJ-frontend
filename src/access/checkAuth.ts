import AUTH_ENUM from "@/access/authEnum";

/**
 * 检查权限（判断当前登录用户是否有需要的权限）
 * @Param loginUser 当前登录用户
 * @Param needAuth 需要有的权限
 * @Return boolean 是否有权限
 */
const checkAuth = (loginUser: any, needAuth = AUTH_ENUM.NOT_LOGIN) => {
  // 获取当前用户具有的权限（如果没有loginUser,则表示未登录）
  const loginUserAuth = loginUser?.userRole ?? AUTH_ENUM.NOT_LOGIN;
  // 如果不需要权限（即未登录也可访问）
  if (needAuth === AUTH_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果需要登录才能访问
  if (needAuth === AUTH_ENUM.USER) {
    // 如果用户没登录,那么表示无权限
    if (loginUserAuth === AUTH_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要管理员权限才能访问
  if (needAuth === AUTH_ENUM.ADMIN) {
    // 如果用户没登录,那么表示无权限
    if (loginUserAuth === AUTH_ENUM.NOT_LOGIN) {
      return false;
    }
    // 如果用户不为管理员,表示没权限
    if (loginUserAuth !== AUTH_ENUM.ADMIN) {
      return false;
    }
    return true;
  }
};

export default checkAuth;
