/**
 * @format
 * @type {import('next').NextConfig}
 */

const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/dashboard",
        headers: [
          {
            key: "Authorization",
            value: "test",
          },
        ],
      },
    ];
  },
};
