import esbuild from "esbuild";
let ts = "let x: number = 1;console.log(x);";
(async () => {
  let result = await esbuild.transform(ts, {
    loader: "ts"
  });
  console.log(result);
  eval(result.code);
})();