import fs from "fs/promises";
import path from "path";

const development = "development" === process.argv[2];

const htmlPlugin = () => ({
  name: "plugin-html",
  setup(build) {
    build.onEnd(async (result) => {
      if (result.errors.length > 0) true;

      //获取metafile
      const { metafile } = result;

      //因为js和css可能有多个，所以最好先用数组存放js和css
      const scripts = []; //<script src='xxx' type='module'></script>
      const links = [];

      if (metafile) {
        const { outputs } = metafile;
        //获取地址，其实就是outputs中的key
        const assets = Object.keys(outputs);

        assets.forEach((asset) => {
          //获取文件名后缀
          asset = asset.substring(asset.lastIndexOf("/") + 1);
          if (asset.endsWith(".js")) {
            scripts.push(createScript(asset));
          } else if (asset.endsWith(".css")) {
            links.push(createLink(asset));
          }
        });

        //拼接html
        const templateHTML = generateHTML(scripts, links);
        const basePath = build.initialOptions.outdir
          ? build.initialOptions.outdir
          : process.cwd();
        //拼接路径
        const templatePath = path.join(basePath, "index.html");

        //写入文件
        await fs.writeFile(templatePath, templateHTML);
      }
    });
  },
});

const createScript = (src) => `<script type="module" src="${src}"></script>`;
const createLink = (src) => `<link rel="stylesheet" href="${src}">`;
const generateHTML = (scripts, links) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  ${links.join("\n")}
  </head>
<body>
  <div id="root"></div>
</body>
${scripts.join("\n")}
${
  development
    ? `<script>
    new EventSource('/esbuild').addEventListener('change',()=>location.reload());
  </script>`
    : ""
}
</html>
`;

export default htmlPlugin;
