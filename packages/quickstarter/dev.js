import esbuild from 'esbuild'
import fs from 'node:fs'

let exampleOnLoadPlugin = {
    name: 'example',
    setup(build) {
        console.log(build.initialOptions, 'options')
        build.initialOptions.outdir = 'lib'
        // Load ".txt" files and return an array of words
        build.onLoad({ filter: /\.txt$/ }, async (args) => {
            let text = await fs.promises.readFile(args.path, 'utf8')
            // 方法1
            return {
                contents: `export default ${JSON.stringify(text.split(/\s+/))}`,
            }
            // 方法2
            // return {
            //     contents: JSON.stringify(text.split(/\s+/)),
            //     loader: 'json',
            // }
        })
    },
}

esbuild.build({
    entryPoints: ['App.jsx'],
    bundle: true,
    outdir: 'dist',
    loader: {
        '.png': 'dataurl'
    },
    plugins: [
        exampleOnLoadPlugin
    ]
}).catch(() => process.exit(1))