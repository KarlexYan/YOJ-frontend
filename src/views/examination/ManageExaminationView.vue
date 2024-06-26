<template>
  <div id="manageExaminationView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: center; align-content: center; margin: 25px"
    >
      <a-form-item field="title" label="题目" tooltip="请输入查询的题目">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入要查询的题目"
        />
      </a-form-item>
      <a-form-item field="title" label="用户" tooltip="请输入用户的ID">
        <a-input
          v-model="searchParams.userId"
          placeholder="请输入要查询的用户ID"
        />
      </a-form-item>
      <a-form-item
        field="tags"
        label="题目标签"
        tooltip="请输入要查询的题目标签"
        style="min-width: 280px"
      >
        <a-input-tag v-model="searchParams.tags" placeholder="请输入题目标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
      <a-form-item>
        <a-button status="normal" @click="doAdd">创建</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :column-resizable="true"
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
      @pageSizeChange="onPageSizeChange"
    >
      <template #id="{ record }">
        <a-link
          status="normal"
          style="color: black"
          @click="toExaminationQuestionPage(record)"
          >{{ record.id }}
        </a-link>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of JSON.parse(record.tags)"
            :key="index"
            color="cyan"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button status="normal" @click="toExaminationQuestionPage(record)"
            >查看题目</a-button
          >
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-popconfirm
            content="确定要删除此题目吗?"
            type="error"
            okText="是"
            cancelText="否"
            @cancel="
              () => {
                console.log(`已取消`);
              }
            "
            @ok="doDelete(record)"
          >
            <a-button status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Examination, ExaminationControllerService } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  userId: undefined,
  tags: [],
  title: "",
  pageSize: 10,
  current: 1,
  content: "",
});

// 创建一个数据存储获取到的用户信息
// const userInfos = [];

/**
 * 加载函数
 */
const loadData = async () => {
  const res = await ExaminationControllerService.listExaminationByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
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
    title: "题号",
    slotName: "id",
    align: "center",
  },
  {
    title: "题目",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
    align: "center",
  },
  {
    title: "标签",
    slotName: "tags",
    align: "center",
    width: 150,
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
  },
];

/**
 * 分页
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 分页大小
 * @param size
 */
const onPageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size,
  };
};

/**
 * 删除
 */
const doDelete = async (examination: Examination) => {
  const res = await ExaminationControllerService.deleteExaminationUsingPost({
    id: examination.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData(); // 刷新数据
  } else {
    message.error("删除失败，", res.message);
  }
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param Examination
 */
const toExaminationPage = (examination: Examination) => {
  router.push({
    path: "/examination/update",
    query: {
      id: examination.id,
    },
  });
};

/**
 * 更新 / 修改操作
 */
const doUpdate = (examination: Examination) => {
  router.push({
    path: "/examination/update",
    query: {
      id: examination.id,
    },
  });
};

/**
 * 查看套题的题目列表
 */
const toExaminationQuestionPage = (examination: Examination) => {
  console.log(examination.id);
  router.push({
    path: `/examination/question_list/manage`,
    query: {
      examinationId: examination.id,
    },
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

/**
 * 创建套题
 */
const doAdd = () => {
  router.push({
    path: "/examination/add",
  });
};
</script>

<style scoped>
#manageExaminationView {
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
  max-width: 1380px;
  margin: 0 auto;
}
</style>