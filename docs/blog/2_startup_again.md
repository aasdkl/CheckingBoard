# 2. 搭建项目

## Electron 模板

考虑到未来想加上 Electron，但不知道 Vite 导入 Electron 的时候会不会有很多坑，就在纠结是不是要先加上 Electron 来重新建一个项目……

但是想了一下，做成桌面版好像也不是那么必要……而且毕竟只是个纯前端应用，未来要迁移到 Electron 应该也不是太难，所以还是先放弃了。

不过先码一下，到时候可能会参考这个库来试着引入。

> [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)



## 项目配置

没想到一个月之后才开始继续……期间把文档都过了一遍，然后看了些 Vite 的 plugin……但果然还是月底比较闲啊哈哈哈。

稍微翻了一下过去搬砖的时候做的 Electron 项目，打算先简单配一些：

- 路径别名 (Path alias)
- 代码检查 (lint)

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

### 配置代码检查 (lint))
