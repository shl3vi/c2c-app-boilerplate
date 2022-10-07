const { i18n } = require("./next-i18next.config");

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    customKey: "my-value",
  },
});

module.exports = nextConfig;
