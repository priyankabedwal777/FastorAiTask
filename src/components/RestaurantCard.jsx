const FALLBACK_IMG = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=200&q=80';

export default function RestaurantCard({ r, onClick }) {
  return (
    <div
      onClick={() => onClick(r)}
      className="flex gap-3 p-3 bg-white rounded-2xl cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
      style={{ boxShadow: '0 2px 10px rgba(0,0,0,.06)' }}
    >
      <img
        src={r.image || FALLBACK_IMG}
        alt={r.name}
        onError={(e) => (e.target.src = FALLBACK_IMG)}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="font-black text-sm text-gray-900 truncate">{r.name}</p>
        <p className="text-xs font-semibold text-gray-400 truncate mt-0.5">
          {r.cuisine || 'Multi-Cuisine'}
        </p>
        <p className="text-xs font-semibold text-gray-300 truncate">{r.area}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-black" style={{ color: '#FF5A3C' }}>
            🔥 {r.offers || 1} Offers trending
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-gray-700">⭐ {r.rating || '4.5'}</span>
            <span className="text-xs font-black text-gray-700">₹{r.price || 200}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
