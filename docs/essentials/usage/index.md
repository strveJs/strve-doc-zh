# 用法

## 数据绑定

Strve 允许开发人员以声明方式将 DOM 绑定到底层实例的数据。

### 文本

数据绑定中文本绑定的形式是使用符号`${}`。

```js
const state = {
	msg: 'Hello',
};

function App() {
	return html`<h1>${state.msg}</h1>`;
}
```

### 表达式

使用符号 `${}` 中的表达式。

```js
const state = {
	a: 1,
	b: 2,
};

function App() {
	return html`<h1>${state.a + state.b}</h1>`;
}
```

## 属性绑定

使用符号 `${}` 将值绑定到属性 `value`。

```js
const state = {
	msg: 'Hello',
};

function App() {
	return html`<input type="text" value=${state.msg}/>`;
}
```

此外，你还可以绑定其他属性，例如 `class`。

```js
const state = {
	isRed: true,
	msg: 'Hello',
};

function App() {
	return html`<h1 class=${state.isRed ? 'red' : ''}>${state.msg}</h1>`;
}
```

如果你想绑定 `style` 属性，你也可以。

```js
const state = {
	msg: 'Hello',
	style: {
		color: 'red',
		fontSize: '40px',
	},
};

function App() {
	return html`<p style=${state.style}>${state.msg}</p>`;
}
```

## 条件渲染

使用符号 `${}`，仅当指令的表达式返回 `true` 值时才会显示标签。

```js
const state = {
	isShow: true,
};

function useShow() {
	setData(() => {
		state.isShow = !state.isShow;
	});
}

function App() {
	return html`
			<fragment>
				<button onClick=${useShow}>show</button>
				<div>
					${
						state.isShow
						? html`<p>Strve.js</p>`
						: html`<null></null>`
					}
				</div>
			 </fragment>
    `;
}
```

## 列表渲染

使用符号 `${}` 渲染基于数组的列表，使用数组的`map`方法来返回一个数组。

```js
const state = {
	arr: [1, 2],
};

function usePush() {
	setData(() => {
		state.arr.push(3);
	});
}

function App() {
	return html`
			<fragment>
				<button onClick=${usePush}>push</button>
				<ul>
				${state.arr.map((todo) => html`<li key=${todo}>${todo}</li>`)}
				</ul>
			</fragment>
    `;
}
```

::: warning
同一个父元素下的子元素必须具有唯一的 key。重复的 key 将会导致渲染异常。key 这个特殊的 attribute 主要作为 Vue 的虚拟 DOM 算法提示，在比较新旧节点列表时用于识别 vnode。
:::

## 事件处理

我们可以使用 `on` 指令来监听 DOM 事件并在事件触发时执行一些 JavaScript。 我们推荐使用这种驼峰式命名法，比如`onClick`。另外， `on` 指令可以缩写为`@`。

此外，你需要使用符号 `${}` 来绑定事件。

```js
const state = {
	msg: 'sayHello',
};

function useClick() {
	alert('hello');
}

function App() {
	return html`
			<fragment>
				<button onClick=${useClick}>${state.msg}</button>
				<button @click=${useClick}>${state.msg}</button>
			</fragment>
    `;
}
```

## 命名功能组件

我们更新组件数据时，不需要全量比较（比如下面的 h2、p 标签，它们不属于 Component1 的内容，所以不需要 Diff ），只需要更新组件中的数据即可。

