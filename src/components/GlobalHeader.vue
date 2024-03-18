<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <div>
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img
                class="logo"
                src="https://pic.imgdb.cn/item/65a34cbe871b83018a23e7f2.png"
                alt=""
                width="200px"
                height="58px"
              />
            </div>
          </a-menu-item>
          <a-menu-item
            v-for="item in visibleRoutes"
            :key="item.path"
            style="font-size: 20px"
          >
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-space size="large">
      <a-dropdown trigger="hover">
        <template v-if="loginUser && loginUser.userRole !== AuthEnum.NOT_LOGIN">
          <template v-if="loginUser.userAvatar">
            <a-avatar shape="circle" :image-url="loginUser.userAvatar">
            </a-avatar>
          </template>
          <template v-else>
            <a-avatar shape="circle">
              <IconUser />
            </a-avatar>
          </template>
        </template>
        <template v-else>
          <a-avatar shape="circle" :style="{ backgroundColor: '#3370ff' }">
            <IconUser />
          </a-avatar>
        </template>
        <template #content>
          <template v-if="loginUser.userRole !== AuthEnum.NOT_LOGIN">
            <a-doption>
              <template #icon>
                <icon-idcard />
              </template>
              <template #default>
                <a-anchor-link href="/user/info">个人信息</a-anchor-link>
              </template>
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-poweroff />
              </template>
              <template #default>
                <a-anchor-link @click="logout">退出登录</a-anchor-link>
              </template>
            </a-doption>
          </template>
          <template v-else>
            <a-doption>
              <template #icon>
                <icon-user />
              </template>
              <template #default>
                <a-anchor-link href="/user/login">登录</a-anchor-link>
              </template>
            </a-doption>
            <a-doption>
              <template #icon>
                <icon-user />
              </template>
              <template #default>
                <a-anchor-link href="/user/register">注册</a-anchor-link>
              </template>
            </a-doption>
          </template>
        </template>
      </a-dropdown>
    </a-space>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAuth from "@/access/checkAuth";
import AuthEnum from "@/access/authEnum";
import { LoginUserVO, UserControllerService } from "../../backapi";

const router = useRouter();
// 获取全局状态管理器
const store = useStore();

// 获取到登录用户状态
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后,更新选中菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 菜单点击方法
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 过滤显示菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAuth(store.state.user.loginUser, item?.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 用户注销
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};
</script>

<style setup scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title-bar .logo {
  border-radius: 2px;
  cursor: auto;
}
.logo {
  height: 50px;
}
</style>