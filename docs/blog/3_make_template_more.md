# 3. 搭建项目（UI 框架选择 / Pug / Electron）

上一部分试着搭建了一个模板，而这一部分主要针对实际的开发项目，包括：

- [UI 框架选择](#UI-框架选择)
- [icon 相关](#icon-相关)
- [自动 import](#自动-import)

另外，还顺便记录了一些暂时没用到的配置：

- [VueUse](#VueUse-尚未使用)
- [Pug](#Pug-未使用)
- [Electron](#Electron-模板-挖个坑)

## UI 框架选择

之前只用过 Sass / Less 之类的预编译框架，看最近 CSS 框架比较流行，就想着找机会试试看。

然而比较纠结的一点是，毕竟不是专业做前端的，我对 CSS 并不是那么熟练，在没有设计稿的情况下，选择一个 **UI 库** 显然更加适合。

于是根据对 UI 的喜好，找了三个 UI 库，稍微做了一下对比：

| 库                                              | 偏好                                                                                                    | 不足                                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Naive UI](https://www.naiveui.com/zh-CN/light) | 1. 中文文档，且详细<br/> 2. 默认的 UI 比较喜欢<br/> 3. 基于 Vue 3 <br/> 4. 支持按需引入（Tree Shaking） | 1. 无法尝试使用 Tailwind                                                                                                       |
| [daisyUI](https://daisyui.com/)                 | 1. 基于 Tailwind，实际就是一些预设的 @apply                                                             | 1. 比较原生，需要手动处理事件 <br/> 2. 尚不支持按需引入（Tree Shaking）[参考](https://github.com/windicss/windicss/issues/517) |
| [headless UI](https://headlessui.dev/)          | 1. 基于 Tailwind，但只有部分需要交互的组件，其余的需要通过 Tailwind 自行实现                            | 1.需要自行实现 btn 之类的基本组件                                                                                              |

综合来看，Tailwind 作为 原子 CSS，似乎更倾向于我们自行实现基本组件的 UI。

其实也可以通过 [Tailwind 的 prefix](https://tailwindcss.com/docs/configuration#prefix)，来同时使用 **UI 库 + Tailwind**，但终归不是常用的方法，所以作罢。

所以最后决定还是使用 Tailwind 和 [headless UI](https://headlessui.dev/) 来开发。

### 配置 Windi CSS (Tailwind) + headless UI

> 在 Tailwind CSS v2.1 之前，需要通过 Windi CSS 来支持按需生成。
>
> 而在之后的版本中，Tailwind CSS 推出了 [`JIT mode`](https://tailwindcss.com/docs/just-in-time-mode)
>
> 关于两者之间的关系，可以参考 Windi CSS 这边的[这个回答](https://github.com/windicss/windicss/discussions/176)
>
> 回答里面的[那篇 blog](https://tailwindcss.com/docs/just-in-time-mode)，作者在[知乎上也聊了聊](https://www.zhihu.com/pin/1355023913307484160)

配置只需要按照 [Windi CSS](https://windicss.org/integrations/vite.html) 的文档就可以了，`headless UI` 只需要进行安装依赖就能使用。

1. **安装依赖**

   ```bash
   npm i -D vite-plugin-windicss windicss @headlessui/vue
   #or
   yarn add -D vite-plugin-windicss windicss @headlessui/vue
   ```

2. **添加配置文件**

   创建默认配置文件 `windi.config.ts` （[也可以命名为 `tailwind.config.ts`](https://windicss.org/guide/configuration.html#config-file)）

   ```ts
   // windi.config.ts
   import { defineConfig } from "windicss/helpers";

   export default defineConfig({
     /* configurations... */
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {},
     },
     plugins: [],
   });
   ```

3. **注册插件并且使用**

   首先还是在 `vite.config.ts` 中注册插件：

   ```ts
   // vite.config.ts
   import WindiCSS from "vite-plugin-windicss";

   export default {
     plugins: [WindiCSS()],
   };
   ```

   然后再在 `main.ts` 下 import，把 Tailwind 引入到 CSS 中（[与 Tailwind CSS 的方式不同](https://windicss.org/guide/migration.html#base-styles)）：

   ```diff
   // main.ts
   +import 'virtual:windi.css'
   ```

4. **测试**

   运行 `yarn dev`，可以发现原来首页的 CSS 被改变了。

   可以通过修改配置文件 `windi.config.ts` （见 [文档](https://windicss.org/guide/extractions.html#preflight)）来禁止 Tailwind CSS 修改默认样式：

   ```diff
   // windi.config.ts
   export default defineConfig({
   + preflight: false,
   });
   ```

### 配置 IDE 自动提示

根据 [文档](https://windicss.org/guide/installation.html#editors)，目前只有 VSCode 可以通过扩展 [WindiCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) 来智能提示。

随后根据 [插件文档](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense#configuration) 添加设置：

```json
"editor.quickSuggestions": {
  "strings": true
}
```

## icon 相关

想要实现按需导入图标，有三个比较方便的库可以选择：

- [heroicons](https://github.com/tailwindlabs/heroicons)

  Tailwind 官方提供的 [icon 库](https://heroicons.com/)，以 tag 来区分:：

  ```html
  <script setup>
    import { ArrowDownIcon } from "@heroicons/vue/solid";
  </script>

  <template>
    <ArrowDownIcon class="h-15 w-15" />
  </template>
  ```

- [@windicss/plugin-icons](https://github.com/windicss/plugins/tree/main/packages/icons)

  `Windi CSS` 的 plugin，支持 [css.gg](https://css.gg/app) 下的图标，使用 class 来区分:

  ```html
  <i class="icon-arrow-down h-15 w-15" />
  ```

- [unplugin-icons](https://github.com/antfu/unplugin-icons)

  更为**通用**的库，支持 [iconify](https://icon-sets.iconify.design/) 下所有的图标库（包括 heroicons），以 tag 来区分:

  ```html
  <script setup>
    import IconArrowDown from "~icons/gg/arrow-down";
  </script>

  <template>
    <IconArrowDown class="h-15 w-15" />
  </template>
  ```

| 库                                                                                     | 偏好                                     | 不足               |
| -------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------ |
| [heroicons](https://github.com/tailwindlabs/heroicons)                                 | 官方提供                                 | 不一定有符合的图标 |
| [@windicss/plugin-icons](https://github.com/windicss/plugins/tree/main/packages/icons) | 传统的使用方式                           | 不一定有符合的图标 |
| [unplugin-icons](https://github.com/antfu/unplugin-icons)                              | 图标够多 <br/> 有 VS Code 插件支持可视化 | 版本还不稳定       |

考虑到 icon 的数量，最后选择了通用的 [unplugin-icons](https://github.com/antfu/unplugin-icons)

### 配置 unplugin-icons

1. **安装依赖**

   ```bash
   npm i -D unplugin-icons
   #or
   yarn add -D unplugin-icons
   ```

2. **注册插件**

   然后需要在 `vite.config.ts` 中注册插件。

   其中 `autoInstall` 这个配置会在 build 的时候，自动将用到的 icon 库加到依赖里面。

   ```ts
   // vite.config.ts
   import Icons from "unplugin-icons/vite";

   export default {
     plugins: [
       // ...
       Icons({
         autoInstall: true,
       }),
     ],
   };
   ```

3. **使用**

   现在可以使用 icon 了：

   ```html
   <script setup>
     // cannot find module error will be shown
     import IconArrowDown from "~icons/gg/arrow-down";
   </script>

   <template>
     <IconArrowDown class="h-15 w-15" />
   </template>
   ```

4. **创建声明 `.d.ts`**

   注意到在 `import` 的时候，会报错说找不到模块，所以还需要给加上类型声明：

   ```ts
   // env.d.ts
   declare module "~icons/*" {
     const icon: string;
     export default icon;
   }
   ```

### 配置 IDE 自动提示

VSCode 可以通过扩展 [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) 来智能提示。

## 自动 import

为了减轻使用 component 时候的重复输入，可以用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 这个插件帮我们自动生成 import：

1. **安装依赖**

   ```bash
   npm i -D unplugin-vue-components
   #or
   yarn add -D unplugin-vue-components
   ```

2. **注册插件**

   然后需要在 `vite.config.ts` 中注册插件。

   由于项目中还引入了 [headless UI](https://headlessui.dev/) 和 [unplugin-icons](https://github.com/antfu/unplugin-icons)，所以还需要加上 `HeadlessUiResolver` 和 `IconsResolver` 来支持自动按需引入：

   ```ts
   // vite.config.ts
   import Components from "unplugin-vue-components/vite";
   import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
   import IconsResolver from "unplugin-icons/resolver";

   export default {
     plugins: [
       // ...
       Components({
         resolvers: [HeadlessUiResolver(), IconsResolver()],
       }),
     ],
   };
   ```

3. **使用**

   现在可以删除 `App.vue` 下组件和 icon 的 import 了：

   ```diff
   -import HelloWorld from "components/HelloWorld.vue";
   -import IconArrowDown from "~icons/gg/arrow-down";

   <template>
   -  <IconArrowDown class="h-15 w-15" />
   +  <i-gg-arrow-down class="h-15 w-15" />
   </template>
   ```

---

## VueUse (尚未使用)

- [VueUse](https://github.com/vueuse/vueuse)

## Pug (未使用)

之前使用过一段时间的 [Pug](https://pugjs.org/api/getting-started.html)，感觉还是挺方便的。

但是因为代码检查的问题，最后还是没有使用上。

### 代码检查的问题

需要注意的是，截至目前还没有一个能比较好的支持 pug 模板下的 vue 的 linter。

即：[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) 暂时还不支持 Pug（主要是 [vue-eslint-parser](https://github.com/vuejs/vue-eslint-parser) 目前还不支持）。

> 见：https://github.com/vuejs/vue-eslint-parser/issues/29

issue 里面有提到一个 [eslint-plugin-vue-pug-sfc](https://github.com/Shinigami92/eslint-plugin-vue-pug-sfc)，但是目前还是测试阶段。

或者可以考虑另一种方案，使用 [pug-to-html](https://github.com/leo-buneev/pug-to-html) 先把 `Pug` 转换成 `Html`， 这样 `eslint-plugin-vue` 就可以使用了。

总而言之，**如果不是太需要 lint vue 的话，还是可以使用 pug 的**。

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

<details>
<summary>
【已修复的问题】

~~但是，由于项目使用了 [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) ，他在支持 pug 上有点问题（详见 [issue](https://github.com/aleclarson/vite-tsconfig-paths/issues/38)）...~~

</summary>

所以目前还需要修改 `tsconfig.json`：

```diff
-"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
+"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "src/**/*.js"]
```

</details>

### 配置 Pug Prettier

使用 [@prettier/plugin-pug](https://prettier.github.io/plugin-pug/)，只需要加上依赖就可以使用了：

```bash
npm install @prettier/plugin-pug --save-dev
#or
yarn add -D @prettier/plugin-pug
```

## Electron 模板 (挖个坑)

考虑到未来想加上 Electron，但不知道 Vite 导入 Electron 的时候会不会有很多坑，就在纠结是不是要先加上 Electron 来重新建一个项目……

但是想了一下，做成桌面版好像也不是那么必要……而且毕竟只是个纯前端应用，未来要迁移到 Electron 应该也不是太难，所以还是先放弃了。

不过先码一下，到时候可能会参考这个库来试着引入。

> [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)
