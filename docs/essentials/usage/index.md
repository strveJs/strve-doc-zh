# 用法

::: tip
为了更好的阅读体验，下面的代码示例都使用 JSX 语法编写。
:::

## 数据绑定

Strve 允许开发人员以声明方式将 DOM 绑定到底层实例的数据。

### 文本

```jsx
const state = {
	msg: 'Hello',
};

function App() {
	return h1>{state.msg}</h1>
}
```

### 表达式

```jsx
const state = {
  a: 1,
  b: 2,
};

function App() {
  return <h1>{state.a + state.b}</h1>;
}
```

## 属性绑定

```jsx
const state = {
  msg: 'Hello',
};

function App() {
  return <input type='text' value={state.msg} />;
}
```

```jsx
const state = {
  isRed: true,
  msg: 'Hello',
};

function App() {
  return <h1 class={state.isRed ? 'red' : ''}>{state.msg}</h1>;
}
```

```jsx
const state = {
  msg: 'Hello',
  style: {
    color: 'red',
    fontSize: '40px',
  },
};

function App() {
  return <p style={state.style}>{state.msg}</p>;
}
```

## 条件渲染

仅当指令的表达式返回 `true` 值时才会显示标签。

```jsx
const state = {
  isShow: true,
};

function useShow() {
  setData(() => {
    state.isShow = !state.isShow;
  });
}

function App() {
  return (
    <fragment>
      <button onClick={useShow}>show</button>
      <div>{state.isShow ? <p>Strve.js</p> : <null></null>}</div>
    </fragment>
  );
}
```

## 列表渲染

渲染基于数组的列表，使用数组的`map`方法来返回一个数组。

```jsx
const state = {
  arr: [1, 2],
};

function usePush() {
  setData(() => {
    state.arr.push(3);
  });
}

function App() {
  return (
    <fragment>
      <button onClick={usePush}>push</button>
      <ul>
        {state.arr.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </fragment>
  );
}
```

::: warning
同一个父元素下的子元素必须具有唯一的 key。重复的 key 将会导致渲染异常。key 这个特殊的 attribute 主要作为 Strve 的虚拟 DOM 算法提示，在比较新旧节点列表时用于识别 vnode。
:::

## 事件处理

我们可以使用 `on` 指令来监听 DOM 事件并在事件触发时执行一些 JavaScript。 我们推荐使用这种驼峰式命名法，比如`onClick`。

```jsx
const state = {
  msg: 'sayHello',
};

function useClick() {
  alert('hello');
}

function App() {
  return (
    <fragment>
      <button onClick={useClick}>{state.msg}</button>
    </fragment>
  );
}
```

## 具名组件

Strve 应用程序是由 组件 组成的。一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

在 Strve 中，组件就是一个函数。如果你给它唯一且具体的名字，那么它就被称为具名组件。

```jsx
function myComponent() {
  let [MyCom, render] = [registerComponent()];

  const state = {
    count: 50,
  };

  function useChange() {
    setData(() => {
      state.count--;
    }, [MyCom, render]);
  }

  return (render = () => (
    <fragment $id={MyCom}>
      <h1 onClick={useChange}>{state.count}</h1>
    </fragment>
  ));
}
```

我们封装了一个`myComponent`组件，组件名为`MyCom`。那么，我们在哪里复用或者使用组件呢？

```jsx
function Home() {
  const state = {
    msg: 'hello',
  };
  let render;

  function useChange() {
    setData(() => {
      state.msg = 'world';
    });
  }

  return (render = () => (
    <fragment>
      <p onClick={useChange}>{state.msg}</p>
      <component $render={myComponent} />
    </fragment>
  ));
}
```

Strve 内部的渲染系统是基于虚拟 DOM 构建的，虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后利用 Diff 算法来比对新老数据，将真实的 DOM 与之保持同步。

如何虚拟 DOM 树过于庞大，使得 Diff 计算时间大于 16.6ms，那么就可能造成性能的卡顿。具名组件有一个特性就是 **”孤岛“**。何为“孤岛”，孤岛就是在 Strve 应用中我们可以理解成一个独立的模块。将一个庞大的虚拟 DOM 树分解成很多独立的模块，这样 Diff 计算时间就会控制在模块级别，大大缩减了计算的时间，提高了性能。

::: tip
符合具名组件的编码规范，Strve 内部将自动启动组件模块化精确更新。
:::

## 内置属性

### $ref

`$ref` 属性可以引用一个 DOM 元素。 它用于在组件或 DOM 元素中引用其他元素。

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

### $render

该属性需要用在内置标签`component`上，渲染组件。

```jsx
function Home() {
  const state = {
    msg: 'hello',
  };
  let render;

  function useChange() {
    setData(() => {
      state.msg = 'world';
    });
  }

  return (render = () => (
    <fragment>
      <p onClick={useChange}>{state.msg}</p>
      <component $render={myComponent} />
    </fragment>
  ));
}
```

### $id

组件标识，属性值为注册的组件名。

::: warning
当我们使用具名组件时，必须在根节点处使用内置属性`$id`。
:::

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

## 内置标签

### component

组件标签，用于渲染组件。

```jsx
function Home() {
  const state = {
    msg: 'hello',
  };
  let render;

  function useChange() {
    setData(() => {
      state.msg = 'world';
    });
  }

  return (render = () => (
    <fragment>
      <p onClick={useChange}>{state.msg}</p>
      <component $render={myComponent} />
    </fragment>
  ));
}
```

### null

空标签，不会显示在页面中。

```jsx
const state = {
  isShow: true,
};

function useShow() {
  setData(() => {
    state.isShow = !state.isShow;
  });
}

function App() {
  return (
    <fragment>
      <button onClick={useShow}>show</button>
      <div>{state.isShow ? <p>Strve</p> : <null></null>}</div>
    </fragment>
  );
}
```

### fragment

创建一个文档片段标签。它不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会对性能产生影响。

::: warning
根组件仅且只有一个，所以你会在文档中很多地方看到它，被用作根组件。
:::

```jsx
const state = {
  x: 0,
  y: 0,
};

function App() {
  return (
    <fragment>
      <h1>
        Mouse position is at: {state.x}, {state.y}
      </h1>
      <h2>Hello!</h2>
    </fragment>
  );
}
```
