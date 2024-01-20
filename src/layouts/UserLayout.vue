<!--全局基本模板-->
<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"> 用户布局</a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/KarlexYan" target="_blank">
          YOJ By KalrexYan
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout .header {
  margin-bottom: 12px;
  box-shadow: #eee 1px 1px 5px;
}

#userLayout .content {
  margin-bottom: 16px;
  background: linear-gradient(to right, #bbb, #eee);
  padding: 20px;
}

#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
</style>
