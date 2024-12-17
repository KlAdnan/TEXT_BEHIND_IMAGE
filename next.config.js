/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add specific webpack rules here
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // Important: return the modified config
    return config;
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Specify domains for next/image
  images: {
    domains: ['localhost'],
  },
  // Handle Three.js imports
  transpilePackages: ['three'],
};

module.exports = nextConfig;
