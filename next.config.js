
module.exports = {
  distDir: 'dist',
  async redirects() {
    return [
      {
        source: '/Home/Imgblock',
        destination: '/',
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
