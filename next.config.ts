import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
