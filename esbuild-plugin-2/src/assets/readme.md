# esbuild自定义插件

插件开发其实就是基于原有的体系结构中进行`扩展`和`自定义`。 Esbuild 插件也不例外，通过 Esbuild 插件我们可以扩展 Esbuild 原有的路径解析、模块加载等方面的能力，并在 Esbuild 的构建过程中执行一系列自定义的逻辑。

[esbuild](https://esbuild.github.io) 插件是一个带有`name`和`setup`函数的对象，当然很多时候，我们都会以函数的的方式返回这个对象。其中，`name` 的值是一个字符串，它表示你的插件名称 。 `setup` 的值是一个函数，它会被传入一个参数 `build`（对象）。

```javascript
export interface Plugin {
  name: string
  setup: (build: PluginBuild) => (void | Promise<void>)
}
```

`build` 对象上会暴露5个钩子函数：`onStart`、`onResolve` 、 `onLoad`、`onEnd`和`onDispose`。

## esbuild 插件运行机制

build对象上的5个钩子函数，其实就是esbuild构建过程中的几个阶段我们需要去扩展执行的内容