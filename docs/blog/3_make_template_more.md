# 3. 搭建项目（Pug + Windi CSS）

## Pug（未使用）

之前使用过一段时间的 [Pug](https://pugjs.org/api/getting-started.html)，感觉还是挺方便的。

但是因为代码检查的问题，最后还是没有使用。

### 代码检查的问题

需要注意的是，目前还没有一个能比较好的支持 pug 模板下的 vue 的 linter。

即：[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) 暂时还不支持 Pug（主要是 [vue-eslint-parser](https://github.com/vuejs/vue-eslint-parser) 目前还不支持）。

> 见：https://github.com/vuejs/vue-eslint-parser/issues/29

issue 里面有提到一个 [eslint-plugin-vue-pug-sfc](https://github.com/Shinigami92/eslint-plugin-vue-pug-sfc)，但是目前还是测试阶段。

或者可以考虑另一种方案，使用 [pug-to-html](https://github.com/leo-buneev/pug-to-html) 先把 `Pug` 转换成 `Html`， 这样 `eslint-plugin-vue` 就可以使用了。

总而言之，如果不是太需要 lint vue 的话，还是可以使用 pug 的。

### 引入 Pug

根据 [这个 issue](https://github.com/vitejs/vite/issues/17#issuecomment-658829114)，我们只需要引入依赖：

```bash
npm install pug --save-dev
#or
yarn add -D pug
```

然后在 vue template 中加上 `lang="pug"` 就能使用了：

```diff
-<template>
+<template lang="pug">
```

但是，由于项目使用了 [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) ，他在支持 pug 上有点问题（详见 [issue](https://github.com/aleclarson/vite-tsconfig-paths/issues/38)）

所以目前还需要修改 `tsconfig.json`：

```diff
-"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
+"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "src/**/*.js"]
```

### 配置 Pug Prettier

使用 [@prettier/plugin-pug](https://prettier.github.io/plugin-pug/)，只需要加上依赖就可以使用了：

```bash
npm install @prettier/plugin-pug --save-dev
#or
yarn add -D @prettier/plugin-pug
```

## Electron 模板（挖个坑）

考虑到未来想加上 Electron，但不知道 Vite 导入 Electron 的时候会不会有很多坑，就在纠结是不是要先加上 Electron 来重新建一个项目……

但是想了一下，做成桌面版好像也不是那么必要……而且毕竟只是个纯前端应用，未来要迁移到 Electron 应该也不是太难，所以还是先放弃了。

不过先码一下，到时候可能会参考这个库来试着引入。

> [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)
