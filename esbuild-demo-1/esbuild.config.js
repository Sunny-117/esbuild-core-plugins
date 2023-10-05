import esbuild from "esbuild";
// console.log(process);
const productionMode = "production" === process.argv[2];
console.log(productionMode);
console.log(process.cwd());

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
  //入口列表
  entryPoints: ['src/App.tsx', 'src/index.html'],
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
    ".html": "copy",
    ".svg": "dataurl",
    ".png": "file"
  },
};

if (productionMode) { //生产环境
  await esbuild.build(config)
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