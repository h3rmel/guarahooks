import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
  },
  /* config options here */
  async redirects() {
    return [
      {
        source: '/hooks',
        destination: '/docs/hooks',
        permanent: true,
      },
      {
        source: '/hooks/:path*',
        destination: '/docs/hooks/:path*',
        permanent: true,
      },
      {
        source: '/r/:path([^.]*)',
        destination: '/r/:path.json',
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(nextConfig);
