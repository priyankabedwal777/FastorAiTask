import { useState, useMemo } from "react";
import Spinner from "../components/Spinner";
import OrangeButton from "../components/OrangeButton";
import BackButton from "../components/BackButton";
import DotIndicator from "../components/DotIndicator";
import useRestaurantCanvas from "../hooks/useRestaurantCanvas";
import { getGallery } from "../data/restaurants";

export default function RestaurantDetail({ restaurant, onBack }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sharing, setSharing] = useState(false);
  const [justShared, setJustShared] = useState(false);

  const gallery = useMemo(() => getGallery(restaurant), [restaurant]);
  const { name, rating, cuisine, offers, area, price } = restaurant;

  const {
    canvasRef,
    imageLoaded,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useRestaurantCanvas({ name, area, gallery, activeImageIndex });

  async function handleShare() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSharing(true);
    canvas.toBlob(
      async (blob) => {
        const file = new File([blob], "fastor-restaurant.png", {
          type: "image/png",
        });
        try {
          if (navigator.share && navigator.canShare?.({ files: [file] })) {
            await navigator.share({
              title: `${name} on Fastor`,
              text: `Check out ${name}! 🍽️`,
              files: [file],
            });
          } else if (navigator.share) {
            await navigator.share({
              title: `${name} on Fastor`,
              text: `Check out ${name}! 🍽️`,
              url: window.location.href,
            });
          } else {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `${name.replace(/\s+/g, "-")}-fastor.png`;
            link.click();
          }
          setJustShared(true);
          setTimeout(() => setJustShared(false), 3000);
        } catch {}
        setSharing(false);
      },
      "image/png",
      0.93,
    );
  }

  return (
    <div className="slide-in flex flex-col min-h-screen w-full bg-white">
      <div
        className="relative w-full flex-shrink-0"
        style={{ height: "56vw", maxHeight: 265, minHeight: 200 }}
      >
        <BackButton
          onClick={onBack}
          className="absolute top-12 left-4 z-20 w-9 h-9 rounded-full"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 2px 8px rgba(0,0,0,.2)",
          }}
        />

        <div className="w-full h-full relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
              <Spinner color="#FF5A3C" size={36} />
            </div>
          )}
          <canvas
            ref={canvasRef}
            width={700}
            height={480}
            className="w-full h-full canvas-area cursor-move"
            style={{
              display: "block",
              objectFit: "cover",
              touchAction: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
        </div>

        <DotIndicator
          count={gallery.length}
          active={activeImageIndex}
          onChange={setActiveImageIndex}
          className="absolute bottom-3 left-0 right-0 z-20"
        />
      </div>

      <div
        className="flex-1 px-4 pt-4 pb-8 bg-white overflow-y-auto"
        style={{
          borderRadius: "24px 24px 0 0",
          marginTop: -10,
          position: "relative",
          zIndex: 5,
        }}
      >
        <div className="flex items-start justify-between mb-1">
          <p className="font-black text-gray-900 text-xl flex-1 pr-2">{name}</p>
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl flex-shrink-0"
            style={{ background: "#fff5f3" }}
          >
            <span style={{ color: "#FF5A3C" }}>♥</span>
            <span className="text-xs font-black" style={{ color: "#FF5A3C" }}>
              {rating || "4.5"}k
            </span>
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-400 mb-1">
          {cuisine || "Multi-Cuisine"}
        </p>
        <p className="text-xs font-bold mb-3" style={{ color: "#FF5A3C" }}>
          🔥 {offers || 1} Offers trending
        </p>

        <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-2xl">
          <span style={{ color: "#FF5A3C", fontSize: 18 }}>📍</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-700 truncate">
              {area || "Connaught Place, New Delhi"}
            </p>
            <p className="text-xs text-gray-400 font-semibold">
              ₹{price || 200} for two
            </p>
          </div>
          <span className="text-xs font-black bg-green-100 text-green-700 px-2 py-1 rounded-lg flex-shrink-0">
            ⭐ {rating || 4.5}
          </span>
        </div>

        <p className="text-sm text-gray-500 font-semibold leading-relaxed mb-5">
          Discover delicious food and amazing dining experiences at {name}. A
          perfect place to enjoy great meals with family and friends.
        </p>

        <OrangeButton
          onClick={handleShare}
          disabled={!imageLoaded}
          loading={sharing}
          loadingText="Preparing image…"
        >
          {justShared ? (
            " Shared successfully!"
          ) : (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share with Fastor Logo
            </>
          )}
        </OrangeButton>
      </div>
    </div>
  );
}
