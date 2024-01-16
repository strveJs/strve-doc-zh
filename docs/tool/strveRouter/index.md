# strveRouter

::: tip
为了更好的阅读体验，下面的代码示例都使用 JSX 语法编写。
:::

StrveRouter 是 Strve 的官方路由管理器。 它与 Strve 的核心深度集成，轻松构建单页应用程序。

## 开始

我们可以根据以下步骤来初步学习。

**1. 创建 home 页面**

```jsx
// home.jsx
import { defineComponent } from 'strve-js';
import { linkTo } from 'strve-router';
import logo from '../assets/logo.png';

const home = () =>
  defineComponent(({ setData }) => {
    const state = {
      msg: 'hello',
      arr: [1, 2],
      count: 3,
    };

    function goAbout() {
      linkTo({
        path: '/about',
        query: {
          id: 1,
          name: 'maomin',
        },
      });
    }

    function useChange() {
      setData(() => {
        state.msg = 'world';
        state.count++;
        state.arr.unshift(state.count);
      });
    }

    return () => (
      <fragment>
        <button onClick={goAbout}>goAbout</button>
        <h1>Home</h1>
        <div class='logo-inner'>
          <img src={logo} class='logo' />
        </div>
        <p onClick={useChange}>{state.msg}</p>
        <ul>
          {state.arr.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </fragment>
    );
  });

export default home;
```

**2. 创建 about 页面**

```jsx
// about.jsx
import { defineComponent } from 'strve-js';
import { linkTo, toParse } from 'strve-router';

const about = () =>
  defineComponent(() => {
    function goHome() {
      linkTo({
        path: '/',
      });
    }

    function getOption() {
      console.log(toParse());
    }

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
        <h1 onClick={getOption}>About</h1>
      </fragment>
    );
  });

export default about;
```

**3. 配置路由信息**

```js
// router/index.js
import { resetView } from 'strve-js';
import { initRouter } from 'strve-router';

import home from '../template/home';
import about from '../template/about';

const router = initRouter(
  [
    {
      path: '/',
      template: home,
    },
    {
      path: '/about',
      template: about,
    },
  ],
  resetView
);

export default router;
```

**4. 挂载页面**

```jsx
// main.js
import { defineComponent } from 'strve-js';
import router from './router/index';
import './styles/app.css';

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => <component $is={router.view()}></component>;
  }
);
```

## 安装

```bash
npm install strve-router
```

## 使用

你可以使用[CreateStrveApp](/tool/createStrveApp/)，选择 **strve-apps** 或者 **strve-jsx-apps** 模板。

## API

### initRouter()

第一个参数是一个数组对象，即需要注册的路由组件，`path`属性表示组件的路径，`template`属性是导入的组件。

第二个参数需要传递给`resetView` API，匹配到对应路径的页面会相应更新。 例如，在此处的路由器文件夹中创建一个 `index.js` 文件。

```js
// router/index.js
import { resetView } from 'strve-js';
import { initRouter } from 'strve-router';

import home from '../template/home';
import about from '../template/about';

const router = initRouter(
  [
    {
      path: '/',
      template: home,
    },
    {
      path: '/about',
      template: about,
    },
  ],
  resetView
);

export default router;
```

路由匹配的组件会被渲染到`view()`方法所在的地方，通常放在主页面入口文件（如`main.js`）下。

```jsx
// main.js
import { defineComponent } from 'strve-js';
import router from './router/index';
import './styles/app.css';

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => <component $is={router.view()}></component>;
  }
);
```

### linkTo()

如果需要跳转到对应的页面，使用`linkTo()`方法，可以传递对应的路径和要传递的参数，也可以直接传递路径字符串。

```jsx
import { defineComponent } from 'strve-js';
import { linkTo } from 'strve-router';

const about = () =>
  defineComponent(() => {
    function goHome() {
      linkTo({
        path: '/',
      });
    }

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
      </fragment>
    );
  });

export default about;
```

### forward()

向前跳转 1 页。

### back()

跳回 1 页。

### go(n)

在页面中跳转 n 页。

### toParse

如果执行路由参数的操作，则要获取参数对象。 直接执行`toParse()`方法可以获取对象信息。

```jsx
import { defineComponent } from 'strve-js';
import { linkTo, toParse } from 'strve-router';

const about = () =>
  defineComponent(() => {
    function goHome() {
      linkTo({
        path: '/',
      });
    }

    function getOption() {
      console.log(toParse());
    }

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
        <h1 onClick={getOption}>About</h1>
      </fragment>
    );
  });

export default about;
```

### routerVersion

可以获取 StrveRouter 的版本信息。
