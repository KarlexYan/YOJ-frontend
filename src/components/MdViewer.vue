<template>
  <Viewer :value="value" :plugin="plugins" />
</template>

<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math";
import { defineProps, withDefaults } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}

/**
 * 引入插件
 */
const plugins = [gfm(), highlight(), gemoji(), math()];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style scoped>
#mdViewer {
}
</style>