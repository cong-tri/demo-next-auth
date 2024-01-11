/** @type {import('next').NextConfig} */
const path = require("path");
// const securityHeader = ['cookie'];
module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    // experimental: {
    //     serverActions: true,
    // },
    // async headers() {
    //     return [
    //         {
    //             source: '/:path*',
    //             headers: securityHeader,
    //         }
    //     ]
    // }
};
