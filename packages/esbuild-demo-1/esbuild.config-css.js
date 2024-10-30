import esbuild from "esbuild";

const config = {
  absWorkingDir: process.cwd(),
  platform: 'node',
  format: 'esm',
  assetNames: 'assets/[name]-[hash]',
  treeShaking: true,
  // publicPath: '/',
  logLevel: 'info',
  entryPoints: ['demo/Button.js'],
  outdir: './dist',
  bundle: true,
  minify: false,
  sourcemap: true,
  metafile: true,
  target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
  loader: {
    ".html": "copy",
    ".svg": "dataurl",
    ".png": "file",
    '.css': 'copy'
  },
};

await esbuild.build(config)