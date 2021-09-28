# 2. 搭建项目

## Electron 模板

考虑到未来想加上 Electron，但不知道 Vite 导入 Electron 的时候会不会有很多坑，就在纠结是不是要先加上 Electron 来重新建一个项目……

但是想了一下，做成桌面版好像也不是那么必要……而且毕竟只是个纯前端应用，未来要迁移到 Electron 应该也不是太难，所以还是先放弃了。

不过先码一下，到时候可能会参考这个库来试着引入。

> [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)



## 项目配置

没想到一个月之后才继续……期间把文档都过了一遍，然后看了些 Vite 的 plugin……但果然还是月底比较闲啊哈哈哈。

稍微翻了一下过去搬砖的时候做的 Electron 项目，打算先配几个：

- 路径别名 (Path alias)
- 代码检查和格式化 (lint & prettier)
- 引入 Pug 和 Windi CSS

### 配置路径别名 (Path alias)

简而言之，就是把 import 时候的路径缩短：

```diff
// 在这里，我们先将路径 src/components 简化为 components
-import HelloWorld from 'src/components/HelloWorld.vue'
+import HelloWorld from 'components/HelloWorld.vue'
```

虽然我觉得有 IDE 自动补全，缩写不是太需要了，但是看起来比较清爽一点。

就这么把路径缩短之后，会导致：

1. `yarn dev` 报错（build 的时候无法找到文件）
2. IDE 无法跳转到对应文件


#### 解决编译报错

