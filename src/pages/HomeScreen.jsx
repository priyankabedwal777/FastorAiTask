import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import TasteCard from "../components/TasteCard";
import BannerCarousel from "../components/BannerCarousel";
import SeeAllTastes from "./SeeAllTastes";

const API_URL = "https://staging.fastor.ai/v1/m/restaurant?city_id=118&&";

function normalizeRestaurant(r) {
  return {
    id: r.restaurant_id,
    name: r.restaurant_name,
    area: r.address_complete !== "null" ? r.address_complete : "New Delhi",
    image: r.logo || null,
  };
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-3 p-3 bg-white rounded-2xl">
          <div className="skeleton w-20 h-20 rounded-xl flex-shrink-0" />
          <div className="flex-1 pt-1 space-y-2">
            <div className="skeleton h-3.5 rounded-full w-3/4" />
            <div className="skeleton h-3 rounded-full w-1/2" />
            <div className="skeleton h-3 rounded-full w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomeScreen({ token, onSelect }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllTastes, setShowAllTastes] = useState(false);

  useEffect(() => {
    fetch(API_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data?.data?.results || [];
        setRestaurants(results.map(normalizeRestaurant));
      })
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, []);

  function handleSeeAllSelect(restaurant) {
    setShowAllTastes(false);
    onSelect(restaurant);
  }

  if (showAllTastes) {
    return (
      <SeeAllTastes
        items={restaurants}
        onSelect={handleSeeAllSelect}
        onBack={() => setShowAllTastes(false)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      {/*-- top header  */}
      <div
        className="fixed top-0 left-0 right-0 z-10 bg-white px-5 pt-5 pb-3 shadow-sm"
        style={{ maxWidth: 420, margin: "0 auto" }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs font-bold text-gray-400">
              📍 Connaught Place
            </p>
            <p className="text-sm font-black text-gray-900">New Delhi</p>
          </div>
          <div className="flex gap-2">
            {["🎁", "👛"].map((icon) => (
              <button
                key={icon}
                className="w-9 h-9 rounded-xl bg-orange-50 border-none text-lg flex items-center justify-center cursor-pointer"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xl font-black mb-0.5" style={{ color: "#FF5A3C" }}>
          Hey there! 👋
        </p>
        <p className="text-sm font-semibold text-gray-400">
          Let's explore this evening
        </p>
      </div>

      <div className="flex-1 pt-36">
        {/* Your taste section */}
        <div className="pt-5 pb-2">
          <div className="flex items-center justify-between px-5 mb-3">
            <p className="font-black text-gray-900 text-base">Your taste</p>
            <button
              onClick={() => setShowAllTastes(true)}
              className="text-xs font-black flex items-center gap-1 border-none bg-transparent cursor-pointer"
              style={{ color: "#FF5A3C" }}
            >
              see all
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ml-0.5"
                style={{ background: "#FF5A3C" }}
              >
                ›
              </span>
            </button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto pb-1 no-scrollbar">
            {restaurants.slice(0, 5).map((r) => (
              <TasteCard key={r.id} r={r} onClick={onSelect} />
            ))}
          </div>
        </div>

        <div className="pt-2 pb-4">
          <BannerCarousel />
        </div>

        {/* -- restaurant list */}
        <div className="px-4 pb-10">
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-gray-900 text-base">Popular Ones</p>
            <p className="text-xs font-black" style={{ color: "#FF5A3C" }}>
              {restaurants.length} places
            </p>
          </div>

          {loading ? (
            <SkeletonList />
          ) : (
            <div className="space-y-3">
              {restaurants.map((r) => (
                <RestaurantCard key={r.id} r={r} onClick={onSelect} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
