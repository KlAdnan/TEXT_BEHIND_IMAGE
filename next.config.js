/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure webpack for file handling
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf|jpg|jpeg|png|gif|ico)$/,  // File types to handle
      use: [
        {
          loader: 'file-loader',               // Use file-loader for these files
          options: {
            name: '[path][name].[ext]',        // Keep original file names
          },
        },
      ],
    });
    return config;
  },
  reactStrictMode: true,                       // Enable React strict mode
  swcMinify: true,                            // Enable SWC minification
  images: {
    domains: ['localhost'],                    // Allow images from localhost
  },
};

module.exports = nextConfig;
