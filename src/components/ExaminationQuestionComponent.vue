<template>
  <div id="examinationQuestionView">
    <a-form :model="form" layout="inline" @submit="handleSubmit">
      <a-form-item
        field="examinationQuestionId"
        v-model="form.examinationQuestionId"
      />
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="form.submitLanguage"
          :style="{ width: '320px' }"
          placeholder="请选择编程语言"
        >
          <a-option>java</a-option>
          <a-option disabled>敬请其他更多语言</a-option>
        </a-select>
      </a-form-item>
    </a-form>
    <CodeEditor
      :language="form.submitLanguage"
      :value="form.submitCode"
      :handle-change="changeCode"
      style="max-height: 350px"
    />
    <a-button
      type="primary"
      style="min-width: 200px; margin-left: 280px"
      size="large"
      @click="save"
      >提交代码
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";

const form = ref({
  submitLanguage: "java",
  submitCode: "",
  examinationQuestionId: undefined,
});

const emit = defineEmits(["submit-form"]);

const handleSubmit = () => {
  if (form.value.examinationQuestionId !== undefined) {
    emit("submit-form", form.value);
  }
};
</script>

<style scoped>
#examinationQuestionView {
  max-width: 1580px;
  margin: 30px auto;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}
</style>