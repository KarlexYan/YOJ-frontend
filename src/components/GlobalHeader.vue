<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
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
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAuth from "@/access/checkAuth";

const router = useRouter();
// 获取全局状态管理器
const store = useStore();
// 获取到登录用户状态
const loginUser = store.state.user.loginUser;

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

// 测试用定时器,自动登录
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "KarlexYan",
//     userRole: "admin",
//   });
// }, 5000);
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
</style>