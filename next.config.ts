module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true, // Optionally ignore ESLint warnings during build
    
    // Customize the ESLint rules you want to disable
    rules: {
      'no-unused-vars': 'off', // Disable the 'no-unused-vars' rule
      'react/prop-types': 'off', // Disable 'prop-types' rule (specific to React)
    },
  },
}