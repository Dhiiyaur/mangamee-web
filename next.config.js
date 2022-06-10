// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    disable: prod ? false : true,
    dest: 'public'
  }
})