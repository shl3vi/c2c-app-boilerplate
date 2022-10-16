const { i18n } = require("./next-i18next.config");
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    customKey: "my-value",
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
});

module.exports = nextConfig;
