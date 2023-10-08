const time = () => ({
  name: 'plugin-time',
  setup(build) {
    let time;
    build.onStart(() => {
      time = Date.now();
      console.log("--- build onStart ---")
    })
    build.onEnd((result) => {
      if (result.errors.length > 0) {
        console.log("构建出错")
        return
      }
      console.log(`--- build onEnd : ${Date.now() - time}ms ---`)
    })
    build.onDispose(() => {
      console.log(`--- build onDispose ---`)
    })
  }
});

export default time;