先参考 Vite 文档。Vite 提供了 [resolve.alias](https://cn.vitejs.dev/config/#resolve-alias) 选项：

```ts
// vite.config.ts
export default defineConfig({
  // ...
  resolve: {
    alias: {
      "@": "/src",
      "components": "/src/components",
    }
  },
})
```

除了 `components` 的别名以外，还特别加了一个 `@` 别名指向了 `/src`，这是在 webpack 里面默认设置的。虽然应该不会被用到，但是也加上了。

现在运行 `yarn dev` 就不会报错了。


#### 解决 IDE 无法跳转

IDE 无法跳转的原因应该是：TypeScript 无法解析文件的路径。

我们可以通过 [paths](https://www.typescriptlang.org/tsconfig#paths) 选项来告诉 TS 别名：

```json
    // tsconfig.json
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "components/*": ["src/components/*"],
    }
```

虽然和 Vite 语法稍微有一点点不同，但是还是很类似的。

另外，由于使用的不是相对路径，我们还需要显式声明一个 `baseUrl`。不然会报下面的 warning：

> tsconfig.json:14:14: warning: Non-relative path "src/*" is not allowed when "baseUrl" is not set (did you forget a leading "./"?)


#### 更好的方案防止重复代码

> 1. `yarn dev` 报错（build 的时候无法找到文件）
> 2. IDE 无法跳转到对应文件

我们会注意到，为了解决上面两个问题，我们需要在 `vite.config.ts` 和 `tsconfig.json` 下分别写**类似的**定义。

但是这两个文件里面的定义其实非常相似，所以我们可以在 `vite.config.ts` 里面，稍微写点代码，来使用 `tsconfig.json` 里面的值。

写起来虽然不难，但我也发现了几个库可以用的：

> - [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)
>
>   先发现的库，所以项目里面用的是这个。
>
> - [vite-aliases](https://github.com/subwaytime/vite-aliases)
>
>   功能比较多，能够自动生成 `src` 下所有目录的 alias。
>
>   但考虑到使用 ts，无论如何都要修改 `tsconfig.json`，所以不会用到自动生成的功能。
>
> - 以 [rollup-plugin-typescript-paths](https://github.com/simonhaenisch/rollup-plugin-typescript-paths) 为例的 rollup 插件
>
>   注意到 vite 是兼容 rollup 的部分插件的，所以也可以使用这些插件。
>
>   > 附：[vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) 作者解释为什么要再造一个轮子 ([来源](https://github.com/aleclarson/vite-tsconfig-paths/issues/3#issuecomment-753226974))
>   >
>   > ... 没有一个 Rollup 插件像我这样使用的是 `tsconfig-paths` 包 ...
>   >
>   > ... since none of the Rollup plugins use the `tsconfig-paths` package like I do...

`vite-tsconfig-paths` 这个库用起来非常简单：

```ts
// vite.config.ts
export default defineConfig({
  // ...
  // resolve: {
  //   alias: {
  //     "@": "/src",
  //     "components": "/src/components",
  //   }
  // },
  plugins: [
    vue(),
    tsconfigPaths({ loose: true }) // <-- 只需要这个
  ]
})
```

这里由于是 Vue 项目，所以必须加上 `loose: true` 这个参数。

> 根据 [项目代码](https://github.com/aleclarson/vite-tsconfig-paths/blob/master/src/index.ts#L101-L105)，如果没有这个参数，就只能对 .tsx 后缀的文件来生成别名。

---

### 配置代码检查与格式化 (lint & prettier)

然后通过引入 ESLint 和 Prettier，来检查代码和格式化。

其中 Prettier 用于处理格式问题(Formatting rules)，而 ESLint 处理质量问题(Code-quality rules)。（见 [prettier 文档](https://prettier.io/docs/en/comparison.html)）

> 当然，也是因为没有试过 Prettier 就想试一下……

#### 配置 Prettier（代码格式化）

1. **安装依赖**

   ```bash
   npm install --save-dev eslint eslint-plugin-vue
   #or
   yarn add -D prettier
   ```

2. **添加配置文件**

   `.prettierrc.json` 文件用于定义具体规则，目前为空采用默认的：

   ```json
   // .prettierrc.json
   {}
   ```

   `.prettierignore` 用于定义要被忽略的文件，类似 `.gitignore`：

   ```yml
   # .prettierignore
   dist # 忽略 dist 文件夹（即 outputDir）
   ```

3. **加上运行脚本（可选）**

   为了方便运行，可以在 `package.json` 中加入运行脚本：

   ```json
   // package.json
   "scripts": {
     "format:prettier": "prettier --write .",
   },
   ```

   在后面的部分会介绍如何在 VS Code 中，当保存时自动格式化。

#### 配置 ESLint（代码检查）

1. **安装依赖**

   由于项目使用了 Vue 和 TS，而且又需要把代码格式化的部分委托给 Prettier，所以需要增加的依赖比较多：

   ```bash
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue eslint-config-prettier
   #or
   yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue eslint-config-prettier
   ```

   基本依赖：

   - eslint

   - [@nabla/vite-plugin-eslint](https://github.com/nabla/vite-plugin-eslint)（可选）- 这个插件能把原本只在命令行显示的 Lint 错误，显示在了浏览器页面上。

   TS 相关（参考 [@typescript-eslint 的说明](https://github.com/typescript-eslint/typescript-eslint#packages-included-in-this-project)）：

   - @typescript-eslint/parser - 替换 ESLint 的默认解析器来解析 TS
   - @typescript-eslint/eslint-plugin - 补充给 ESLint 的有关 TS 的 lint 规则

   Vue 相关：

   - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) - 官方 ESlint 插件 (内部使用了 [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser))

   Prettier 相关：

   - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - 关闭 ESLint 中所有不必要的，或可能与 Prettier 起冲突的规则

     > 注：有的教程或者模板会引入 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)，但根据 [Prettier 文档](https://prettier.io/docs/en/integrating-with-linters.html#notes)，这个插件是为了将 Prettier 作为 ESLint 的插件来使用，过去 IDE 对 Prettier 支持不够的时候可能会比较方便，但现在如果不是要 Lint 文档的话，就不是很必要。

2. **添加配置文件**

   `.eslintrc.js` 文件用于定义具体规则，详细信息见注释链接：

   ```js
   // .eslintrc.js
   module.exports = {
     // https://eslint.org/docs/user-guide/configuring/configuration-files#using-configuration-files
     root: true,
     // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
     env: {
       browser: true,
       node: true,
       es6: true,
     },
     // https://eslint.vuejs.org/user-guide/#the-variables-used-in-the-template-are-warned-by-no-unused-vars-rule
     globals: {
       defineProps: "readonly",
       defineEmits: "readonly",
       defineExpose: "readonly",
       withDefaults: "readonly",
     },
     // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
     parser: "vue-eslint-parser",
     parserOptions: {
       parser: "@typescript-eslint/parser",
     },
     extends: [
       // https://eslint.org/docs/rules/
       "eslint:recommended",
       // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs
       "plugin:@typescript-eslint/recommended",
       // https://eslint.vuejs.org/user-guide/#bundle-configurations
       "plugin:vue/vue3-recommended",
       // https://github.com/prettier/eslint-config-prettier#installation
       "prettier",
     ],
     // https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/docs/getting-started/linting/README.md#configuration
     plugins: ["@typescript-eslint"],
     rules: {}, // 自定义规则，暂时为空
   };
   ```

   `.eslintignore` 用于定义要被忽略的文件，类似 `.gitignore`：

   ```yml
   # .eslintignore
   dist # 忽略 dist 文件夹（即 outputDir）
   ```

3. **加上运行脚本（可选）**

   为了方便运行，可以在 `package.json` 中加入运行脚本：

   ```json
   // package.json
   "scripts": {
     "format": "yarn format:prettier & yarn format:lint",
     "format:lint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue"
   },
   ```

#### 配置 IDE 自动格式化

对于 VS Code 来说，首先下载扩展 [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。

随后打开 VS Code 设置界面，在**工作区**创建设置：

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["typescript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

其余 IDE，详见 [Prettier 文档](https://prettier.io/docs/en/editors.html)

---

### 引入 Pug 和 Windi CSS
