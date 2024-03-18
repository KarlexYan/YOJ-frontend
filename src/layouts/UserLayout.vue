<!--全局基本模板-->
<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img
            class="logo"
            src="https://pic.imgdb.cn/item/65a34cbe871b83018a23e7f2.png"
            alt=""
          />
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a
          href="https://github.com/KarlexYan"
          target="_blank"
          style="text-decoration: none"
        >
          YOJ By KalrexYan
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://pic.imgdb.cn/item/65acb751871b83018a6cd52a.png") 0 0 /
    100% 100%;
}

#userLayout .logo {
  width: 278px;
  height: 83px;
}

#userLayout .header {
  margin-top: 400px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
</style>