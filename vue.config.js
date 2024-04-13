const { defineConfig } = require("@vue/cli-service");
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config){
    config.plugin("manaco").use(new MonacoEditorWebpackPlugin());
  },
});
