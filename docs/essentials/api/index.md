# API

::: tip
为了更好的阅读体验，下面的代码示例，除了`html` API 使用标签模版编写， 其他都使用 JSX 语法编写。
:::

## createApp

- 参数：

  - `Function`

- 详情：

传入一个函数，也就是需要渲染的模板函数。

```jsx
function App() {
  return <h1>Hello</h1>;
}

createApp(App).mount('#app');
```

### mount

- 参数：

  - `HTMLElement | String`

- 详情：

挂载根组件。该方法接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串。

## html

- 参数：

  - `Function`

- 详情：

` html`` `是一个标签函数，标签函数的语法是直接在函数名后跟一个模板字符串。 例如，你可以直接在模板字符串中编写 HTML 标签。

```js
function App() {
  return html`<h1>Hello</h1>`;
}
```

::: tip
如果你使用的是 VSCode 编辑器，你可以去商店下载 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 插件，
这个插件可以使 HTML 模板字符串高亮显示。
:::

## setData

- 参数：

  - `Function`
  - `Array` (可选)

- 详情：

第一个参数是一个函数。 函数体需要执行会改变页面状态的值，比如下面例子中的`state.msg`。

```jsx
const state = {
  msg: '1',
};

function useChange() {
  setData(() => {
    state.msg = '2';
  });
}

function App() {
  return <p onClick={useChange}>{state.msg}</p>;
}
```

第二个参数（可选）为数组，数组长度为 2。

| Index | 功能                                 |
| ----- | ------------------------------------ |
| 0     | 第一个数组项是需要注册的组件名       |
| 1     | 第二个数组项是被渲染的页面模版方法名 |

::: tip
当我们根据规范传入第二个参数时，就自动启动了具名组件的“孤岛特性”。
:::

我们这里先简单介绍下，有一个宏观的了解。

```js
function Home() {
  let [homeCom, render] = [registerComponent()];
  let count = 0;

  function add() {
    setData(() => {
      count++;
    }, [homeCom, render]);
  }

  return (render = () => (
    <fragment $id={homeCom}>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
      <input value={count} />
    </fragment>
  ));
}
```

你可能已经有了些疑问，先别急，在后续的文档中我们会详细介绍每一个细节。

## registerComponent

- 详情：

注册组件名，返回唯一的组件名。

```jsx
function Home() {
  let [homeCom, render] = [registerComponent()];
  let count = 0;

  function add() {
    setData(() => {
      count++;
    }, [homeCom, render]);
  }

  return (render = () => (
    <fragment $id={homeCom}>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
      <input value={count} />
    </fragment>
  ));
}
```

## onMounted

- 参数：

  - `Function`

- 详情：

生命周期钩子函数：节点挂载完成时触发。

```jsx
function Home() {
  let count = 0;
  let render;

  onMounted(() => {
    console.log('HOME mount');
  });

  function add() {
    setData(() => {
      count++;
    });
  }

  return (render = () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  ));
}
```

## onUnmounted

- 参数：

  - `Function`

- 详情：

生命周期钩子函数：当页面被销毁时调用。

```js
onUnmounted(() => {
  console.log('onUnmounted!');
});
```

## nextTick

- 参数:

  - `Function`

- 详情：

在更改一些数据后立即使用它以等待 DOM 更新。

```jsx
function Home() {
  let count = 0;
  const h1Ref = Object.create(null);
  let styleColor = 'color:red';
  let render;

  function add() {
    setData(() => {
      count++;
      styleColor = 'color:green';
      nextTick(() => {
        console.log(domInfo.get(h1Ref)); // <h1 style="color:green">1</h1>
      });
    });
  }

  return (render = () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1 $ref={h1Ref} style={styleColor}>
        {count}
      </h1>
    </fragment>
  ));
}
```

## domInfo

- 详情：

可以获取 DOM 信息，返回 `WeakMap` 对象。可以在 DOM 中的使用 `$ref` 中定义一个属性，这个属性值必须是一个引用类型，通常为`Object.create(null)`。

```jsx
function Home() {
  const h1Ref = Object.create(null);
  let render;

  function view() {
    nextTick(() => {
      console.log(domInfo.get(h1Ref)); // <h1>1</h1>
    });
  }

  return (render = () => (
    <fragment>
      <button onClick={view}>Btn</button>
      <h1 $ref={h1Ref}>1</h1>
    </fragment>
  ));
}
```

## version

- 详情：

直接获取 Strve 的版本号。

## createStateFlow

- 详情：

一个轻量级的状态管理器。通常方式是传入一个对象，对象属性包括`state`、`mutations`、`actions`。

| 属性      | 功能         |
| --------- | ------------ |
| state     | 存放数据     |
| mutations | 同步更新数据 |
| actions   | 异步操作数据 |

下面我们简单举一个示例。

```js
// store.js
import { createStateFlow } from 'strve-js';

const store = new createStateFlow({
  state: {
    count: 0,
    user: '',
  },
  // for synchronization
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
  // for asynchronous
  actions: {
    fetchUser: async (context) => {
      const user = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: 'John Doe', age: 30 });
        }, 1000);
      });
      context.commit('setUser', user);
    },
    increment: (context) => {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    },
  },
});

export default store;
```

```jsx
// App.jsx
import { setData } from 'strve-js';
import store from './store.js';

function getUserInfo() {
  setData(() => {
    store.dispatch('fetchUser').then(() => {
      console.log(store.state.user); // { name: 'John Doe', age: 30 }
    });
  });
}

function add() {
  setData(() => {
    store.commit('increment');
  });
}

function App() {
  return (
    <fragment>
      <h1 onClick={getUserInfo}>getUserInfo</h1>
      <button onClick={add}>Add</button>
      <h1>{store.state.count}</h1>
    </fragment>
  );
}
```
