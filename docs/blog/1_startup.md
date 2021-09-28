# 1. 搭建项目

## 背景

作为 Java 与 jQuery 为主的过时工程师，去年（2020）的时候曾经用过一段时间的 Vue2 和 TS，虽然不是很熟练，但是也算是稍微对前端框架有了些理解。

（虽然到现在还不太清楚 webpack 之类的打包工具到底怎么用……前端真复杂啊……）

最近摸鱼的时候，想说是不是花点时间看看 React 是怎么用的，但是……学不动了……

索性还是把 Vue 捡起来再看看好啦，毕竟不是出了 Vue3 嘛，学起来应该轻松点。

说了这么多，其实就是想说，这个项目里面可能有很多初学者会犯的错，但是我想着把过程一起记录下来，就当一个学习的记录吧。

所以初步的打算是：

- 使用 Vue CLI 创建 Vue3（Vuex，Vue Router 如果有必要再说）

  > 更新：后来改成了 Vite

- 前端使用 [Tailwind](https://tailwindcss.com/)（不过需要学习）

  > 更新：也许会改成使用 [windicss](https://windicss.org/)

- 使用 [localForage](https://localforage.github.io/localForage/) 做前端存储

- 未来考虑加入 Electron

哦对，顺便也是在练习标准指法……

## 创建模板

在重看 Vue 文档的时候，我想到：既然我也不会用 webpack，那我要不就直接用 Vite 来建项目了？所以我就开始看起 Vite 的文档了……

首先使用 yarn 创建了 vue-ts 的模板：

```bash
yarn create vite CheckingBoard --template vue-ts
```

虽然它会把我的文件夹清空掉……我下次不先在 github 上建 repo 了……

然后安装依赖和启动：

```bash
cd CheckingBoard
yarn
yarn dev #http://localhost:3000/
```

然后我翻了一下模板的代码，发现代码基本上和 Vue2 的类似。

下一步，我需要再了解这些内容（都是读文档的事情）：

- `vite.config.ts` 的配置
- `env.d.ts` 的内容（主要是了解一下 TS 里 reference 的作用）
- Vue3 的 `setup()` 、`ref()`（以及 `<script setup>`）

## 配置 VSCode

为了配合 Vue3 和 TS ，官方推荐的 VSCode 插件从 Vetur 转到了 Volar，所以需要重新安装一下，并且把 Vetur 禁用了。

## 部署到 Github page

一开始考虑的是，项目完全依赖前端，所以只需要托管在 Github page 上，然后就可以使用了。

所以在继续读文档之前，先试试看能不能搭起来……

> 更新：看完 Vite 文档之后，发现 [这里](https://cn.vitejs.dev/guide/static-deploy.html) 已经写的很清楚了……所以将之前的文档折叠了。
>
> 然后稍微修改了一下代码，又交了个 commit：
>
> - 在 vite.config.ts 把 base 统一了
> - 试了一下 import.meta.env.BASE_URL

<details>
<summary>【之前自己摸索的步骤】</summary>

### build

首先参考 [文档](https://cn.vitejs.dev/guide/#command-line-interface) 运行：

```bash
yarn build
```

在 `./dist` 文件夹下可以看到产物，但是双击 `./dist` 下的 `index.html` 并不能打开，应该是路径问题，需要部署到服务器上。

### deploy

要把 `./dist` 的内容部署到 Github page 上，首先需要创建一个新的分支，然后把 `./dist` 的内容放到这个分支下。

我一开始用的是最蠢的办法，先创建分支 `gh-pages`（基本都是用的这个名），然后只留下 `./dist` 的内容再 push。

但是在配置完 Github page 之后，打开 https://aasdkl.github.io/CheckingBoard/ ，发现还是白屏，依然是路径报错。

搜了一下，首先是参考了[这个回答](https://stackoverflow.com/a/56638750)，创建 `vue.config.js` 来动态配置 `publicPath`

但是重新 build 之后，资源的路径并没有变……感觉配置没有成功生效，不确定是什么原因。

于是我首先就在 Vue 的文档里搜了一下 `publicPath`，但是什么都没有。但是在 Vite 里面，搜到了[相关的内容](https://cn.vitejs.dev/guide/build.html#public-base-path)，我才恍然大悟：

哦！原来 `vue.config.js` 文件是给 webpack 使用的，如果用 Vue CLI 才需要这个文件

> 更新：读完文档之后发现这个 base 是可以写在 vite.config.ts 里的，所以最后的 deploy.sh 其实没有做其他的修改

然后试着重新 Build 并且部署，终于成功了！

```bash
yarn build --base='CheckingBoard'
```

最后，依然是参考[那个回答](https://stackoverflow.com/a/56638750)的 `deploy.sh`，修改了一下

```diff
- npm run build
+ yarn build --base='CheckingBoard'
```

然后只需要运行 `sh deploy.sh` 就可以直接 push 到 `gh-pages `下。

不过后续会想是不是参考[这个](https://gist.github.com/cobyism/4730490#gistcomment-1851849)，把脚本加到 npm script 里面

> 更新：Github Actions 部署了就没必要啦~

但首先，还是要读文档啊！

> 更新：对对对！！！读文档！！！

</details>

## 使用 Github Actions 部署

截止到今天，没有在 [Vite 文档](https://cn.vitejs.dev/guide/static-deploy.html) 中看到怎么使用 Github action 来自动部署……所以只能自己摸索了。

由于在文档的 `deploy.sh` 脚本下面有这么一句话：

> TIP
>
> 你也可以在你的 CI 中配置该脚本，使得在每次推送代码时自动部署。

所以在写 Github Actions 的 `.yml` 文件的时候，我都是想着应该是要能够运行这个脚本的（即一定要有这么一句）：

```yaml
bash ./deploy.sh
```

由于之前没有用过 Github Actions，也不清楚这个 CI 的原理，所以虽然从 [Actions market](https://github.com/marketplace) 里面找到了 [GitHub Pages action](https://github.com/marketplace/actions/github-pages-action) ，但也不太会用，不知道要怎么运行 `deploy.sh`……

随着一边试错，一边搜索，看到了 [这一篇](https://github.com/bosens-China/blog/issues/49) 文章，说了怎么用 Github Actions 来定时运行 bash 脚本。（而且 `deploy.sh` 还是一样的……）

不过做到一半的时候，我忽然明白过来，这个 Github 提供的 CI 也还是在虚拟机里面重新 deploy，那么，是不是可以不用 `deploy.sh` 脚本呢？

重新认真看一下这个 [GitHub Pages action](https://github.com/marketplace/actions/github-pages-action) ，才发现后面有 Vue 的模板……把 `.yml` 文件拷贝过来试了试，这次成功了。

现在只要 push 代码的时候，就能够自动更新 `gh-pages` 分支了。

> - [一堆更新 deploy.yml 的 commit](https://github.com/aasdkl/CheckingBoard/commits/setup-removed)
> - [最终的 deploy.yml](https://github.com/aasdkl/CheckingBoard/blob/setup-removed/.github/workflows/deploy.yml)
