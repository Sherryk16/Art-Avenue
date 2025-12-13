/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'example.com', // For placeholder images or development
      'ojhderkeyxvzvlhqclmd.supabase.co', // Specific Supabase image storage domain
      'supabase.co', // General Supabase domain, for other potential Supabase services
      // Add any other image domains here as needed
    ],
  },
};

module.exports = nextConfig;


