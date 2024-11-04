# strveRv

::: tip
为了更好的阅读体验，下面的代码示例都使用 JSX 语法编写。
:::

## 介绍

Strve-rv 是一个用于在 Web 上构建用户界面的响应性库。

- 声明式渲染：我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。
- 响应性：自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。
- 组件化： 一个函数就是一个组件，可以根据应用规模任意组合。并且组件特有的 “孤岛特性”，使得将虚拟 DOM 树计算的级别控制在组件级别。
- 轻量级： 压缩后的文件大小不足 10k。
- 支持 [@vue/reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity) 所有 API。
- 支持 [StrveRouter](/tool/createStrveApp/)。

由 [@vue/reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity) 和 [strve-js](https://github.com/strveJs/strve) 提供支持。所以在使用 StrveRv 之前必须熟悉使用两者的用法。

## API

### defineComponent

定义组件。

第一个参数为配置对象，可传。其配置属性为 mount, 该配置属性用于挂载根组件。接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串。

第二个参数为函数，必传。返回 HTML 模版。函数的参数为一个对象，对象的属性为 content。

::: warning
这里需要注意的是，当我们使用其挂载根组件时，必须使用一个或多个`<component>`标签承载组件。
:::

```jsx
const Component1 = defineComponent(() => {
  return () => <h1>Hello Component1</h1>;
});

const Component2 = defineComponent(() => {
  return () => <h1>Hello Component2</h1>;
});

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <fragment>
        <component $is={Component1}></component>
        <component $is={Component2}></component>
      </fragment>
    );
  }
);
```

其中，我们可以利用 content 给组件定义数据，并且在你需要的时候使用它。

```jsx
const app = defineComponent(({ content }) => {
  content.data = {
    name: 'Strve',
  };

  return () => (
    <div>
      <h1>Hello Strve</h1>
    </div>
  );
});

console.log(app.data); // {name:'Strve'}
```

### onMounted

注册一个回调函数，在组件挂载完成后执行。

```jsx
defineComponent(() => {
  onMounted(() => {
    console.log('onMounted', 'about');
  });

  return () => (
    <fragment>
      <h1>About</h1>
    </fragment>
  );
});
```

### onUnmounted

注册一个回调函数，在组件实例被卸载之后调用。

```jsx
defineComponent(() => {
  onUnmounted(() => {
    console.log('onUnmounted', 'about');
  });

  return () => (
    <fragment>
      <h1>About</h1>
    </fragment>
  );
});
```

### domInfo

获取 DOM 信息。

```jsx
defineComponent(() => {
  const h1 = ref();

  function getDomInfo() {
    console.log('domInfo', domInfo.get(h1));
  }

  return () => (
    <fragment>
      <h1 $ref={h1} onClick={getDomInfo}>
        Hello
      </h1>
    </fragment>
  );
});
```

## 示例

### 单组件环境

```jsx
import { defineComponent, ref, reactive, watch, domInfo, computed } from 'strve-rv';

const Component1 = defineComponent(() => {
  const count = ref(1);

  function add() {
    count.value += 1;
  }

  const plusOne = computed(() => count.value + 1);

  return () => (
    <fragment>
      <h1 onClick={add}>{count.value}</h1>
      <p>{plusOne.value}</p>
    </fragment>
  );
});

const Component3 = defineComponent(() => {
  const count = ref(3);
  const obj = reactive({
    name: 'admin',
  });
  const h1 = ref();

  function add() {
    count.value += 1;
    obj.name = 'add';
    console.log('Component3', domInfo.get(h1));
  }

  return () => (
    <fragment>
      <h1 onClick={add} $ref={h1}>
        {count.value}
      </h1>
      <p>{obj.name}</p>
    </fragment>
  );
});

const Component2 = defineComponent(() => {
  const count = ref(2);
  const h1 = ref();

  function add() {
    count.value += 1;
    console.log('Component2', domInfo.get(h1));
  }

  watch(
    () => count.value,
    (v) => {
      console.log('watch', v);
    }
  );

  return () => (
    <fragment>
      <h1 onClick={add} $ref={h1}>
        {count.value}
      </h1>
      <component $is={Component3}></component>
    </fragment>
  );
});

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <fragment>
        <component $is={Component1}></component>
        <component $is={Component2}></component>
      </fragment>
    );
  }
);
```

### 多组件路由环境

```jsx
// home.jsx
import { defineComponent, ref, onMounted, onUnmounted } from 'strve-rv';
import { linkTo } from 'strve-router';
import { useMouse } from './mouse.js';

const component1 = () =>
  defineComponent(() => {
    const count = ref(1);

    function add() {
      count.value += 1;
    }
    onMounted(() => {
      console.log('onMounted', 'Component1');
    });
    onUnmounted(() => {
      console.log('onUnmounted', 'Component1');
    });

    return () => (
      <fragment>
        <h1 onClick={add}>{count.value}</h1>
      </fragment>
    );
  });

const home = () =>
  defineComponent(() => {
    const Component1 = component1();
    const { x } = useMouse();

    function goAbout() {
      linkTo({
        path: '/about',
        query: {
          id: 1,
          name: 'admin',
        },
      });
    }

    onMounted(() => {
      console.log('onMounted', 'home');
    });
    onMounted(() => {
      console.log('onMounted1', 'home1');
    });

    onUnmounted(() => {
      console.log('onUnmounted', 'home');
    });

    onUnmounted(() => {
      console.log('onUnmounted1', 'home1');
    });

    return () => (
      <fragment>
        <button onClick={goAbout}>goAbout</button>
        <h1>Home</h1>
        <div>{x.value}</div>
        <component $is={Component1}></component>
      </fragment>
    );
  });

export default home;
```

```jsx
// about.jsx
import { defineComponent, onMounted, onUnmounted, ref } from 'strve-rv';
import { linkTo, toParse } from 'strve-router';

const about = () =>
  defineComponent(({ content }) => {
    content.id = 'about';
    function goHome() {
      linkTo({
        path: '/',
      });
    }
    const count = ref(0);

    function add() {
      count.value++;
      content.id = 'about';
    }

    function getOption() {
      console.log(toParse());
    }

    onMounted(() => {
      console.log('onMounted', 'about');
    });

    onUnmounted(() => {
      console.log('onUnmounted', 'about');
    }, content);

    onUnmounted(() => {
      console.log('onUnmounted', 'about2');
    }, content);

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
        <h1 onClick={getOption}>About</h1>
        <h2 onClick={add}>{count.value}</h2>
      </fragment>
    );
  });

export default about;
```

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'strve-rv';

export function useMouse() {
  const x = ref(0);

  function update(event) {
    x.value = event.pageX;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x };
}
```
