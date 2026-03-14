const FALLBACK_IMG = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&q=80';

export default function TasteCard({ r, onClick }) {
  return (
    <div
      onClick={() => onClick(r)}
      className="flex-shrink-0 w-36 rounded-2xl overflow-hidden cursor-pointer"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,.08)' }}
    >
      <div className="w-full h-28 overflow-hidden">
        <img
          src={r.image || FALLBACK_IMG}
          alt={r.name}
          onError={(e) => (e.target.src = FALLBACK_IMG)}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-2" style={{ background: '#ffeef0' }}>
        <p className="font-black text-xs text-gray-900 truncate">{r.name}</p>
        <p className="text-xs text-gray-500 font-semibold leading-tight mt-0.5 truncate">
          {r.area || 'New Delhi'}
        </p>
      </div>
    </div>
  );
}
