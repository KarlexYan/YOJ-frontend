<template>
  <div id="browseContactView">
    <div id="contentView">
      <a-form :model="form">
        <a-comment align="right" :avatar="loginUser.userAvatar">
          <template #actions>
            <a-button key="1" type="primary" @click="doSubmit"> 发送</a-button>
          </template>
          <template #content>
            <a-input placeholder="请输入要发布的内容" v-model="form.content" />
          </template>
        </a-comment>
      </a-form>
    </div>
    <a-divider :margin="10" />
    <div class="contactList">
      <a-comment
        v-for="(record, index) in dataList"
        :key="index"
        :author="record.userVO.userName"
        :content="record.content"
        :avatar="record.userVO.userAvatar"
        :datetime="moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')"
      >
        <template #avatar>
          <a-avatar>
            <img alt="avatar" src="" />
          </a-avatar>
        </template>
        <a-divider :margin="10" />
      </a-comment>
    </div>
    <!-- 分页组件 -->
    <a-pagination
      :current="searchParams.current"
      :total="total"
      :pageSize="searchParams.pageSize"
      @change="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
      :show-jumper="true"
      :show-page-size="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import {
  ContactControllerService,
  ContactQueryRequest,
  LoginUserVO,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import { useStore } from "vuex";

// 获取全局状态管理器
const store = useStore();

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<ContactQueryRequest>({
  pageSize: 10,
  current: 1,
});

// 获取到登录用户状态
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

let form = ref({
  content: "",
});

const loadData = async () => {
  const res = await ContactControllerService.listContactVoByPageUsingPost({
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

const router = useRouter();

// 页码改变时的处理函数
const handlePageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

// 每页显示条目数改变时的处理函数
const handlePageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size,
  };
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = async () => {
  const res = await ContactControllerService.addContactUsingPost(form.value);
  if (res.code === 0) {
    message.success("发布成功");
    // 添加成功后清空表单
    form.value.content = "";
    loadData();
  } else {
    message.error("创建失败，" + res.message);
  }
};
</script>

<style scoped>
#browseContactView {
  max-width: 1280px;
  margin: 0 auto;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
}

#contentView {
  max-height: 300px;
  margin: 10px 10px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
}

.contactList {
  margin: 10px 10px;
  padding: 20px;
}
</style>