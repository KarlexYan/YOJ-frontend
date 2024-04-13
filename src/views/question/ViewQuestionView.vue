<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制（ms）">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制（KB）">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制（KB）">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
            <a-divider size="0" />
            <a-button
              type="primary"
              style="min-width: 200px; margin-left: 280px"
              size="large"
              @click="doSubmit"
              >提交代码
            </a-button>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论区"></a-tab-pane>
          <a-tab-pane key="answer" title="答案">
            <a-card v-if="question">
              <MdViewer :value="question.answer || ''" />
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
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
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { useRouter } from "vue-router";

/**
 * 定义组件属性类型
 */
interface Props {
  id: string;
}

/**
 * 获取到动态路由id
 */
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

// 拿到脱敏的题目信息
const question = ref<QuestionVO>();

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 代码编辑器 默认代码
 */
const codeDefaultValue = ref(
  "public class Main {\n" +
    "    public static void main(String[] args) {\n" +
    "        int a = Integer.parseInt(args[0]);\n" +
    "        int b = Integer.parseInt(args[1]);\n" +
    "        System.out.println(a + b);\n" +
    "    }\n" +
    "}\n"
);

const form = ref<QuestionSubmitAddRequest>({
  submitLanguage: "java",
  submitCode: codeDefaultValue as unknown as string,
});

const router = useRouter();

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
    // 返回题目列表页
    await router.push({
      path: "/question_submit",
      replace: true,
    });
  } else {
    message.error("提交失败，", res.message);
  }
};

/**
 * 页面加载，请求数据
 */
onMounted(() => {
  loadData();
});

/**
 * 监听代码变化
 * @param value
 */
const changeCode = (value: string) => {
  form.value.submitCode = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1600px;
  margin: 30px auto;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>