import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.artavenue.com', // Replace with your actual domain
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.artavenue.com/about', // Replace with your actual domain
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.artavenue.com/portfolio', // Replace with your actual domain
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.artavenue.com/services', // Replace with your actual domain
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.artavenue.com/contact', // Replace with your actual domain
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.0,
    },
    // Add more pages here as needed
  ];
}



