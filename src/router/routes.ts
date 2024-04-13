import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import NoAuthView from "@/views/state/NoAuthView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import AddExaminationView from "@/views/examination/AddExaminationView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import ManageExamination from "@/views/examination/ManageExaminationView.vue";
import ManageExaminationQuestion from "@/views/examinationQuestion/ManageExaminationQuestionView.vue";
import BrowseQuestionView from "@/views/question/BrowseQuestionView.vue";
import BrowseExaminationView from "@/views/examination/BrowerExamination.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ExaminationSubmitView from "@/views/examination/ExaminationSubmitView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import UserManageView from "@/views/user/UserManageView.vue";
import ContactView from "@/views/contact/BrowseContactView.vue";
import ContactManageView from "@/views/contact/ContactManageView.vue";
import SystemIntroduceView from "@/views/SystemIntroduceView.vue";

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
        path: "/user/info",
        name: "用户信息",
        component: UserInfoView,
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
    name: "题目列表",
    component: BrowseQuestionView,
  },
  {
    path: "/question_submit",
    name: "题目提交记录",
    component: QuestionSubmitView,
  },
  {
    path: "/question/add",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: AUTH_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/question/update",
    name: "修改题目",
    component: AddQuestionView,
    meta: {
      access: AUTH_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/question/view/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true, // 开启接收动态id
    meta: {
      access: AUTH_ENUM.ADMIN || AUTH_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/examination/list",
    name: "套题列表",
    component: BrowseExaminationView,
  },
  {
    path: "/examination_submit",
    name: "套题提交记录",
    component: ExaminationSubmitView,
  },
  {
    path: "/contact",
    name: "动态页",
    component: ContactView,
  },
  {
    path: "/introduce",
    name: "作者页",
    component: SystemIntroduceView,
  },
  {
    path: "/examination/add",
    name: "创建套题",
    component: AddExaminationView,
    meta: {
      access: AUTH_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/user",
    name: "用户管理",
    component: UserManageView,
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  {
    path: "/question/manage",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  {
    path: "/examination/manage",
    name: "管理套题",
    component: ManageExamination,
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  {
    path: "/contact/manage",
    name: "管理动态",
    component: ContactManageView,
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  {
    path: "/examination/question_list/manage",
    name: "套题题目列表",
    component: ManageExaminationQuestion,
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  {
    path: "/examination/update",
    name: "修改套题",
    component: AddExaminationView,
    meta: {
      access: AUTH_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },

  {
    path: "/404",
    name: "404",
    component: () => import("../views/state/404View.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/:pathMatch(.*)", // 匹配所有路由
    redirect: "/404",
  },
];
