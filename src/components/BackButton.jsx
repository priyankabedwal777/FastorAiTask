export default function BackButton({ onClick, className = '', style }) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`flex items-center justify-center border-none cursor-pointer ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
