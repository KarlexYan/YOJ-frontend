<template>
  <div id="addExaminationView">
    <div
      style="
        font-size: 32px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 16px;
      "
    >
      <template v-if="route.path.startsWith('/Examination/update')">
        修改套题信息
      </template>
      <template v-else>创建套题</template>
    </div>
    <a-form
      :model="form"
      label-align="left"
      style="font-weight: bold; margin: 0 auto"
    >
      <a-form-item
        field="title"
        label="套题标题："
        tooltip="建议填写套题标题"
        required
        :rules="[{ required: true, message: '套题标题为必填项' }]"
      >
        <a-input
          v-model="form.title"
          placeholder="请输入套题标题"
          style="max-width: 500px"
        />
      </a-form-item>
      <a-form-item
        field="tags"
        label="套题标签："
        tooltip="建议填写套题标签"
        required
      >
        <a-input-tag
          v-model="form.tags"
          placeholder="请输入标签，按回车隔开"
          allow-clear
          style="max-width: 500px"
        />
      </a-form-item>
      <a-form-item
        field="content"
        label="套题内容："
        tooltip="建议填写套题内容"
        required
      >
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-divider :margin="10" />
      <a-form-item>
        <a-button
          type="primary"
          style="min-width: 200px; margin: 0 150px"
          @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ExaminationControllerService } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import MdEditor from "@/components/MdEditor.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
// 如果页面包含update，视为更新配置
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  content: "",
});

/**
 * 根据套题id获取已有数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await ExaminationControllerService.getExaminationByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json转js对象 因为数据库存储的 tags 不是直接的数据，需要转义
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

/**
 * 提交表单
 */
const doSubmit = async () => {
  // console.log(form.value); // 打印提交的数据，后续可删除
  // 区分创建还是更新
  if (updatePage) {
    const res = await ExaminationControllerService.updateExaminationUsingPost(
      form.value
    );
    if (res.code === 0) {
      // 更新成功返回到管理页面
      message.success("更新成功");
      await router.push({
        path: "/Examination/manage",
        replace: true,
      });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await ExaminationControllerService.addExaminationUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
      // 添加成功后清空表单
      form.value.tags = [];
      form.value.content = "";
      form.value.title = "";
      await router.push({
        path: "/Examination/manage",
        replace: true,
      });
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};

/**
 * 因为自定义的代码编辑器组件不会被组件库识别，需要手动指定value和handleChange函数
 */
const onContentChange = (value: string) => {
  form.value.content = value;
};
</script>

<style scoped>
#addExaminationView {
  margin: 0 auto;
  padding: 10px;
  max-width: 1000px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
}

.arco-form-item-label-col-left {
  justify-content: flex-end;
}

:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}
</style>