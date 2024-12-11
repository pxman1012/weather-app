export default function sitemap() {
  return [
    {
      url: 'https://pxman-weather-app.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://pxman-weather-app.vercel.app/pro',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
  ]
}