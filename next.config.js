/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "bbc.com",
      "res.cloudinary.com",
      "ui-avatars.com",
      "nbg1.your-objectstorage.com",
    ],
  },
};

module.exports = nextConfig;
