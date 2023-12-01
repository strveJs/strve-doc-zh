# babelPluginStrve

[babel-plugin-strve](https://www.npmjs.com/package/babel-plugin-strve) 是一款 babel 插件，将 HTML 模板字符串转化为 Virtual Dom。从之前的运行时转移到编译时，大幅度提高渲染性能。

## 安装

```bash
npm install babel-plugin-strve
```

::: tip
[CreateStrveApp](/tool/createStrveApp/) 项目脚手架工具已默认安装。
:::

## 用法

在你的 Babel 配置中（`.babelrc`、`babel.config.js`、`package.json` 中的`babel`字段等），添加插件：

```json
{
  "plugins": [["babel-plugin-strve"]]
}
```

## 选项

### tag=html

默认情况下，[babel-plugin-strve](https://www.npmjs.com/package/babel-plugin-strve) 将处理所有带有名为 `html` 的标记函数的标记模板。 要使用不同的名称，请在 `Babel` 配置中使用 `tag` 选项：

```json
{
  "plugins": [
    [
      "babel-plugin-strve",
      {
        "tag": "html"
      }
    ]
  ]
}
```

## 表达式模式

默认会使用` html`` ` 这种标签模版的模式。如果有其他场景，可以选择调用表达式模式，有两种。

- 函数名称为`tem_h`，参数是模版字符串。

```js
tem_h(`<p>hello</p>`);
```

- 函数名称为`str_h`，参数是普通字符串。

```js
str_h('<p>hello</p>');
```

::: tip
不管是选择默认模式，还是调用表达式模式，它们最终输出结构都是相同的。另外，这些模式我们可以同时使用。
:::
