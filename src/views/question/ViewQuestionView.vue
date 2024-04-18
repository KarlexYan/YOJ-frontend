<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question" lazy-load>
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
          <a-tab-pane key="comment" title="评论区">
            <div id="contentView">
              <a-form :model="contactForm">
                <a-comment align="right" :avatar="loginUser.userAvatar">
                  <template #actions>
                    <a-button key="1" type="primary" @click="doSubmitContact">
                      发送
                    </a-button>
                  </template>
                  <template #content>
                    <a-input
                      placeholder="请输入要发布的内容"
                      v-model="contactForm.content"
                    />
                  </template>
                </a-comment>
              </a-form>
            </div>
            <div class="contactList">
              <a-comment
                v-for="(record, index) in dataList"
                :key="index"
                :author="record.userVO.userName"
                :content="record.content"
                :avatar="record.userVO.userAvatar"
                :datetime="
                  moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')
                "
              >
                <template #avatar>
                  <a-avatar>
                    <img alt="avatar" src="" />
                  </a-avatar>
                </template>
                <a-space
                  v-if="
                    record.userId == loginUser.id ||
                    loginUser.userRole == 'admin'
                  "
                >
                  <a-popconfirm
                    content="确定要删除此评论吗?"
                    type="error"
                    okText="是"
                    cancelText="否"
                    @cancel="
                      () => {
                        console.log(`已取消`);
                      }
                    "
                    @ok="doDeleteContact(record)"
                  >
                    <a-button type="outline" status="danger">删除</a-button>
                  </a-popconfirm>
                </a-space>
                <a-divider :margin="10" />
              </a-comment>
            </div>
            <!-- 分页组件 -->
            <!--            <a-pagination-->
            <!--              :current="searchParams.current"-->
            <!--              :total="total"-->
            <!--              :pageSize="searchParams.pageSize"-->
            <!--              @change="handlePageChange"-->
            <!--              @pageSizeChange="handlePageSizeChange"-->
            <!--              :show-jumper="true"-->
            <!--              :show-page-size="true"-->
            <!--            />-->
          </a-tab-pane>
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
import { computed, defineProps, onMounted, ref, withDefaults } from "vue";
import {
  LoginUserVO,
  QuestionContactAddRequest,
  QuestionContactControllerService,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";

// 获取全局状态管理器
const store = useStore();

const dataList = ref([]);
const total = ref(0);

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

// 获取到登录用户状态
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

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
 * 加载评论信息
 */
const loadContactData = async () => {
  const contactRes =
    await QuestionContactControllerService.listQuestionContactVoByPageUsingPost(
      {
        questionId: props.id as any,
        sortField: "createTime",
        sortOrder: "descend",
      }
    );
  if (contactRes.code === 0) {
    dataList.value = contactRes.data.records;
    total.value = contactRes.data.total;
  } else {
    message.error("加载评论失败" + contactRes.message);
  }
};

/**
 * 代码编辑器 默认代码
 */
const codeDefaultValue = ref(
  "public class Main {\n" +
    "    public static void main(String[] args) {\n" +
    "    \n " +
    "   }\n" +
    "}\n"
);

const form = ref<QuestionSubmitAddRequest>({
  submitLanguage: "java",
  submitCode: codeDefaultValue as unknown as string,
});

const contactForm = ref<QuestionContactAddRequest>({
  content: "",
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
 * 提交评论
 */
const doSubmitContact = async () => {
  if (!question.value?.id) {
    return;
  }
  const res =
    await QuestionContactControllerService.addQuestionContactUsingPost({
      ...contactForm.value,
      questionId: question.value.id,
    });
  if (res.code === 0) {
    message.success("提交评论成功");
    await loadContactData();
  }
};

/**
 * 删除评论
 */
const doDeleteContact = async (record: { id: any }) => {
  if (!question.value?.id) {
    return;
  }
  const res =
    await QuestionContactControllerService.deleteQuestionContactUsingPost({
      id: record.id,
    });
  if (res.code === 0) {
    message.success("删除成功成功");
    await loadContactData();
  } else {
    message.error("删除失败，" + res.message);
  }
};

/**
 * 页面加载，请求数据
 */
onMounted(() => {
  loadData();
  loadContactData();
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

#contentView {
  max-height: 300px;
  margin: 10px 20px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
}

.contactList {
  margin: 10px 10px;
  padding: 20px;
}
</style>