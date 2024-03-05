# 更新日志

::: tip
版本号虽然取用的是 Strve 的版本号，但是内容不仅仅含有 Strve 更新的内容，还有同期的其他官方工具的更新内容。
:::

## v6.7.1 (Latest)

- 代码重构与完善部分 API；
- 更新 [create-strve-app](https://www.npmjs.com/package/create-strve-app)；

## v6.6.6

- API 与用法整体优化与更新，更加易用与高效；
- 更新 [strve-router](https://www.npmjs.com/package/strve-router)；
- 更新 [create-strve-app](https://www.npmjs.com/package/create-strve-app)；

## v6.2.6

- 利用最长递增子序列优化 Diff 算法；
- 增加具名组件用法，引入 **"孤岛"** 特性；
- 事件处理取消`@`缩写；
- 更改 API`setData`、`domInfo`；
- 删除 API`defineCustomElement`、`propsData`；
- 删除内置属性`$props`、`$name`；
- 增加内置属性`$render`、`$id`；
- 增加 API`createStateFlow`、`registerComponent`；
- 发布 [strve-reactivity](https://www.npmjs.com/package/strve-reactivity)；
- 更新 [babel-plugin-strve](https://www.npmjs.com/package/babel-plugin-strve)；
- 更新 [babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve)；
- 更新 [strve-router](https://www.npmjs.com/package/strve-router)；
- 更新 [create-strve-app](https://www.npmjs.com/package/create-strve-app)；

## v6.0.2

- 删除 `useFirstKey`；
- 增加 `key` 属性，`key` 这个特殊的 attribute 主要作为 Vue 的虚拟 DOM 算法提示，在比较新旧节点列表时用于识别 vnode。内部采用双端 Diff 算法，效率更高；
- 删除静态标记`$key`；
- 增加内置属性`$ref`；
- 将 API `h` 改为 `html`；
- 根节点必须有且仅有一个，使用`<fragment></fragment>`标签；
- 更新 [babel-plugin-strve](https://www.npmjs.com/package/babel-plugin-strve)；
- 更新 [babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve)；
- 更新 [strve-router](https://www.npmjs.com/package/strve-router)；
- 更新 [create-strve-app](https://www.npmjs.com/package/create-strve-app)；
