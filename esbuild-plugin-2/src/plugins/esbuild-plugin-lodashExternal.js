const lodashExternal = () => { 
  return {
    name: 'lodash-plugin',
    setup(build) { 
      build.onResolve({ filter: /(^lodash)/ }, args => ({ 
        path: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm',
        external: true
      }))
    }
  }
}
export default lodashExternal