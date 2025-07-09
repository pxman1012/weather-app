// routes.config.js
// export const customRoutes = [
//     { source: '/du-bao-thoi-tiet', destination: '' },
//     // { source: '/trang-chu', destination: '/home' },
//     // { source: '/gioi-thieu', destination: '/about' },
//     // { source: '/lien-he', destination: '/contact' },
//     // { source: '/san-pham/:slug', destination: '/product/:slug' },
//     // ... thêm bao nhiêu cũng được
// ];

export const rewrites = [
  {
    source: '/du-bao-thoi-tiet',
    destination: '/',
  },
];

export const redirects = [
  {
    source: '/',
    destination: '/du-bao-thoi-tiet',
    permanent: false,
  },
];