# babelPluginJsxToStrve

[babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve) 是一款 babel 插件，将 JSX 转换为与 Strve 一起使用的标记模板。

## 安装

```bash
npm install babel-plugin-jsx-to-strve
```

::: tip
[CreateStrveApp](/tool/createStrveApp/) 项目脚手架工具已默认安装，选择`strve-jsx` 或者 `strve-jsx-apps` 模版。
:::

## 用法

在你的 Babel 配置中（`.babelrc`、`babel.config.js`、`package.json` 中的`babel`字段等），添加插件：

```js
{
  "plugins": [
    ["babel-plugin-jsx-to-strve"]
  ]
}
```

## 选项

### `tag=html`

默认情况下，[babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve) 将处理所有带有名为 `html` 的标记函数的标记模板。 要使用不同的名称，请在 Babel 配置中使用 `tag` 选项：

```js
{"plugins":[
  ["babel-plugin-jsx-to-strve", {
    "tag": "html"
  }]
]}
```
