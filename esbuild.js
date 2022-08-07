const path = require('path');
const esbuild = require("esbuild");
const pkg = require(path.resolve('./package.json'));
const { sassPlugin } = require("esbuild-sass-plugin");
const pluginImage = require("esbuild-plugin-inline-image");

esbuild.serve(
{
      servedir: "dist",
      port: 3001,
    },{
  entryPoints: ["./src/index.js"],
  outfile: "./dist/app.js",
  bundle: true,
  loader: {
	".js": "jsx",
  },
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {}), '~antd/dist/antd.css'],
  plugins: [pluginImage(), sassPlugin()],
}).catch(() => process.exit());