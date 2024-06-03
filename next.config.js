/**
 * @format
 * @type {import('next').NextConfig}
 */

const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, "../../"),
  // },
};

module.exports = nextConfig;
