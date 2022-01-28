
module.exports = {
    // basePath: '/',
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
            destination: 'https://xek.dlsjf.top/api/:path*' // Proxy to Backend
          }
        ]
      }
}
