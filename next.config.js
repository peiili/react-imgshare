
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
        // destination: 'https://dlsjf.top/api/:path*' // Proxy to Backend
        destination: 'http://43.142.105.164:5166/api/:path*' // Proxy to Backend
        // destination: 'http://127.0.0.1:5166/api/:path*' // Proxy to Backend
      }
    ]
  }
}
