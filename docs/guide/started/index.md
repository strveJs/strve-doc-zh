# 开始

Strve 是一个可以将字符串转换为视图（用户界面）的 JavaScript 库。

Strve 不仅易于使用，而且可以灵活地拆解不同的代码块。使用模板字符串开发视图，主要是利用原生 JavaScript 的能力，可以更灵活地分离代码块，只关注 JavaScript 文件。

尝试 Strve 的方法是在浏览器中打开它，并按照示例学习一些基本用法。

## ES Modules

现代浏览器大多都已支持 ES 模块，因此我们可以像这样通过 CDN 以及 ES 模块使用 Strve：

::: info
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
        setData,
        createApp,
      } from "https://cdn.jsdelivr.net/npm/strve-js@6.0.0/dist/strve.full-esm.js";

      const state = {
        count: 0,
      };

      function add() {
        setData(() => {
          state.count++;
        });
      }

      function App() {
        return html`<h1 onClick=${add}>${state.count}</h1>`;
      }

      const app = createApp(App);
      app.mount("#app");
    </script>
  </body>
</html>
```

## UMD

你也可以选择使用 `<script>` 标签引入，这样就可以直接在浏览器中打开了。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Strve.js</title>
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/strve-js@6.0.0/dist/strve.full.prod.js"></script>
    <script>
      const { html, setData, createApp } = Strve;
      const state = {
        count: 0,
      };

      function add() {
        setData(() => {
          state.count++;
        });
      }

      function App() {
       return html`<h1 onClick=${add}>${state.count}</h1>`;
      }

      const app = createApp(App);
      app.mount("#app");
    </script>
  </body>
</html>
```
