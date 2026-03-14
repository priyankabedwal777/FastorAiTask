export default function DotIndicator({ count, active, onChange, className = '', dotInactiveColor = 'rgba(255,255,255,0.75)' }) {
  return (
    <div className={`flex justify-center gap-1.5 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
          style={{
            width: i === active ? 20 : 8,
            height: 8,
            background: i === active ? '#FF5A3C' : dotInactiveColor,
            boxShadow: '0 1px 3px rgba(0,0,0,.3)',
          }}
        />
      ))}
    </div>
  );
}
