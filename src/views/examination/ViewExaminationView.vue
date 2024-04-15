<template>
  <div id="viewExaminationView">
    <div id="viewInfoView">
      <a-row :gutter="[24, 24]">
        <a-col :md="24" :xs="24">
          <a-tabs default-active-key="examination">
            <a-tab-pane key="examination" title="套题信息">
              <a-card v-if="examination" :title="examination.title">
                <MdViewer :value="examination.content || ''" />
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(tag, index) of examination.tags"
                      :key="index"
                      color="green"
                    >
                      {{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div>
    <div id="viewQuestionView">
      <a-row :gutter="[24, 24]">
        <a-col :md="12" :xs="24">
          <a-card v-if="examination" :title="examination.title">
            <MdViewer :value="examination.content || ''" />
            <template #extra>
              <a-space wrap>
                <a-tag
                  v-for="(tag, index) of examination.tags"
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
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, withDefaults } from "vue";
import {
  ExaminationControllerService,
  ExaminationQuestionControllerService,
  ExaminationSubmitAddRequest,
  ExaminationVO,
  LoginUserVO,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// 获取全局状态管理器
const store = useStore();

const dataList = ref([]);

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
const examination = ref<ExaminationVO>();

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
 * 加载数据
 */
const loadQuestionData = async () => {
  const res =
    await ExaminationQuestionControllerService.listExaminationQuestionVoByExaminationUsingPost(
      {
        examinationId: props.id as any,
      }
    );
  if (res.code === 0) {
    dataList.value = res.data;
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

const form = ref<ExaminationSubmitAddRequest>({
  examinationId: undefined,
  submitLanguage: "java",
  examinationQuestionSubmitList: [],
});

const router = useRouter();

/**
 * 页面加载，请求数据
 */
onMounted(() => {
  loadExaminationData();
  loadQuestionData();
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

#viewQuestionView {
  max-width: 1580px;
  margin: 30px auto;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}
</style>