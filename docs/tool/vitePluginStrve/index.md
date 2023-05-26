# vitePluginStrve

[vitePluginStrve](https://www.npmjs.com/package/vite-plugin-strve)是一款Vite插件，用于编译以`.strve`结尾的文件。

## 安装

```bash
npm i vite-plugin-strve -D
```

## 使用

```js
// vite.config.js
import { defineConfig } from 'vite';
import { strve } from 'vite-plugin-strve';

export default defineConfig({
	plugins: [strve()],
});
```