<template>
  <div class="userLoginView">
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="userAccount" label="用户名">
        <a-input v-model="form.userAccount" placeholder="请输入你的账户" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="密码不少于8位"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

/**
 * 表单提交
 * */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功,跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    // message.success("登录成功" + JSON.stringify(res.data));
    router.push({
      path: "/",
      replace: true, // 不占用历史记录页面的堆栈,直接替换登录页
    });
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>
<style>
/*去除IE EDGE的密码默认的快速清除按钮以及密码文字显示按钮*/
input[type="password"]::-ms-reveal {
  display: none;
}

input[type="password"]::-ms-clear {
  display: none;
}
</style>