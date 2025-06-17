const path = require("path");
const sharedConfig = require("../../packages/shared/styles/postcss.config.cjs");

module.exports = {
  ...sharedConfig,
  plugins: [
    require("postcss-import")({
      root: path.resolve(__dirname, "../../packages/shared"),
    }),
    ...sharedConfig.plugins.slice(1),
  ],
};
