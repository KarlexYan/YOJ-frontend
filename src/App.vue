<template>
  <div id="app">
    <BaseLayout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();

/**
 * 全局项目入口,全局单次调用代码,F12彩蛋
 */
const doInit = () => {
  console.log(
    "\n" +
      "    __ __                    __              __  __                \n" +
      "   / //_/  ____ _   _____   / /  ___    _  __\\ \\/ /  ____ _   ____ \n" +
      "  / ,<    / __ `/  / ___/  / /  / _ \\  | |/_/ \\  /  / __ `/  / __ \\\n" +
      " / /| |  / /_/ /  / /     / /  /  __/ _>  <   / /  / /_/ /  / / / /\n" +
      "/_/ |_|  \\__,_/  /_/     /_/   \\___/ /_/|_|  /_/   \\__,_/  /_/ /_/ \n" +
      "                                                                   \n" +
      "           Talk is cheap. Show me the code."
  );
};
// 加载时调用
onMounted(() => {
  doInit();
});

router.beforeEach((to, from, next) => {
  // console.log("页面跳转");
  if (to.meta?.access === "canAdmin") {
    // console.log("判断网页是否管理员访问页面");
    if (store.state.user.loginUser.role !== "admin") {
      // console.log("判断用户权限");
      next("/noAuth"); /* 非管理员访问管理页面,跳转无权限视图*/
      return;
    }
  }
  next();
});
</script>