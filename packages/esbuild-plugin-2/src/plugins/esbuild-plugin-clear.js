import { existsSync } from 'fs';
import { rimraf } from 'rimraf'

const clear = () => ({
  name: 'plugin-clear',
  setup(build) { 
    build.onStart(() => { 
      const { outdir, outfile } = build.initialOptions;
      if(outdir && existsSync(outdir)) {
        rimraf.sync(outdir);
      }
      if(outfile && existsSync(outfile)) {
        rimraf.sync(outfile);
      }
    })
  }
})

export default clear;