<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BaseLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

/**
 * 全局项目入口,全局单次调用代码,F12彩蛋
 */
const doInit = () => {
  console.log(
    "\n" +
      "    __ __                     __                 __  __                \n" +
      "   / //_/  ____ _    _____   / /  ___     _  __  \\ \\/ /  ____ _     ____ \n" +
      "  / ,<    / __ `/   / ___/  / /  / _ \\   | |/_/   \\  /  / __ `/    / __ \\\n" +
      " / /| |  / /_/ /_  / /     / /  /  __/  _>  <     / /  / /_/ /_   / / / / \n" +
      "/_/ |_|  \\__,_/_/ /_/     /_/   \\___/  /_/|_|    /_/   \\__,_/_/  /_/ /_/ \n" +
      "                                                                   \n" +
      "           Talk is cheap. Show me the code."
  );
};
// 加载时调用
onMounted(() => {
  doInit();
});
</script>