import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    PORT: process.env.PORT,
  },
};

export default nextConfig;
