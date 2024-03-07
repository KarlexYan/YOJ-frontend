<template>
  <div id="manageQuestionView">
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
        showJumper: true,
        showPageSize: true,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button status="success" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

// 创建一个数据存储获取到的用户信息
const userInfos = [];

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    // 根据userId 获取用户信息
    // const userIds = res.data.records.map((item: any) => item.user);
    // Promise.all(
    //   userIds.map((userId: any) =>
    //     UserControllerService.getUserVoByIdUsingGet(userId)
    //   )
    // )
    //   .then((responses) => {
    //     // 处理每个响应中获取到的用户信息
    //     responses.forEach((response) => {
    //       const userInfo = response.data;
    //       userInfo.push(userInfo);
    //     });
    //   })
    //   .catch((error) => {
    //     // 处理错误情况
    //     console.error("获取用户信息失败：", error);
    //   });
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 监听searchParams变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载，请求数据
 */
onMounted(() => {
  loadData();
});

/**
 * 自定义展示列
 */
const columns = [
  {
    title: "id",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "用户id",
    dataIndex: "userId",
    align: "center",
  },
  {
    title: "题目标题",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "题目内容",
    dataIndex: "content",
    align: "center",
  },
  {
    title: "题目标签",
    dataIndex: "tags",
    align: "center",
  },
  {
    title: "题目答案",
    dataIndex: "answer",
    align: "center",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    align: "center",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
  },
];

// 翻页
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 删除
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData(); // 刷新数据
  } else {
    message.error("删除失败，", res.message);
  }
};

/**
 * 更新 / 修改操作
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>