import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";
import { wasmLoader } from "esbuild-plugin-wasm";

const isDevelopment = process.env.NODE_ENV === "development";

const buildOptions = {
  logLevel: "info",
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: !isDevelopment,
  format: "esm",
  platform: "browser",
  target: "es2022",
  outdir: "./dist",
  plugins: [
    wasmLoader(),
    // copy the index.html and styles.css as they are
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./public/*"],
        to: ["./dist"],
      },
    }),
  ],
};

const run = async () => {
  try {
    const ctx = await esbuild.context(buildOptions);

    if (!isDevelopment) {
      await esbuild.build(buildOptions);
      console.log("Build complete");

      process.exit(0);
      return;
    }

    // DEV server
    await ctx.serve({
      port: 8000,
      servedir: "./dist",
    });
    await ctx.watch();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
