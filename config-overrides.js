const {
  override,
  fixBabelImports,
  addWebpackPlugin,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const path = require("path");
const addCustomize = () => (config) => {
  if (process.env.NODE_ENV === "production") {
    config.devtool = false;
    if (config.plugins) {
      config.plugins.push(new BundleAnalyzerPlugin());
      config.plugins.push(new AntdDayjsWebpackPlugin());
    }
    const splitChunksConfig = config.optimization.splitChunks;
    Object.assign(splitChunksConfig, {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: "vendors",
          priority: -10,
        },
        common: {
          name: "common",
          minChunks: 2,
          minSize: 30000,
          chunks: "all",
        },
        mobxBase: {
          test: (module) => {
            return /mobx|mobx-react/.test(module.context);
          }, // 直接使用 test 来做路径匹配，抽离react相关代码
          chunks: "initial",
          name: "mobxBase",
          priority: 11,
        },
        antdBase: {
          test: (module) => {
            return /antd/.test(module.context);
          }, // 直接使用 test 来做路径匹配，抽离react相关代码
          chunks: "initial",
          name: "antdBase",
          priority: 12,
        }
      },
    });
  }
  return config;
};

module.exports = override(
  fixBabelImports("antd", {
    libraryDirectory: "es",
    style: "css",
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
  addDecoratorsLegacy(),
  addCustomize()
);
