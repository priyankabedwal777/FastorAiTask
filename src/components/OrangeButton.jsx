import Spinner from './Spinner';

export default function OrangeButton({ onClick, disabled, loading, loadingText, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 border-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ background: '#FF5A3C' }}
    >
      {loading ? <><Spinner />{loadingText}</> : children}
    </button>
  );
}
