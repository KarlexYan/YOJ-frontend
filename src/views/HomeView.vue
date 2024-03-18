<template>
  <div class="home"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const mdValue = ref();
const codeValue = ref();

const onMdChange = (v: string) => {
  mdValue.value = v;
};

const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>