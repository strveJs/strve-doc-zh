# JSX 支持

我们使用 Strve.js 的常用方式就是在标签模版中写类似 HTML 的标签，我们深知这种方式在一些场景中代码智能提示、代码格式化方面不是特别友好。所以，我们提供了新的一种编码方式，我们可以使用JSX语法编写 Strve.js。JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。

## 学习 JSX 语法

我们可以前往React官方文档 [https://zh-hans.react.dev/learn/writing-markup-with-jsx](https://zh-hans.react.dev/learn/writing-markup-with-jsx) 来进一步学习JSX语法。

## 使用

[createStrveApp](/tool/createStrveApp/) 项目脚手架工具已默认安装，选择`strve-jsx` 或者 `strve-jsx-apps` 模版即可。

我们使用 createStrveApp 搭建完 Strve 项目会发现，同时安装了 [babelPluginStrve](/tool/babelPluginStrve/)、[babelPluginJsxToStrve](/tool/babelPluginJsxToStrve/)，这是因为我们需要使用 [babelPluginJsxToStrve](/tool/babelPluginJsxToStrve/) 将 JSX 转换为标签模版，之后再使用[babelPluginStrve](/tool/babelPluginStrve/) 将标签模版转换为 Virtual DOM，进而实现差异化更新视图。