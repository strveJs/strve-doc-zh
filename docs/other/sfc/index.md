# SFC

SFC (Single File Component) 又名单文件组件，是一种特殊的文件格式。单文件组件将组件的 HTML 模板封装在以`.strve`结尾的文件中，可以更好地获得代码快速补全的体验（需要将其语言模式换成 HTML）。另外，JavaScript 逻辑和 CSS 样式与其分离，使得开发者可以更加方便地维护和修改组件。

## 安装

可以使用[createStrveApp](/tool/createStrveApp/)快速构建SFC项目。

- 基础模板：选择`strve-sfc`模版即可；
- strve-router 模版：选择`strve-sfc-apps`模版即可；
## 使用

SFC特性基于 Strve.js，很多用法相似但不完全相同。请在使用之前阅读下面的注意事项。

### 事件处理

仅支持`@`缩写。另外，事件名称需要绑定命名空间，并且需要用引号包裹。如`@click="myComponent2.btn"`。

### 列表渲染

使用`join('')`去掉渲染结果页面中的多余逗号。如：

```js
${arr.map((todo) => `<li>${todo}</li>`).join('')}
```

### 条件渲染

标签使用` `` `包裹。如：

```js
${isShow ? `<p $key>Strve.js</p>` : `<null $key></null>`}
```

### 属性绑定

绑定属性时，可以不带引号，如：`value=${msg}`。

### 命名功能组件

不支持。

### web-components

支持。

### 组件模式

不支持。

### 注册组件

调用函数。如：

```js
`${component()}`;
```

### strve-router

支持。
