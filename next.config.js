
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
}
