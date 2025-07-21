import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UpgradeProcessing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex flex-col items-center justify-center px-4">
      <img
        src="https://media.tenor.com/IXKhxXbddpYAAAAC/cat-ok.gif"
        alt="Upgrading..."
        className="w-72 h-72 object-contain mb-8"
      />
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
        No Premium, users here can use it for free...
      </h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6}}
        className="mt-4 bg-white dark:bg-[#1f1f1f] p-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
      >
        <Link to="/">Home</Link>
      </motion.div>
    </div>
  );
};

export default UpgradeProcessing;
