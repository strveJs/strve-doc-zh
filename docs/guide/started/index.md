# 开始

Strve 是一个用于构建用户界面的 JavaScript 库。

- **更容易上手：** 只要你对 HTML、CSS 和 JavaScript 已经基本熟悉，就可以直接上手。

- **声明式渲染：** 我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系，开发者可以更加专注于业务逻辑的开发，不需要过多地关心 DOM 操作的细节。

- **顺滑的用户体验：** 模板字符串来进行模板的书写，在一些场景中代码智能提示、代码格式化方面不是特别友好。所以，我们提供了新的一种编码方式，我们可以使用 JSX 语法编写 Strve，提升用户开发体验。

- **性能出色：** 采用了虚拟 DOM 的模式，虚拟 DOM 使用 diff 算法的方法来计算出真正需要更新的节点，最大限度地减少了 DOM 操作以及 DOM 操作带来的排版与重绘损耗，从而显著提高了性能。另外，我们的 JavaScript 库在全球知名的[测评榜单](https://github.com/krausest/js-framework-benchmark)上赢得了优秀的成绩。

- **组件化：** 一个函数就是一个组件，可以根据应用规模任意组合。并且组件特有的 **“孤岛特性”**，使得将虚拟 DOM 树计算的级别控制在组件级别。

- **灵活的应用场景：** 有无构建工具都可以使用，并且可以适配到其他前端框架开发的应用项目中去。

- **轻量级：** 压缩后的文件大小不足 **10k**。另外，可以根据不同应用场景，选择[不同类型](https://www.jsdelivr.com/package/npm/strve-js?tab=files&path=dist)的文件。

## ES 模块

现代浏览器大多都已支持 ES 模块，因此我们可以像这样通过 CDN 以及 ES 模块使用 Strve：

::: warning
如果直接在浏览器中打开了上面的 index.html，你会发现它抛出了一个错误，因为 ES 模块不能通过 `file://` 协议工作。为了使其工作，你需要使用本地 HTTP 服务器通过 `http://` 协议提供 index.html。
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Strve.js</title>
  </head>
  <body>
    <script type="module">
      import {
        html,
        defineComponent,
      } from 'https://cdn.jsdelivr.net/npm/strve-js@6.7.1/dist/strve.full-esm.js';

      defineComponent(
        {
          mount: '#app',
        },
        ({ setData }) => {
          let count = 0;

          function add() {
            setData(() => {
              count++;
            });
          }

          return () => html`<h1 onClick=${add}>${count}</h1>`;
        }
      );
    </script>
  </body>
</html>
```

## 全局构建版本

你也可以选择使用 `<script>` 标签引入，这样就可以直接在浏览器中打开。

::: tip
该版本的所有顶层 API 都以属性的形式暴露在了全局的 Strve 对象上。
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Strve.js</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/strve-js@6.7.1/dist/strve.full.prod.js"></script>
    <script>
      const { html, defineComponent } = Strve;

      defineComponent(
        {
          mount: '#app',
        },
        ({ setData }) => {
          let count = 0;

          function add() {
            setData(() => {
              count++;
            });
          }

          return () => html`<h1 onClick=${add}>${count}</h1>`;
        }
      );
    </script>
  </body>
</html>
```
