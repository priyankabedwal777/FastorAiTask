export const DISH_IMGS = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  "https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?w=800&q=80",
];

export const LOGO_URL =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <filter id="s">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="56" fill="#FF5A3C" filter="url(#s)"/>
      <circle cx="60" cy="60" r="52" fill="#FF5A3C" stroke="white" stroke-width="3"/>
      <text x="60" y="46" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="13" fill="white" letter-spacing="2">FASTOR</text>
      <text x="60" y="72" text-anchor="middle" font-size="26">🍽️</text>
      <text x="60" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="8.5" fill="rgba(255,255,255,0.85)" letter-spacing="1">FOOD DISCOVERY</text>
    </svg>`,
  );

export function getGallery(restaurant) {
  const primaryImage = restaurant.image || DISH_IMGS[0];
  const otherImages = DISH_IMGS.filter((url) => url !== primaryImage);
  return [primaryImage, ...otherImages].slice(0, 5);
}
