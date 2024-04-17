<template>
  <div id="browseExaminationView">
    <a-form :model="searchParams" layout="inline" style="margin-left: 300px">
      <a-form-item
        field="title"
        label="套题"
        tooltip="请输入搜索的套题"
        style="min-width: 280px"
      >
        <a-input
          v-model="searchParams.title"
          placeholder="请输入要查询的套题"
        />
      </a-form-item>
      <a-form-item
        field="tags"
        label="标签"
        tooltip="请输入查询套题标签"
        style="min-width: 280px"
      >
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入查询的套题标签"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">查询</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      column-resizable
      wrapper
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
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            size="medium"
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
          >
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toExaminationPage(record)">
            查看
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Examination,
  ExaminationControllerService,
  QuestionQueryRequest,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res =
    await ExaminationControllerService.listExaminationVoByPageUsingPost({
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
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

const columns = [
  {
    title: "套题题号",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "标题",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "标签",
    slotName: "tags",
    align: "center",
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
    sortable: {
      sortDirections: ["ascend"],
    },
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

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toExaminationPage = (examination: Examination) => {
  router.push({
    path: `/examination/view/${examination.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 重置页号回第一页
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#browseExaminationView {
  max-width: 1280px;
  margin: 0 auto;
  border-radius: 10px;
}
</style>