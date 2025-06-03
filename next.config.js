/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["bbc.com", "res.cloudinary.com", "ui-avatars.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // ✅ allows postMessage
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none", // ✅ optional but recommended in this case
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
