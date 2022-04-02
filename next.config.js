
module.exports = {
    distDir: 'dist',
    async redirects() {
        return [
          {
            source: '/',
            destination: '/Home/Imgblock',
            permanent: true,
          },
        ]
      },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://dlsjf.top/api/:path*' // Proxy to Backend
          }
        ]
      }
}
