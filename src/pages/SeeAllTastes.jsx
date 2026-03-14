import BackButton from '../components/BackButton';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&q=80';

export default function SeeAllTastes({ items, onSelect, onBack }) {
  return (
    <div className="slide-in flex flex-col min-h-screen bg-gray-50 w-full max-w-sm">
      <div className="sticky top-0 z-10 bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
        <BackButton onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0" />
        <div>
          <p className="font-black text-gray-900 text-lg">Your Taste</p>
          <p className="text-xs font-semibold text-gray-400">{items.length} places curated for you</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 pb-10">
          {items.map((r) => (
            <div
              key={r.id}
              onClick={() => onSelect(r)}
              className="rounded-2xl overflow-hidden cursor-pointer bg-white hover:shadow-lg transition-all duration-200"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,.08)' }}
            >
              <div className="w-full overflow-hidden" style={{ height: 120 }}>
                <img
                  src={r.image || FALLBACK_IMG}
                  alt={r.name}
                  onError={(e) => (e.target.src = FALLBACK_IMG)}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2.5" style={{ background: '#ffeef0' }}>
                <p className="font-black text-xs text-gray-900 truncate">{r.name}</p>
                <p className="text-xs text-gray-500 font-semibold mt-0.5 truncate">{r.cuisine || 'Multi-Cuisine'}</p>
                <p className="text-xs font-semibold mt-0.5 truncate" style={{ color: '#bbb' }}>{r.area || 'New Delhi'}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-black" style={{ color: '#FF5A3C' }}>⭐ {r.rating || 4.5}</span>
                  <span className="text-xs font-bold text-gray-500">₹{r.price || 200}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
