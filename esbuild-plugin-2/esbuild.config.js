import esbuild from "esbuild";
import time from "./src/plugins/esbuild-plugin-time.js";
import clear from "./src/plugins/esbuild-plugin-clear.js";
import html from "./src/plugins/esbuild-plugin-html.js";
import lodashExternal from "./src/plugins/esbuild-plugin-lodashExternal.js";
import txt from "./src/plugins/esbuild-plugin-txt.js";
import markdown from "./src/plugins/esbuild-plugin-markdown.js";
import path from "path";
// console.log(process);
const productionMode = "production" === process.argv[2];
// console.log(productionMode);
// console.log(process.cwd());


const myPlugin = () => ({
  name: 'my-plugin',
  setup(build) {
    console.log(build.initialOptions)
    build.onStart(() => { 
      console.log(`--- onStart ---`)
    })
    build.onResolve({filter:/\.css$/}, (args) => { 
      console.log(`--- onResolve ---`)
      console.log(args)
      const basePath = path.join(args.resolveDir, args.path)
      console.log(basePath);
      return {
        path: basePath,
      }
    })
    build.onEnd((result) => { 
      console.log(result)
      console.log(`--- onEnd ---`)
    })
    build.onDispose(() => { 
      console.log(`--- onDispose ---`)
    })
  }
})


const config = {
  // 指定项目根目录
  absWorkingDir: process.cwd(),
  // 输出环境 node or browser
  platform: 'browser',
  // 输出格式 iife, esm, cjs 默认是 iife，如果是 node 环境，默认为 cjs
  format: 'esm',
  // 指定静态文件名字
  assetNames: 'assets/[name]-[hash]',
  // 入口文件指定名称
  // entryNames: '[dir]/[name]-[hash]',
  // 摇树优化
  treeShaking: true,
  // 公共目录
  publicPath: '/',
  // 是否开启代码分割 还在迭代开发中
  // splitting: true,
  // 日志级别 silent, error, warning, info, debug,verbose 默认是 silent
  // 日志现在只能在build函数下运行才有效果
  logLevel: 'info',
  // 代码删除
  drop: productionMode ? ['debugger', 'console'] : [],
  // 外部文件处理
  // external:['lodash'],
  //入口列表
  entryPoints: ['src/App.tsx'],
  //输出目录
  outdir: './dist',
  //是否需要打包
  bundle: true,
  //是否需要压缩
  minify: false,
  //是否需要sourcemap
  sourcemap: true,
  // 是否需要生成打包元信息
  metafile: true,
  //指定语言版本和目标环境
  target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
  //指定loader
  loader: {
    ".svg": "dataurl",
    ".png": "file"
  },
  plugins:[time(),clear(),html(),lodashExternal(),txt(),markdown()],
};

if (productionMode) { //生产环境
  const result = await esbuild.build(config);
  //打印详细的元信息
  const text = await esbuild.analyzeMetafile(result.metafile, {
    verbose:true
  })

  console.log(text);
}
else { 
  const ctx = await esbuild.context(config)
  //监听文件变化
  await ctx.watch();
  // 启动服务
  ctx.serve({
    port: 3000,
    host: "localhost",
    servedir: "./dist"
  })
    .then(server => { 
      console.log(`server running at http://${server.host}:${server.port}`)
    })
    .catch (err=> { 
      console.log(err);
      process.exit(1);
    })
}