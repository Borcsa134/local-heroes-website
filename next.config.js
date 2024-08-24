/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    if (process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }
    config.module.rules.push({
      test: /\.svg/,
      type: 'asset/resource',
    });
    return config;
  },
  env: {
    DISCORD_URL: process.env.DISCORD_URL,
  },
  redirects: () => {
    return [
      {
        source: '/admin',
        destination: '/outstatic',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
