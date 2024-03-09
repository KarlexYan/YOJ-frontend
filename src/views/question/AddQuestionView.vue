<template>
  <div id="addQuestionView">
    <div
      style="
        font-size: 32px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 16px;
      "
    >
      创建题目
    </div>
    <a-form
      :model="form"
      label-align="left"
      style="font-weight: bold; margin: 0 auto"
    >
      <a-form-item
        field="title"
        label="题目标题："
        tooltip="建议填写题目标题"
        required
        :rules="[{ required: true, message: '题目标题为必填项' }]"
      >
        <a-input
          v-model="form.title"
          placeholder="请输入题目标题"
          style="max-width: 500px"
        />
      </a-form-item>
      <a-form-item
        field="tags"
        label="题目标签："
        tooltip="建议填写题目标签"
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
        label="题目内容："
        tooltip="建议填写题目内容"
        required
      >
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item
        field="answer"
        label="题目答案："
        tooltip="建议填写题目答案"
        required
      >
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-divider :margin="5" />
      <a-form-item
        label="判题配置"
        :content-flex="false"
        :merge-props="false"
        tooltip="建议填写判题配置"
        required
      >
        <a-space direction="vertical" style="min-width: 500px">
          <a-form-item
            field="judgeConfig.timeLimit"
            label="时间限制："
            tooltip="单位：ms"
          >
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.memoryLimit"
            label="内存限制："
            tooltip="单位：kb"
          >
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.stackLimit"
            label="堆栈限制："
            tooltip="单位：kb"
          >
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-divider :margin="5" />
      <a-form-item
        label="测试用例配置："
        :content-flex="false"
        :merge-props="false"
        required
        tooltip="建议填写测试用例配置"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 500px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}：`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}：`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>
          </a-space>
          <a-space direction="horizontal" size="large">
            <a-button
              type="outline"
              status="danger"
              @click="handleDelete(index)"
              >删除用例
            </a-button>
            <a-button type="outline" status="success" @click="handleAdd"
              >新增用例
            </a-button>
          </a-space>
        </a-form-item>
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
import { QuestionControllerService } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import MdEditor from "@/components/MdEditor.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
// 如果页面包含update，视为更新配置
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

/**
 * 根据题目id获取已有数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json转js对象 因为数据库存储的 judgeCase judgeConfig tags 不是直接的数据，需要转义
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        timeLimit: 1000,
        memoryLimit: 1000,
        stackLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
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

const router = useRouter();

/**
 * 提交表单
 */
const doSubmit = async () => {
  console.log(form.value); // 打印提交的数据，后续可删除
  // 区分创建还是更新
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      // 更新成功返回到管理页面
      message.success("更新成功");
      await router.push({
        path: "/manage/question",
        replace: true,
      });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
      // 添加成功后清空表单
      form.value.answer = "";
      form.value.tags = [];
      form.value.judgeCase = [];
      form.value.content = "";
      form.value.title = "";
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};

/**
 * 新增判题用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除判题用例
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

/**
 * 因为自定义的代码编辑器组件不会被组件库识别，需要手动指定value和handleChange函数
 */
const onContentChange = (value: string) => {
  form.value.content = value;
};
const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped>
#addQuestionView {
  margin: 0 auto;
  max-width: 900px;
  background: linear-gradient(to right, #efefef, #fff, #efefef);
  border-radius: 10px;
}
</style>