<!--全局基本模板-->
<template>
  <div id="baseLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
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
#baseLayout .header {
  margin-bottom: 12px;
  box-shadow: #eee 1px 1px 5px;
}

#baseLayout .content {
  margin-bottom: 16px;
  background: linear-gradient(to right, #bbb, #eee);
  padding: 20px;
}

#baseLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
</style>
<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader },
};
</script>