<template>
  <div id="globalHeader">
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
          />
        </div>
      </a-menu-item>
      <a-menu-item
        v-for="item in routes"
        :key="item.path"
        style="font-size: 20px"
      >
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后,更新选中菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
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
  background: red;
}
</style>
