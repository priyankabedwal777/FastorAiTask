import { useState, useEffect } from 'react';
import DotIndicator from './DotIndicator';

const BANNERS = [
  { bg: 'linear-gradient(135deg,#5c4033,#3e2723)', label: 'VEGGIE FRIENDLY EATERIES', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  { bg: 'linear-gradient(135deg,#1565c0,#0d47a1)', label: 'BEST DESSERTS IN TOWN', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80' },
  { bg: 'linear-gradient(135deg,#2e7d32,#1b5e20)', label: 'HEALTHY BOWLS & SALADS', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
  { bg: 'linear-gradient(135deg,#e65100,#bf360c)', label: 'PIZZA & PASTA NIGHT', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80' },
  { bg: 'linear-gradient(135deg,#6a1b9a,#4a148c)', label: 'STREET FOOD SPECIALS', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80' },
];

const fadeMask = {
  maskImage: 'linear-gradient(to left,rgba(0,0,0,1) 40%,rgba(0,0,0,0))',
  WebkitMaskImage: 'linear-gradient(to left,rgba(0,0,0,1) 40%,rgba(0,0,0,0))',
};

export default function BannerCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % BANNERS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[active];

  return (
    <div className="mx-4">
      <div className="relative rounded-2xl overflow-hidden h-44" style={{ background: banner.bg }}>
        <img
          src={banner.img}
          alt=""
          onError={(e) => (e.target.style.display = 'none')}
          className="absolute right-0 top-0 h-full w-3/5 object-cover"
          style={fadeMask}
        />
        <div className="absolute left-0 top-0 h-full flex flex-col justify-center px-5 w-3/5">
          <p className="text-white font-black text-lg leading-tight">{banner.label}</p>
          <button
            className="mt-3 text-xs font-black text-white px-4 py-1.5 rounded-lg border-none cursor-pointer w-fit"
            style={{ background: 'rgba(255,255,255,0.25)' }}
          >
            TRY NOW
          </button>
        </div>
      </div>
      <DotIndicator
        count={BANNERS.length}
        active={active}
        onChange={setActive}
        className="mt-3"
        dotInactiveColor="#d1d5db"
      />
    </div>
  );
}
