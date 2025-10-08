import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  async redirects() {
    return [
      {
        source: '/app/summaries',
        destination: '/app/fiches',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
