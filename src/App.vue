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

const router = useRouter();
const store = useStore();

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
