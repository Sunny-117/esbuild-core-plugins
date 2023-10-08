import path from 'path';
import fs from 'fs/promises'
import { marked } from 'marked';
const markdownPlugin = () => { 
  return {
    name: 'markdown-plugin',
    setup(build) { 
      build.onResolve({filter:/\.md$/}, args => { 
        if (args.resolveDir === "") return;
        return {
          path: path.isAbsolute(args.path) ? args.path : path.join(args.resolveDir, args.path),
          namespace: 'markdown-namespace'
        }
      })
      build.onLoad({filter:/.*/,namespace:'markdown-namespace'}, async (args) => { 
        const markdownContent = await fs.readFile(args.path, 'utf-8');

        const markdownHTML = marked.parse(markdownContent);

        return {
          contents: JSON.stringify({
            html: markdownHTML,
            raw: markdownContent,
            filename:path.basename(args.path)
          }),
          loader:"json"
        }
      })
    }
  }
}

export default markdownPlugin;