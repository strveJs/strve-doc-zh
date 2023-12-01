# JSX 支持

::: tip
我们推荐当你开发 Strve 应用时，使用 JSX 语法，会大大提升用户开发体验。
:::

我们使用 Strve 的常用方式就是在标签模版中写类似 HTML 的标签，我们深知这种方式在一些场景中代码智能提示、代码格式化方面不是特别友好。所以，我们提供了新的一种编码方式，我们可以使用 JSX 语法编写 Strve。JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。

## 学习 JSX 语法

我们可以前往[React 官方文档](https://zh-hans.react.dev/learn/writing-markup-with-jsx)来进一步学习 JSX 语法。

## 使用

[CreateStrveApp](/tool/createStrveApp/) 项目脚手架工具已默认安装，选择`strve-jsx` 或者 `strve-jsx-apps` 模版即可。

我们使用 CreateStrveApp 搭建完 Strve 项目你会发现，同时安装了 BabelPluginStrve、BabelPluginJsxToStrve，这是因为我们需要使用 BabelPluginJsxToStrve 将 JSX 转换为标签模版，之后再使用 BabelPluginStrve 将标签模版转换为 Virtual DOM。
