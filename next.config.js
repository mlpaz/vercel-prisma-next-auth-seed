/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/**/*"],
    },
    output: "standalone",
  },
};

module.exports = nextConfig;
