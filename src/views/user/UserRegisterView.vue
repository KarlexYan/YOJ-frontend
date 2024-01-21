<template>
  <div class="userRegisterView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      auto-label-width
      label-align="left"
      :model="form"
      @submit="handleSubmit"
      style="max-width: 480px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="用户名">
        <a-input v-model="form.userAccount" placeholder="请输入你的账户" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="密码不少于8位"
        />
      </a-form-item>
      <a-form-item field="checkPassword" label="密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请重复输入你的密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 480px; height: 40px; font-size: 16px; font-weight: bold"
        >
          注册
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          style="width: 480px; height: 40px; font-size: 16px; font-weight: bold"
          @click="goToLogin"
          >返回登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../backapi";
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
  checkPassword: "",
} as UserRegisterRequest);

/**
 * 表单提交
 * */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登录成功,跳转到主页
  if (res.code === 0) {
    message.success("注册成功");
    setTimeout(() => {
      router.push({
        path: "/user/login",
        replace: true, // 不占用历史记录页面的堆栈,直接替换登录页
      });
    }, 2000);
  } else {
    message.error("注册失败，" + res.message);
  }
};

/**
 * 返回登录
 */
const goToLogin = () => {
  router.push({
    path: "/user/login",
    replace: true, // 不占用历史记录页面的堆栈,直接替换登录页
  });
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