export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://pxman-weather-app.vercel.app/sitemap.xml',
  }
}