import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Startup from "../assests/Startup.json";

const UploadOverlay = () => {
  const steps = [
    "☁️ Uploading to cloud...",
    "🖼️ Generating thumbnail...",
    "🧠 Saving metadata...",
    "🚀 Finalizing your video.......",
  ];

  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < steps.length) {
        setVisibleSteps((prev) => [...prev, steps[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center text-white space-y-6 text-center px-4">
      <Lottie animationData={Startup} loop={true} className="w-72 h-72" />
      <h2 className="text-2xl sm:text-3xl font-bold animate-pulse">
        Uploading your video...
      </h2>
      <div className="space-y-2 text-amber-400 font-medium text-lg sm:text-xl">
        {visibleSteps.map((step, idx) => (
          <p key={idx} className="animate-fade-in">
            {step}
          </p>
        ))}
      </div>

      <p className="text-sm text-gray-300 italic">
        This may take a few seconds depending on your video size 
      </p>
    </div>
  );
};

export default UploadOverlay;
