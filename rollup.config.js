import pluginTypescript from "@rollup/plugin-typescript";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import * as path from "path";
import pkg from "./package.json";

const inputFiles = ["hook", "handleEvents"];

export default inputFiles.map((input) => ({
  input: `src/${input}.ts`,
  output: [
    {
      file: `${path.join("dist", input)}.js`,
      format: "cjs",
      exports: "default",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    pluginTypescript(),
    pluginCommonjs({
      extensions: [".js", ".ts"],
    }),
    babel({
      babelHelpers: "bundled",
      configFile: path.resolve(__dirname, ".babelrc.js"),
    }),
    pluginNodeResolve({
      browser: false,
    }),
    terser(),
  ],
}));
