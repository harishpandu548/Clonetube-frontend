import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: " Ad-Free Watching",
    desc: "Zero interruptions. Just you and the content.",
  },
  {
    title: " Download Anytime",
    desc: "Take videos offline and enjoy them anywhere.",
  },
  {
    title: " Exclusive Features",
    desc: "Priority access to new features and beta tools.",
  },
];

const PremiumPage = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-800 dark:text-white px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold">Go Premium</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Upgrade to unlock powerful features that supercharge your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            className="bg-white dark:bg-[#1f1f1f] p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className="text-center mt-20">
          <button onClick={()=>navigate("/upgrading")} className="px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold shadow-md transition">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
            >
              Upgrade Now
            </motion.div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumPage;
