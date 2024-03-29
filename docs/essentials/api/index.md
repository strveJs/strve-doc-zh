# API

::: tip
为了更好的阅读体验，下面的代码示例，除了`html` API 使用标签模版编写， 其他都使用 JSX 语法编写。
:::

## defineComponent

定义组件。

第一个参数为配置对象，可传。其配置属性为`mount`, 该配置属性用于挂载根组件。接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串。

第二个参数为函数，必传。返回 HTML 模版。函数的参数为一个对象，对象的属性分别为`content`、`setData`。

```jsx
defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <div>
        <h1>Hello Strve</h1>
      </div>
    );
  }
);
```

其中，我们可以利用`content`给组件定义数据，并且在你需要的时候使用它。

```jsx
const app = defineComponent(({ setData, content }) => {
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

## setData

修改页面数据。

第一个参数为函数，必传。执行回调函数，进而修改关联的页面数据。
第二个参数为上下文环境，在外部作用域必传，在内部作用域不传。

**内部作用域：**

```jsx
defineComponent(({ setData }) => {
  let count = 0;

  function add() {
    setData(() => {
      count++;
    });
  }

  return () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  );
});
```

**外部作用域：**

```jsx
import { defineComponent, setData } from 'strve-js';

let count = 0;

const app = defineComponent(() => {
  return () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  );
});

function add() {
  setData(() => {
    count++;
  }, app);
}
```

## html

` html`` `是一个标签函数，标签函数的语法是直接在函数名后跟一个模板字符串。 例如，你可以直接在模板字符串中编写 HTML 标签。

在 JSX 语法环境下，不会用到此 API。

```js
defineComponent(() => {
  let count = 0;

  return () => html`<p>${count}</p>`;
});
```

::: tip
如果你使用的是 VSCode 编辑器，你可以去商店下载 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 插件，
这个插件可以使 HTML 模板字符串高亮显示。
:::
