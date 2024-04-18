<template>
  <div id="viewExaminationView">
    <div id="viewInfoView">
      <a-row :gutter="[24, 24]">
        <a-col :md="24" :xs="24">
          <a-tabs default-active-key="examination">
            <a-tab-pane key="examination" title="套题信息">
              <a-card v-if="examination" :title="examination.title">
                <MdViewer :value="examination.content || ''" />
              </a-card>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div>
    <div id="QuestionView">
      <div
        v-for="(examinationQuestion, index) in dataList"
        :key="index"
        class="examinationQuestionItem"
      >
        <a-row :gutter="[24, 24]">
          <a-col :md="12" :xs="24">
            <a-card
              v-if="examinationQuestion"
              :title="examinationQuestion.title"
            >
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制（ms）">
                  {{ examinationQuestion.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制（KB）">
                  {{ examinationQuestion.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制（KB）">
                  {{ examinationQuestion.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="examinationQuestion.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of examinationQuestion.tags"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-col>
          <a-col :md="12" :xs="24">
            <CodeEditor style="max-height: 350px" />
          </a-col>
        </a-row>
      </div>
    </div>
    <a-button
      type="primary"
      style="min-width: 500px; margin-left: 500px"
      size="large"
      @click="doSubmit"
      >提交代码
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, withDefaults } from "vue";
import {
  ExaminationControllerService,
  ExaminationQuestionControllerService,
  ExaminationQuestionVO,
  ExaminationVO,
  LoginUserVO,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CodeEditor from "@/components/CodeEditor.vue";

// 获取全局状态管理器
const store = useStore();
const router = useRouter();

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

// 拿到脱敏的套题信息
const examination = ref<ExaminationVO>();
// 拿到每道题的题目信息
const examinationQuestion = ref<ExaminationQuestionVO>();
const dataList = ref([]);

// 获取到登录用户状态
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

/**
 * 加载套题信息
 */
const loadExaminationData = async () => {
  const res = await ExaminationControllerService.getExaminationVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    examination.value = res.data;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 加载题目列表
 */
const loadQuestionList = async () => {
  const res =
    await ExaminationQuestionControllerService.listExaminationQuestionVoByExaminationUsingPost(
      {
        examinationId: props.id as unknown as any,
      }
    );
  if (res.code === 0) {
    dataList.value = res.data;
    console.log(dataList.value);
  }
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  // 返回题目列表页
  await router.push({
    path: "/examination_submit",
    replace: true,
  });
};

/**
 * 页面加载，请求数据
 */
onMounted(() => {
  loadExaminationData();
  loadQuestionList();
});
</script>

<style>
#viewExaminationView {
  max-width: 1600px;
  margin: 30px auto;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}

#viewInfoView {
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}

#viewExaminationView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.examinationQuestionItem {
  margin: 30px 30px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}
</style>