这时候需要在`setData()`方法的第二个参数中传入一个对象，对象键为`name`，值为需要更新的函数组件。 另外，你还需要在父组件中，在函数组件外包裹一个`component`标签，并使用`$name`内置属性（内置属性的更多信息请看[内置属性](/essentials/usage/#内置属性)），该值为功能组件的名称。

```js
const state1 = {
	count: 0,
};

function add1() {
	setData(
		() => {
			state1.count++;
		},
		{
			name: Component1,
		}
	);
}

function Component1() {
	return html`
			<fragment>
				<h1>Component1</h1>
				<h1>${state1.count}</h1>
				<button onClick=${add1}>add1</button>
			</fragment>
    `;
}

function App() {
	return html`
			<fragment>
				<h2>txt1</h2>
				<div>
					<p>txt2</p>
					<component $name=${Component1.name}>
						${Component1()}
					</component>
				</div>
			</fragment>
    `;
}
```

## 内置属性

### $ref

`$ref` 属性可以引用一个 DOM 元素。 它用于在组件或 DOM 元素中引用其他元素。

```js
function add() {
	console.log(domInfo.h1); // <h1>Strve.js</h1>
}

function App() {
	return html`
			<fragment>
				<h1 $ref="h1">Strve.js</h1>
				<button onClick=${add}>Add</button>
			</fragment>
    `;
}

```

### $name

该属性需要用在内置标签`component`上，表示内部组件名称，必须与功能组件名称相同。

```js
const state1 = {
	count: 0,
};

function add1() {
	setData(
		() => {
			state1.count++;
		},
		{
			name: Component1,
		}
	);
}

function Component1() {
	return html`
			<fragment>
				<h1>${state1.count}</h1>
				<button onClick=${add1}>add1</button>
			</fragment>
    `;
}

function App() {
	return html`
            <component $name=${Component1.name}>
                ${Component1()}
            </component>
    `;
}
```

### $props

该属性与 [propsData](/essentials/api/#propsdata) 配合使用，例如需要在子组件中向父组件传递数据。

```js
// Son

let isShow = true;

function emitData() {
	isShow = !isShow;
	propsData.Component1(isShow);
}

function Component1() {
	return html`<h1 onClick=${emitData}>Son</h1>`;
}
```

```js
// Father

function useGetTit(v) {
	console.log(v); // false
}

function App() {
	return html`
            <component $name=${Component1.name} $props=${useGetTit}>
                ${Component1()}
            </component>
    `;
}
```

## 内置标签

### component

组件占位标签，它在标签内包裹了一个功能组件。

```js
function Component1() {
	return html`<h1>Hello</h1>`;
}

function App() {
	return html`
            <component $name=${Component1.name}>
                ${Component1()}
            </component>
    `;
}
```

### null

占位符标签，不会渲染到页面中。

```js
const state = {
	isShow: true,
};

function useShow() {
	setData(() => {
		state.isShow = !state.isShow;
	});
}

function App() {
	return html`
			<fragment>
				<button onClick=${useShow}>show</button>
				<div>
					${
						state.isShow
						? html`<p>Strve.js</p>`
						: html`<null></null>`
					}
				</div>
			</fragment>
    `;
}
```

### fragment

创建一个文档片段标签。它不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会对性能产生影响。

```js
const state = {
	x: 0,
	y: 0,
};

function App() {
	return html`
            <fragment>
                <h1>Mouse position is at: ${state.x}, ${state.y}</h1>
            </fragment>
    `;
}
```

## 组件模式

组件可以定义为三种模式，即：

- Class 模式；
- 构造函数模式；
- 原型模式；

**Class 模式**

```js
class About {
	constructor() {
		this.state = {
			msg: 'About',
		};
	}

	useChange = () => {
		setData(() => {
			this.state.msg = 'Changed';
		});
	};

	goHome = () => {
		linkTo('/');
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
```

**构造函数模式**

```js
function About() {
	const state = {
		msg: 'About',
	};

	function goHome() {
		linkTo('/');
	}

	function render() {
		return html`<h1 onClick=${goHome}>${state.msg}</h1>`;
	}

	return {
		render,
	};
}
```

**原型模式**

此模式具有缓存机制。

```js
const Home = function () {};
const home = Home.prototype;

home.state = {
	msg: 'Home',
	count: 0,
};

home.useAdd = function () {
	setData(() => {
		home.state.count++;
	});
};

home.goAbout = function () {
	linkTo('/about');
};

home.render = function () {
	return html`
			<fragment>
				<button onClick=${home.goAbout}>GoAbout</button>
				<h1 onClick=${home.useAdd}>${home.state.count}</h1>
				<h2>${home.state.msg}</h2>
			</fragment>
    `;
};
```

## Web Components

自定义元素的主要好处是，它们可以在使用任何框架，甚至是在不使用框架的场景下使用。当你面向的最终用户可能使用了不同的前端技术栈，或是当你希望将最终的应用与它使用的组件实现细节解耦时，它们会是理想的选择。

使用[`defineCustomElement`](/essentials/api/#definecustomelement)API 即可注册原生自定义元素。

另外，需要注意一点，我们在更新内部自定义元素数据时，比如像下面这样，内部 Virtual Dom 不需要全量对比，可以使用`setData`API中`customElement`字段。

```js
const data = {
	count: 1
}

function changeCount() {
	setData(() => {
		data.count++;
	}, {
		customElement: myCom2,
		name: 'useCustomElement'
	})
}

const myCom2 = {
	id: "myCom2",
	template: () => {
		return html`<h2 @click=${changeCount}>${data.count}</h2>`
	},
}

defineCustomElement(myCom2, 'my-com2');

function App() {
	return html`
			<fragment>
				<h1>1</h1>
				<my-com2></my-com2>
			</fragment>
	`
}
```