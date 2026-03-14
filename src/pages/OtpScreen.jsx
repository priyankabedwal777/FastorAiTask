import { useState, useRef, useEffect } from "react";
import BackButton from "../components/BackButton";
import OrangeButton from "../components/OrangeButton";

const OTP_LENGTH = 6;

export default function OtpScreen({ mobile, onSuccess, onBack }) {
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const interval = setInterval(
      () => setResendTimer((t) => (t > 0 ? t - 1 : 0)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  function handleDigitChange(value, index) {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value.slice(-1);
    setOtpDigits(updated);
    setError("");
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  }

  function handlePaste(e) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setOtpDigits(pasted.split(""));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
  }

  async function handleVerify() {
    const code = otpDigits.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the complete OTP");
      return;
    }
    if (code !== "123456") {
      setError("Invalid OTP. Use 123456 for this demo.");
      return;
    }
    setLoading(true);
    let token = "";
    try {
      const res = await fetch("https://staging.fastor.ai/v1/pwa/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp: code, country_code: "+91" }),
      });
      const json = await res.json();
      token = json?.data?.token || "";
    } catch {}
    setLoading(false);
    onSuccess(token);
  }

  return (
    <div className="slide-in flex flex-col min-h-screen bg-white w-full px-6">
      <div className="pt-14 pb-3">
        <BackButton
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
        />
      </div>

      <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl mb-6">
        📱
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">
        OTP Verification
      </h2>
      <p className="text-sm font-semibold text-gray-400 mb-8 leading-relaxed">
        Enter the verification code we sent to{" "}
        <strong className="text-gray-800">+91 {mobile}</strong>
      </p>

      <div className="flex gap-2 justify-between mb-3" onPaste={handlePaste}>
        {otpDigits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`otp-box ${digit ? "filled" : ""} ${error ? "has-error" : ""}`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-bold mb-3">⚠️ {error}</p>
      )}

      <OrangeButton
        onClick={handleVerify}
        loading={loading}
        loadingText="Verifying..."
        className="mb-6"
      >
        Verify
      </OrangeButton>

      <p className="text-center text-sm font-semibold text-gray-400">
        Didn't receive code?{" "}
        {resendTimer > 0 ? (
          <span className="text-gray-600 font-bold">
            Resend in {resendTimer}s
          </span>
        ) : (
          <button
            onClick={() => setResendTimer(30)}
            className="font-black border-none bg-transparent cursor-pointer"
            style={{ color: "#FF5A3C" }}
          >
            Resend
          </button>
        )}
      </p>
    </div>
  );
}
