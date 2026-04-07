import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

// URL to fetch Lottie animation JSON data
const LOTTIE_URL =
  "https://lottie.host/17568c66-0dfe-41b1-9f4d-df26ee7b4a0a/q8mT1TfD0D.json";

const WelcomeDashboard: React.FC = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(LOTTIE_URL);
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error("Failed to load Lottie animation data:", err);
      }
    };

    fetchAnimationData();
  }, []);

  return (
    <div className="px-4 py-8 bg-gray-100 min-h-screen sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-blue-600">
        Панель администратора
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-gray-700">
        Управляйте мероприятиями, контролируйте продажи билетов и отслеживайте бронирования в режиме реального времени.
      </p>
      <div className="w-full max-w-md mx-auto">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-full h-auto max-w-xs sm:max-w-md md:max-w-lg"
        />
      </div>
    </div>
  );
};

export default WelcomeDashboard;
