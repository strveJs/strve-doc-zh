# strveReactivity

::: tip
为了更好的阅读体验，下面的代码示例都使用 JSX 语法编写。
:::

独立运行的可响应性 Strve。

## 介绍

由 [@vue/reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity) 和 [strve-js](https://github.com/strveJs/strve) 提供支持的自定义元素 JavaScript 库。

主要特性有以下几个：

- Web Components
- Hooks
- Reactivity API
- Props
- Emit
- Slot
- Styles
- Automatic registration component
- Virtual DOM

## API

```js
// strve-reactivity API
export {
  resetView,
  createApp,
  nextTick,
  domInfo,
  onMounted,
  onUnmounted,
  watchProps,
  registerComponent,
  defineComponent,
};
// @vue/reactivity API
export * from './reactivity.js';
```

## 示例

### 初始化

```js
// main.js
import { createApp } from 'strve-reactivity';
import register from './components/register';

import App from './App';

register();
createApp(App).mount('#app');
```

### 应用入口

```jsx
// App.jsx
export default () => <my-component></my-component>;
```

### 注册父组件

```jsx
// MyComponent.jsx
import { ref, defineComponent, reactive } from 'strve-reactivity';

export const MyComponent = defineComponent(() => {
  const items = reactive([
    {
      id: 1,
      tit: 'A',
    },
    {
      id: 2,
      tit: 'B',
    },
  ]);
  const count = ref(4);
  const increase = () => {
    items.unshift({
      id: count.value++,
      tit: 'C',
    });
  };

  return () => (
    <fragment>
      <button onclick={increase}>increase</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.id}</span>
            <span>-</span>
            <span>{item.tit}</span>
          </li>
        ))}
      </ul>
      <my-child></my-child>
    </fragment>
  );
});
```

### 注册子组件

```jsx
// MyChild.jsx
import { defineComponent, reactive, onMounted, onUnmounted } from 'strve-reactivity';

export const MyChild = defineComponent(() => {
  const state = reactive({ count: 0, msg: '' });
  const increase = () => {
    state.count++;
  };

  onMounted(() => {
    console.log('child mounted');
  });

  onUnmounted(() => {
    console.log('child unmounted');
  });

  return () => (
    <fragment>
      <p>{state.msg}</p>
      <p>{state.count}</p>
      <button onClick={increase}>increase</button>
    </fragment>
  );
});
```

### 全局注册

```js
// register.js
import { registerComponent } from 'strve-reactivity';
import { MyComponent } from './MyComponent';
import { MyChild } from './MyChild';

// global registration
export default function register() {
  registerComponent('my-child', MyChild);
  registerComponent('my-component', MyComponent);
}
```

## 其他示例

还有其他关于`strve-reactivity`的用法，可以前往[example](https://github.com/strveJs/strve-reactivity/tree/main/example)。
