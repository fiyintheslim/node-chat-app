/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://localhost:5000/api/v1/login",
      },
      {
        source: "/api/signup",
        destination: "http://localhost:5000/api/v1/register",
      },
      {
        source: "/api/trial",
        destination: "http://localhost:5000/api/v1/trial",
      },
      {
        source: "/api/me",
        destination: "http://localhost:5000/api/v1/me",
      },
    ];
  },
};
module.exports = {
  async redirects() {
    return [];
  },
};
module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};
