import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import BrowseQuestionView from "@/views/question/BrowseQuestionView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import AUTH_ENUM from "@/access/authEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "登录页",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "注册页",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "主页",
    component: BrowseQuestionView,
  },
  {
    path: "/browse/question",
    name: "题目列表",
    component: BrowseQuestionView,
  },
  {
    path: "/question_submit",
    name: "题目提交记录",
    component: QuestionSubmitView,
    meta: {
      access: AUTH_ENUM.ADMIN || AUTH_ENUM.USER,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: AUTH_ENUM.ADMIN || AUTH_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "修改题目",
    component: AddQuestionView,
    meta: {
      access: AUTH_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: AUTH_ENUM.ADMIN || AUTH_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "404",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于我的",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
