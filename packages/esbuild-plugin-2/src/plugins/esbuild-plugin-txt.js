import fs from 'fs/promises'
import path from "path";
const txtPlugin = () => { 
  return {
    name: 'txt-plugin',
    // setup(build) { 
    //   build.onLoad({ filter: /\.txt$/ }, async (args) => {
    //     console.log(args)
    //     let text = await fs.readFile(args.path, 'utf-8')
    //     const arr = text.split(/\s+/);
    //     const obj = arr.reduce((result, item) => {
    //       const [key, value] = item.split('=');
    //       result[key] = value;
    //       return result
    //     }, {});
    //     console.log(obj);

    //     return {
    //       contents: JSON.stringify(obj),
    //       loader: 'json'
    //     }
    //   })
    // }
    setup(build) { 
      build.onResolve({ filter: /\.txt$/ }, (args) => { 
        //组合成绝对路径
        const basePath = path.join(args.resolveDir, args.path);
        return {
          path: basePath,
          namespace: 'txt-ns'
        }
      })
      build.onLoad({ filter: /.*/,namespace: 'txt-ns'}, async (args) => {
        console.log(args)
        let text = await fs.readFile(args.path, 'utf-8')
        const arr = text.split(/\s+/);
        const obj = arr.reduce((result, item) => {
          const [key, value] = item.split('=');
          result[key] = value;
          return result
        }, {});
        console.log(obj);

        return {
          contents: JSON.stringify(obj),
          loader: 'json'
        }
      })
    }
  }
}
export default txtPlugin;