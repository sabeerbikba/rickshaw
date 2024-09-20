/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      // domains: ['i.imgur.com', 'i.ibb.co'], // deprecated
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'i.imgur.com',
         },
         {
            protocol: 'https',
            hostname: 'i.ibb.co',
         },
      ],
   },
};

export default nextConfig;
