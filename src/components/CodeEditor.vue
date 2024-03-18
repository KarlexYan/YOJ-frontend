<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 200px; height: 100vh"
  ></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java", // 默认java
  handleChange: (v: string) => {
    // console.log("当前值：", v);
  },
});

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    folding: true, // 开启折叠
    foldingHighlight: true, // 开启折叠等高线
    foldingStrategy: "indentation", // 折叠方式
    showFoldingControls: "always", // 一直显示折叠
    disableLayerHinting: true, // 等宽优化
    minimap: {
      enabled: true, // 开启迷你地图
      size: "fill",
      maxColumn: 50,
    },
    emptySelectionClipboard: false, // 空选择剪贴板
    selectionClipboard: false, // 选择剪贴板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: "off", // 关闭辅助功能支持
    lineNumbers: "on", // 行号
    lineNumbersMinChars: 4, // 行号最小字符
    readOnly: false, // 关闭只读
    theme: "vs-dark", // 暗黑主题
  });

  /**
   * 编辑 监听内容变化
   */
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });

  // 代码提示
  monaco.languages.registerCompletionItemProvider("java", {
    provideCompletionItems: function (model, position) {
      // 获取当前行数
      const line = position.lineNumber;
      // 获取当前列数
      const column = position.column;
      // 获取当前输入行所有内容
      const content = model.getLineContent(line);
      // 通过下标来获取当前光标后一个内容，即为刚输入的内容
      const sym = content[column - 2];
      var textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      var suggestions = [];
      if (sym == "$") {
        //...
        //拦截到用户输入$，开始设置提示内容
      } else {
        //直接提示，以下为java语句关键词提示
        var sqlStr = [
          "abstract",
          "assert",
          "boolean",
          "break",
          "byte",
          "case",
          "catch",
          "char",
          "class",
          "continue",
          "default",
          "do",
          "double",
          "else",
          "enum",
          "extends",
          "final",
          "finally",
          "float",
          "for",
          "if",
          "implements",
          "import",
          "int",
          "interface",
          "instanceof",
          "long",
          "native",
          "new",
          "package",
          "private",
          "protected",
          "public",
          "return",
          "short",
          "static",
          "strictfp",
          "super",
          "switch",
          "synchronized",
          "this",
          "throw",
          "throws",
          "transient",
          "try",
          "void",
          "volatile",
          "while",
          "true",
          "false",
          "null",
          "console",
          "log",
        ];
        for (var i in sqlStr) {
          suggestions.push({
            label: sqlStr[i], // 显示的提示内容
            kind: monaco.languages.CompletionItemKind["Function"], // 用来显示提示内容后的不同的图标
            insertText: sqlStr[i], // 选择后粘贴到编辑器中的文字
            detail: "", // 提示内容后的说明
            range: range,
          });
        }
      }
      return {
        suggestions: suggestions,
      };
    },
    triggerCharacters: ["$", ""],
  });
});
</script>

<style scoped></style>