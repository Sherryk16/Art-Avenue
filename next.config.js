/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // This disables Next.js image optimization to avoid Vercel limits
    domains: [
      'ojhderkeyxvzvlhqclmd.supabase.co', // Your Supabase image storage domain
      'supabase.co', // General Supabase domain
      'i.imgur.com', // Common image hosting
      'images.unsplash.com', // Common image hosting
      'cdn.discordapp.com', // Discord images
      'avatars.githubusercontent.com', // GitHub avatars
    ],
  },
};

module.exports = nextConfig;




