# strveRouter

Strve Router 是 Strve 的官方路由管理器。 它与 Strve 的核心深度集成，轻松构建单页应用程序。

## 开始

尝试 Strve Router 的最简单方法是使用直接导入 CDN 链接。 你可以在浏览器中打开它并按照示例学习一些基本用法。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>strve-router</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module">
      import {
        html,
        createApp,
        setData,
      } from "https://cdn.jsdelivr.net/npm/strve-js@6.0.2/dist/strve.full-esm.prod.js";
      import {
        initRouter,
        linkTo,
      } from "https://cdn.jsdelivr.net/npm/strve-router@4.0.1/dist/strve-router.esm.js";

      class Home {
        constructor() {
          this.state = {
            count: 0,
          };
        }

        useAdd = () => {
          setData(() => {
            this.state.count++;
          });
        };

        goAbout = () => {
          linkTo("/about");
        };

        render = () => {
          return html`
                  <fragment>
                    <button onClick=${this.goAbout}>goAbout</button>
                    <h1 onClick=${this.useAdd}>${this.state.count}</h1>
                  </fragment>
          `;
        };
      }

      class About {
        constructor() {
          this.state = {
            msg: "About",
          };
        }

        useChange = () => {
          setData(() => {
            this.state.msg = "Changed";
          });
        };

        goHome = () => {
          linkTo("/");
        };

        render = () => {
          return html`
                  <fragment>
                    <button onClick=${this.goHome}>goHome</button>
                    <h1 onClick=${this.useChange}>${this.state.msg}</h1>
                  </fragment>
          `;
        };
      }

      const router = initRouter(
        [
          {
            path: "/",
            template: [Home, "render"],
          },
          {
            path: "/about",
            template: [About, "render"],
          },
        ],
        setData
      );

      function App() {
        return html`<div class="main">${router.view()}</div>`;
      }

      const app = createApp(App);
      app.mount("#app");
    </script>
  </body>
</html>

```

## 安装

```bash
npm install strve-router
```

## 使用

你可以使用[CreateStrveApp](/tool/createStrveApp/)，选择 **strve-apps** 或者 **strve-jsx-apps** 模板。

## API

### initRouter()

第一个参数是一个数组对象，即需要注册的路由组件，`path`属性表示组件的路径，`template`属性是一个数组，第一项是导入的组件（按照[组件模式](/essentials/usage/#组件模式))，第二项是渲染的组件函数的名称，比如下面的`render`。

第二个参数需要传递给`setData` API，匹配到对应路径的页面会相应更新。 例如，在此处的路由器文件夹中创建一个 `index.js` 文件。

```js
import { setData } from "strvejs";
import { initRouter } from "strve-router";

import Home from "../template/home";
import About from "../template/about";

const router = initRouter(
  [
    {
      path: "/",
      template: [Home, "render"],
    },
    {
      path: "/about",
      template: [About, "render"],
    },
  ],
  setData
);

export default router;
```

路由匹配的组件会被渲染到`view()`方法所在的地方，通常放在主页面入口文件（如`App.js`）下。

```js
// App.js

import { html } from "strvejs";
import router from "./router/index";

export default function App() {
  return html`
          <div class='inner'>
            ${router.view()}
          </div>
  `;
}
```

### linkTo()

如果需要跳转到对应的页面，使用`linkTo()`方法，可以传递对应的路径和要传递的参数，也可以直接传递路径字符串。

```js
import { html, setData } from "strvejs";
import { linkTo } from "strve-router";

export default class Home {
  goAbout = () => {
    linkTo({
      path: "/about",
      query: {
        id: 1,
        name: "maomin",
      },
    });

    // linkTo("/about");
  };

  render = () => {
    return html`<button onClick=${this.goAbout}>goAbout</button>`;
  };
}
```

### forward()

向前跳转 1 页。

### back()

跳回 1 页。

### go(n)

在页面中跳转 n 页。

### toParse

如果执行路由参数的操作，则要获取参数对象。 直接执行`toParse()`方法可以获取对象信息。

```js
import { html, setData } from "strvejs";
import { linkTo, toParse } from "strve-router";

export default class About {
  goHome = () => {
    linkTo({
      path: "/",
    });
  };

  getOption = () => {
    console.log(toParse());
  };

  render = () => {
    return html`
            <fragment>
              <button onClick=${this.goHome}>goHome</button>
              <h1 onClick=${this.getOption}>About</h1>
            </fragment>
    `;
  };
}
```

### routerVersion

可以获取 Steve Router 的版本信息。
