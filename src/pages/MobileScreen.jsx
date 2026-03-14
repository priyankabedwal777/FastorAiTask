import { useState } from "react";
import OrangeButton from "../components/OrangeButton";

export default function MobileScreen({ mobile, setMobile, onNext }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSendCode() {
    if (mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch("https://staging.fastor.ai/v1/pwa/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, country_code: "+91" }),
      });
    } catch {}
    setLoading(false);
    onNext();
  }

  function handleInputChange(e) {
    setMobile(e.target.value.replace(/\D/g, ""));
    setError("");
  }

  return (
    <div className="slide-in flex flex-col min-h-screen bg-white w-full">
      <div
        className="flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100"
        style={{ height: "42vh" }}
      >
        <div className="text-center">
          <div
            className="w-24 h-24 mx-auto mb-4 rounded-3xl flex items-center justify-center text-5xl"
            style={{
              background: "#FF5A3C",
              boxShadow: "0 12px 32px rgba(255,90,60,.35)",
            }}
          >
            🍽️
          </div>
          <p className="text-3xl font-black text-gray-900 tracking-tight">
            Fastor
          </p>
          <p className="text-sm font-semibold text-gray-400 mt-1">
            Discover amazing food near you
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-8 pb-8">
        <h2 className="text-2xl font-black text-gray-900 mb-1">
          Enter Your Mobile Number
        </h2>
        <p className="text-sm font-semibold text-gray-400 mb-8">
          We will send you a 4 digit verification code
        </p>

        <div
          className={`flex rounded-2xl overflow-hidden border-2 transition-colors ${error ? "border-red-400" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-1.5 px-4 bg-gray-50 border-r-2 border-gray-200 flex-shrink-0">
            <span className="text-xl">🇮🇳</span>
            <span className="text-sm font-bold text-gray-500">+91</span>
          </div>
          <input
            type="tel"
            maxLength={10}
            value={mobile}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
            placeholder="Enter your mobile number"
            className="flex-1 px-4 py-4 text-gray-800 font-bold text-base bg-white outline-none"
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs font-bold mt-2"> {error}</p>
        )}

        <div className="mt-5">
          <OrangeButton
            onClick={handleSendCode}
            disabled={mobile.length < 10}
            loading={loading}
            loadingText="Sending..."
          >
            Send Code
          </OrangeButton>
        </div>

        <p className="text-center text-xs text-gray-400 font-semibold mt-6">
          By continuing, you agree to our{" "}
          <span
            className="font-bold cursor-pointer"
            style={{ color: "#FF5A3C" }}
          >
            Terms
          </span>
          {" & "}
          <span
            className="font-bold cursor-pointer"
            style={{ color: "#FF5A3C" }}
          >
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
