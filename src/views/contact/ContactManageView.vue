<template>
  <div id="contactManageView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: center; align-content: center; margin: 25px"
    >
      <a-form-item field="userId" label="用户ID：" tooltip="请输入用户ID">
        <a-input
          v-model="searchParams.userId"
          placeholder="请输入要查询的用户ID"
        />
      </a-form-item>
      <a-form-item field="content" label="内容：" tooltip="请输入内容">
        <a-input
          v-model="searchParams.content"
          placeholder="请输入要查询的内容"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" status="normal" @click="doSubmit"
          >搜索
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="outline" status="normal" @click="loadData"
          >刷新
        </a-button>
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
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-popconfirm
            content="确定要删除此动态吗?"
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
            <a-button type="outline" status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Contact, ContactControllerService } from "../../../backapi/index";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();
const tableRef = ref();
const file = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  id: undefined,
  content: "",
  userId: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await ContactControllerService.listContactByPageUsingPost({
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
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "编号",
    dataIndex: "id",
    align: "center",
    width: "200",
  },
  {
    title: "用户id",
    dataIndex: "userId",
    align: "center",
    width: "200",
  },
  {
    title: "内容",
    dataIndex: "content",
    align: "center",
    width: "500",
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
    width: "200",
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
    width: "100",
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
 * @param contact
 */
const doDelete = async (contact: Contact) => {
  const res = await ContactControllerService.deleteContactUsingPost({
    id: contact.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
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
</script>

<style scoped>
#contactManageView {
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  max-width: 1580px;
  border-radius: 10px;
  margin: 0 auto;
}
</style>