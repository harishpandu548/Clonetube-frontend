import React, { useState } from "react";

function AvatarModal({ user }) {
  const [open, setopen] = useState(false);

  if (!user) return null;

  return (
    <>
      <img
        src={user.avatar}
        alt="Profile"
        onClick={() => setopen(true)}
        className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 dark:border-white"
      />
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setopen(false)}
        >
          <div
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl max-w-sm w-full text-center relative shadow-xl animate-fadeIn scale-95 hover:scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={user.avatar}
              alt="User"
              className="w-100 h-100 mx-auto rounded-full mb-4 border-4 border-white dark:border-gray-600 shadow-lg"
            />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user.username}
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default AvatarModal;
