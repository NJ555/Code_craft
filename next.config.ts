// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["framer-motion"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
