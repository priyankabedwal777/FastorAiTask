import { useState } from "react";
import MobileScreen from "./pages/MobileScreen.jsx";
import OtpScreen from "./pages/OtpScreen.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import RestaurantDetail from "./pages/RestaurantDetail.jsx";

export default function App() {
  const [screen, setScreen] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  function handleRestaurantSelect(restaurant) {
    setSelectedRestaurant(restaurant);
    setScreen("detail");
  }

  return (
    <div className="phone-frame">
      {screen === "mobile" && (
        <MobileScreen
          mobile={mobileNumber}
          setMobile={setMobileNumber}
          onNext={() => setScreen("otp")}
        />
      )}

      {screen === "otp" && (
        <OtpScreen
          mobile={mobileNumber}
          onSuccess={(token) => { setAuthToken(token); setScreen("home"); }}
          onBack={() => setScreen("mobile")}
        />
      )}

      {screen === "home" && <HomeScreen token={authToken} onSelect={handleRestaurantSelect} />}

      {screen === "detail" && selectedRestaurant && (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onBack={() => setScreen("home")}
        />
      )}
    </div>
  );
}
