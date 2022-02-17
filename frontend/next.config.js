/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "http://localhost:5000/api/v1/login",
      },
    ];
  },
};
